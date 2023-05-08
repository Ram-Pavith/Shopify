import pool from "../config/db.js"
import {v4} from 'uuid'

const offerApplyDb = async ({order_id,user_id})=>{
    const {rowCount:DeleteCount} = await pool.query(
        `DELETE FROM order_item_offers_applied as oioa where oioa.order_item_id in (select order_item_id from order_item as oi where oi.order_id=$1)`,[order_id]
    )
    console.log("Deleted ",DeleteCount)

    //apply offers
    const {rowCount:insertRowCount} = await pool.query(
        `INSERT INTO order_item_offers_applied(order_item_id,offer_id,name,discount)
        SELECT oi.order_item_id,po.offer_id,o.name,o.discount_value from order_item as oi join product_offers as po on oi.product_id = po.product_id join offers as o on o.offer_id = po.offer_id where oi.order_id=$1;
        `,
        [order_id]
    );
    let grouped_order_status = false
    const {rows:orderItems} = await pool.query(`SELECT oi.order_item_id from order_item as oi where oi.order_id = $1`,[order_id])

    const {rows:groupedOffer} = await pool.query(`select oioa.offer_id from order_item_offers_applied as oioa join order_item as oi on oi.order_item_id = oioa.order_item_id join offers as o on o.offer_id = oioa.offer_id where o.offer_type='GROUPED_PRODUCT' and oi.order_id = $1`,[order_id])
    console.log("grouped Offer ",groupedOffer)

    const {rows:groupedOrderItems} = await pool.query(`select product_id from product_offers where offer_id=$1`,[groupedOffer[0].offer_id])
    console.log("grouped order items ",groupedOrderItems)

    const {rows:orderGroupedOfferItems} = await pool.query(`select oi.product_id from order_item as oi join order_item_offers_applied as oioa on oioa.order_item_id = oi.order_item_id where oioa.offer_id = $1`,[groupedOffer[0].offer_id])
    console.log("order grouped ofer items ", orderGroupedOfferItems)

    if(groupedOrderItems.length == orderGroupedOfferItems.length){
        grouped_order_status = true
    }
    console.log("insert row count ",insertRowCount)
    //update order item id table discount price
    console.log(orderItems)
    orderItems.map(async (oi)=>{
        console.log("inside map ",oi)
        const {rows:discountRows} = await pool.query(`SELECT discount,offer_id from order_item_offers_applied as oioa where oioa.order_item_id = $1`,[oi.order_item_id])
        console.log("discount rows", discountRows)
        let totalDiscount=0
        for(let i=0;i<discountRows.length;i++){
            if(discountRows[i].offer_id === groupedOffer[0].offer_id && !grouped_order_status){
                continue
            }
            totalDiscount+=parseFloat(discountRows[i].discount)
        }

        // const totalDiscount = discountRows.reduce(sum_reduce)
        console.log("total discount",totalDiscount)
        const {rowCount} = await pool.query(`UPDATE order_item set discount=$1 where order_item_id=$2`,[totalDiscount,oi.order_item_id])
        console.log("updated rows count ",rowCount)
    })
    // return offers applied table
    const {rows:offers} = await pool.query(
        `		SELECT o.name,o.offer_id from order_item_offers_applied as oioa join offers as o on o.offer_id = oioa.offer_id join order_item oi on oioa.order_item_id = oi.order_item_id where oi.order_id =$1
        `,
        [order_id]
    )
    let offerApplied = []
    if(grouped_order_status){
        const { rows:orderItemsOffersApplied} = await pool.query(
            `SELECT * from order_item_offers_applied as oioa join order_item as oi on oi.order_item_id = oioa.order_item_id where oi.order_id = $1 `,[order_id]
        )
        offerApplied = orderItemsOffersApplied
    }
    else{
        const { rows:orderItemsOffersApplied} = await pool.query(
            `SELECT * from order_item_offers_applied as oioa join order_item as oi on oi.order_item_id = oioa.order_item_id where oioa.offer_id<>$2 and oi.order_id = $1  `,[order_id,groupedOffer[0].offer_id]
        )
        offerApplied = orderItemsOffersApplied
    }
    
    return offerApplied;
}

export{
    offerApplyDb
}