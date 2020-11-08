import { generateResponse } from "./utils";
import { createClient } from "./db/client";
import getProducts from "./db/select-products.sql";

export const getAllProducts = async () => {
  console.log("get all products with event");
  try {
    const client = await createClient();
    const dbResponse = await client.query(getProducts);
    const products = dbResponse.rows;

    client.end();
    return generateResponse({ body: JSON.stringify(products) });
  } catch {
    return generateResponse({
      code: 500,
      body: { error: "Cannot get list of products" },
    });
  }
};
