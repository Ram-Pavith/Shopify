import paymentService from "../services/payment.service.js"

const makePayment = async (req, res) => {
  const { email, amount } = req.body;
  try{
    const result = await paymentService.payment(amount, email);
    res.status(200).json(result);
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }

};

export {
  makePayment,
};
