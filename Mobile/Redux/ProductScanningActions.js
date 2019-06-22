import {
  SEARCH_PRODUCT
} from "./ProductScanning";

export const searchProduct = upc => (
    {
      type: SEARCH_PRODUCT,
      payload: upc,
    }
  );
