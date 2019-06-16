export const searchProduct = upc => (
    {
      type: 'SEARCH_PRODUCT',
      payload: upc,
    }
  );