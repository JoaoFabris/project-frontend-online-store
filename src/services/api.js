export async function getCategories() {
  const END_POINT_CATEGORY = 'https://api.mercadolibre.com/sites/MLB/categories';

  const request = await fetch(END_POINT_CATEGORY);
  const result = await request.json();

  return result;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const END_POINT_ID_QUERY = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;

  const request = await fetch(END_POINT_ID_QUERY);
  const result = await request.json();

  return result.results;
}
