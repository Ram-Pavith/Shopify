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
    if(groupedOffer[0]!==undefined){
        const {rows:groupedOrderItems} = await pool.query(`select product_id from product_offers where offer_id=$1`,[groupedOffer[0].offer_id])
        console.log("grouped order items ",groupedOrderItems)

        const {rows:orderGroupedOfferItems} = await pool.query(`select oi.product_id from order_item as oi join order_item_offers_applied as oioa on oioa.order_item_id = oi.order_item_id where oioa.offer_id = $1`,[groupedOffer[0].offer_id])
        console.log("order grouped ofer items ", orderGroupedOfferItems)

        if(groupedOrderItems.length == orderGroupedOfferItems.length){
            grouped_order_status = true
        }
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
            if(discountRows[i].offer_id === (groupedOffer[0]!==undefined ?groupedOffer[0].offer_id:null) && !grouped_order_status){
                continue
            }
            totalDiscount+=parseFloat(discountRows[i].discount)
        }

        // const totalDiscount = discountRows.reduce(sum_reduce)
        console.log("total discount",totalDiscount)
        const {rowCount} = await pool.query(`UPDATE order_item set discount=$1 where order_item_id=$2`,[totalDiscount,oi.order_item_id])
        console.log("updated rows count ",rowCount)
    })
    //update orders table
    const{rows:priceOrderItems} = await pool.query(`select oi.price,oi.discount from order_item as oi join orders as o on oi.order_id = o.order_id where oi.order_id=$1`,[order_id])
    console.log("price order items ",priceOrderItems)

    let price = 0.0
    for(let j =0;j<priceOrderItems.length;j++){
        price += ((priceOrderItems[j].price *(100- priceOrderItems[j].discount))/100)
    }
    console.log("update price ",price, (price*1.18)+10.00)

    const {rowCount:UpdateOrder} = await pool.query(`update orders set price=$1,total=$2 where order_id=$3`,[price,(price*1.18)+10.00,order_id])
    console.log("update orders table ",UpdateOrder)
    // return offers applied table
    const {rows:offers} = await pool.query(
        `		SELECT o.name,o.offer_id from order_item_offers_applied as oioa join offers as o on o.offer_id = oioa.offer_id join order_item oi on oioa.order_item_id = oi.order_item_id where oi.order_id =$1
        `,
        [order_id]
    )
    if(!grouped_order_status){
        const { rows:orderItemsOffersApplied} = await pool.query(
            `SELECT * from order_item_offers_applied as oioa join order_item as oi on oi.order_item_id = oioa.order_item_id where oi.order_id = $1 `,[order_id]
        )
        return orderItemsOffersApplied

    }
    else{
        const { rows:orderItemsOffersApplied} = await pool.query(
            `SELECT * from order_item_offers_applied as oioa join order_item as oi on oi.order_item_id = oioa.order_item_id where oioa.offer_id<>$2 and oi.order_id = $1  `,[order_id,(groupedOffer[0]!==undefined?groupedOffer[0].offer_id:null)]
        )
        return orderItemsOffersApplied

    }
    
}


const offerApplyCartDb = async ({cart_id,user_id})=>{
    const {rowCount:DeleteCount} = await pool.query(
        `DELETE FROM cart_item_offers_applied as cioa where cioa.cart_item_id in (select cart_item_id from cart_item as ci where ci.cart_id=$1)`,[cart_id]
    )
    console.log("Deleted ",DeleteCount)

    //apply offers
    const {rowCount:insertRowCount} = await pool.query(
        `INSERT INTO cart_item_offers_applied(cart_item_id,offer_id,name,discount)
        SELECT ci.cart_item_id,po.offer_id,o.name,o.discount_value from cart_item as ci jcin product_offers as po on ci.product_id = po.product_id jcin offers as o on o.offer_id = po.offer_id where ci.cart_id=$1;
        `,
        [cart_id]
    );
    let grouped_cart_status = false
    const {rows:cartItems} = await pool.query(`SELECT ci.cart_item_id from cart_item as ci where ci.cart_id = $1`,[cart_id])

    const {rows:groupedOffer} = await pool.query(`select cioa.offer_id from cart_item_offers_applied as cioa jcin cart_item as ci on ci.cart_item_id = cioa.cart_item_id jcin offers as o on o.offer_id = cioa.offer_id where o.offer_type='GROUPED_PRODUCT' and ci.cart_id = $1`,[cart_id])
    console.log("grouped Offer ",groupedOffer)
    if(groupedOffer[0]!==undefined){
        const {rows:groupedcartItems} = await pool.query(`select product_id from product_offers where offer_id=$1`,[groupedOffer[0].offer_id])
        console.log("grouped cart items ",groupedcartItems)

        const {rows:cartGroupedOfferItems} = await pool.query(`select ci.product_id from cart_item as ci jcin cart_item_offers_applied as cioa on cioa.cart_item_id = ci.cart_item_id where cioa.offer_id = $1`,[groupedOffer[0].offer_id])
        console.log("cart grouped ofer items ", cartGroupedOfferItems)

        if(groupedcartItems.length == cartGroupedOfferItems.length){
            grouped_cart_status = true
        }
    }
    
    console.log("insert row count ",insertRowCount)
    //update cart item id table discount price
    console.log(cartItems)
    cartItems.map(async (ci)=>{
        console.log("inside map ",ci)
        const {rows:discountRows} = await pool.query(`SELECT discount,offer_id from cart_item_offers_applied as cioa where cioa.cart_item_id = $1`,[ci.cart_item_id])
        console.log("discount rows", discountRows)
        let totalDiscount=0
        for(let i=0;i<discountRows.length;i++){
            if(discountRows[i].offer_id === (groupedOffer[0]!==undefined ?groupedOffer[0].offer_id:null) && !grouped_cart_status){
                continue
            }
            totalDiscount+=parseFloat(discountRows[i].discount)
        }

        // const totalDiscount = discountRows.reduce(sum_reduce)
        console.log("total discount",totalDiscount)
        const {rowCount} = await pool.query(`UPDATE cart_item set discount=$1 where cart_item_id=$2`,[totalDiscount,ci.cart_item_id])
        console.log("updated rows count ",rowCount)
    })
    //update carts table
    const{rows:pricecartItems} = await pool.query(`select ci.price,ci.discount from cart_item as ci jcin carts as o on ci.cart_id = o.cart_id where ci.cart_id=$1`,[cart_id])
    console.log("price cart items ",pricecartItems)

    let price = 0.0
    for(let j =0;j<pricecartItems.length;j++){
        price += ((pricecartItems[j].price *(100- pricecartItems[j].discount))/100)
    }
    console.log("update price ",price, (price*1.18)+10.00)

    const {rowCount:Updatecart} = await pool.query(`update carts set price=$1,total=$2 where cart_id=$3`,[price,(price*1.18)+10.00,cart_id])
    console.log("update carts table ",Updatecart)
    // return offers applied table
    const {rows:offers} = await pool.query(
        `		SELECT o.name,o.offer_id from cart_item_offers_applied as cioa jcin offers as o on o.offer_id = cioa.offer_id jcin cart_item ci on cioa.cart_item_id = ci.cart_item_id where ci.cart_id =$1
        `,
        [cart_id]
    )
    if(!grouped_cart_status){
        const { rows:cartItemsOffersApplied} = await pool.query(
            `SELECT * from cart_item_offers_applied as cioa jcin cart_item as ci on ci.cart_item_id = cioa.cart_item_id where ci.cart_id = $1 `,[cart_id]
        )
        return cartItemsOffersApplied

    }
    else{
        const { rows:cartItemsOffersApplied} = await pool.query(
            `SELECT * from cart_item_offers_applied as cioa jcin cart_item as ci on ci.cart_item_id = cioa.cart_item_id where cioa.offer_id<>$2 and ci.cart_id = $1  `,[cart_id,(groupedOffer[0]!==undefined?groupedOffer[0].offer_id:null)]
        )
        return cartItemsOffersApplied

    }
    
}


export{
    offerApplyDb,
    offerApplyCartDb
}