import { SEARCH_PRODUCT, LOAD_SEARCH } from "../actions/types";
import { writeSearchedProduct } from "./../storage/productScanning";

export const productSearchState = (
    productSearched = null,
) => {
    return { productSearched, };
};

function saveSearchedProduct(state) {
    writeSearchedProduct(state);
    return state;
}

function searchProduct(upc) {
    let data = fetch(`http://89.115.148.193/api/Food/${upc}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
    })
        .then((response) => response.json())
        .then((productData) => {
            productSearchState(productData);
            saveSearchedProduct(productSearchState(productData));
            return productData;
        })
        .catch((error) => console.log(error));

    return data;
}

const reducer = (state = [], action) => {

    switch (action.type) {
        case SEARCH_PRODUCT:
            return searchProduct(state, action.upc);
        case LOAD_SEARCH:
            return action.data;
    }
    return state;
};
export default reducer;