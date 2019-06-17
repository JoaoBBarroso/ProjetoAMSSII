import ProductScanningReducer from "./productScanning";

const initialState = () => {
    return { productSearched: {} };
};

export const reducer = (state = initialState(), action) => {
    let productSearched = ProductScanningReducer(state.productSearched, action);
    return {
        productSearched: productSearched,
    };
};