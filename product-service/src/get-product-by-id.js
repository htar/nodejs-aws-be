import productsList from "./productList.json";
import { generateResponse } from "./utils";
const productsPromise = Promise.resolve(productsList);

export const getProductById = async (event) => {
  try {
    const { productId } = event.pathParameters;
    const productsData = await productsPromise;
    const product = productsData.find((item) => item.id === productId);

    if (product) {
      return generateResponse({ body: product });
    }
    return generateResponse({
      code: 404,
      body: { error: "Not found" },
    });
  } catch {
    return generateResponse({
      code: 500,
      body: { error: "Cannot get product by id" },
    });
  }
};
