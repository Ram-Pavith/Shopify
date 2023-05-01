import paymentService from "../services/payment.service.js"

const makePayment = async (req, res) => {
  const { email, amount } = req.body;

  const result = await paymentService.payment(amount, email);
  res.json(result);
};

export {
  makePayment,
};
