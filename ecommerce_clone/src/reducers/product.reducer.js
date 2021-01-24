import { productConstants } from "../actions/constants";

const initialState = {
    products : [],
    productsByPrice : {
        under5K : [],
        under10K : [],
        under15K : [],
        under20K : [],
        under25K : [],
    }
};

export default (state = initialState, action) => {
    switch(action.type){
        case productConstants.GET_PRODUCTS_BY_SLUG:
            state = {
                ...state,
                products : action.payload.products,
                productsByPrice : {
                    ...action.payload.productsByPrice
                }
            }
        break;
    }
    return state;
}