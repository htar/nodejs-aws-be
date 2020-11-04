import productsList from "./productList.json";
import { generateResponse } from "./utils";
const productsPromise = Promise.resolve(productsList);

export const getAllProducts = async () => {
  try {
    const productsData = await productsPromise;
    return generateResponse({ body: productsData });
  } catch {
    return generateResponse({
      code: 500,
      body: { error: "Cannot get list of products" },
    });
  }
};
