import Stripe from "stripe"
import { ErrorHandler } from "../helpers/error.js"
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
import { logger } from "../utils/logger.js";

class PaymentService {
  payment = async (amount, email) => {
    try {
      return await stripe.paymentIntents.create({
        amount,
        currency: "ngn",
        payment_method_types: ["card"],
        receipt_email: email,
      });
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
}

export default PaymentService = new PaymentService()
