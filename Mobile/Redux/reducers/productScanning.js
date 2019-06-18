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
    return fetch(`http://89.115.148.193/api/Food/${upc}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
    })
        .then((response) => response.json())
        .then((productData) => {
            console.log(productData)
            productSearchState(productData);
            saveSearchedProduct(productSearchState(productData));
        })
        .catch((error) => console.log(erros));
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