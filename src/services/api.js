export async function getCategories() {
  const END_POINT_CATEGORY = 'https://api.mercadolibre.com/sites/MLB/categories';

  const request = await fetch(END_POINT_CATEGORY);
  const result = await request.json();

  return result;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const END_POINT_SEARCH = 'https://api.mercadolibre.com/sites/MLB/search?';
  const categoryIdParam = `category=${categoryId}`;
  const queryParam = `q=${query}`;
  let request;

  if (query === undefined || query === '') {
    request = await fetch(`${END_POINT_SEARCH}${categoryIdParam}`);
  }
  if (categoryId === undefined || categoryId === '') {
    request = await fetch(`${END_POINT_SEARCH}${queryParam}`);
  }
  if (categoryId && query) {
    request = await fetch(`${END_POINT_SEARCH}${categoryIdParam}&${queryParam}`);
  }
  const result = await request.json();

  return result;
}

export async function getProduct(productID) {
  const END_POINT_CATEGORY = 'https://api.mercadolibre.com/items/';

  const request = await fetch(`${END_POINT_CATEGORY}${productID}`);
  const result = await request.json();

  return result;
}
