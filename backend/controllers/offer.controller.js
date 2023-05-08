import offerService from "../services/offer.service.js";

const applyOffer = async(req,res)=>{
    try{
        const order_id = req.params.order_id
        const offersApplied = await offerService.offerApply({...req.body,order_id})
        console.log("from controller ",offersApplied)
        res.status(200).json(offersApplied)
    }catch(err){
        res.status(400).json({message:err.message,stackTrace:err.stack})
    }
}

const applyOfferCart = async(req,res)=>{
    try{
        const cart_id = req.params.cart_id
        const offersApplied = await offerService.offerApplyCart({...req.body,cart_id})
        console.log("from controller ",offersApplied)
        res.status(200).json(offersApplied)
    }catch(err){
        res.status(400).json({message:err.message,stackTrace:err.stack})
    }
}

export {
    applyOffer,
    applyOfferCart
}