import {
offerApplyDb,
offerApplyCartDb
} from "../db/offers.db.js"

import { ErrorHandler } from "../helpers/error.js"
import { logger } from "../utils/logger.js"

class OfferService{
    offerApply = async(data)=>{
        try{
            return await offerApplyDb(data);
        }
        catch(error){
            throw new ErrorHandler(error.statusCode, error.message);
        }
    }

    offerApplyCart = async(data)=>{
        try{
            return await offerApplyCartDb(data);
        }
        catch(error){
            throw new ErrorHandler(error.statusCode, error.message);
        }
    }
    
}
export default OfferService = new OfferService()