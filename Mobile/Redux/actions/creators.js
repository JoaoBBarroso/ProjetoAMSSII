import {
    SEARCH_PRODUCT,
    LOAD_SEARCH
} from "./types";

export const searchProduct = upc => {
    return { type: SEARCH_PRODUCT, upc: upc };
};
export const loadData = searchedProduct => {
    return { type: LOAD_SEARCH, data: searchedProduct };
};
