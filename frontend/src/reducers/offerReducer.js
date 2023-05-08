import {
OFFER_APPLY_REQUEST,
OFFER_APPLY_SUCCESS,
OFFER_APPLY_FAIL
}from "../constants/offerConstants.js"

export const applyOfferReducer = (state={},action)=>{
    switch (action.type) {
        case OFFER_APPLY_REQUEST:
          return {
            loading: true,
          }
        case OFFER_APPLY_SUCCESS:
          return {
            loading: false,
            success: true,
            offers: action.payload,
          }
        case OFFER_APPLY_FAIL:
          return {
            loading: false,
            error: action.payload,
          }

        default:
          return state
      }
}