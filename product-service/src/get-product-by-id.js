import { generateResponse } from "./utils";
import { createClient } from "./db/client";
import getProduct from "./db/select-product-by-id.sql";

export const getProductById = async (event) => {
  console.log("get product with event: ", event);
  try {
    const client = await createClient();
    const { id } = event.pathParameters;
    const dbResponse = await client.query(getProduct, [id]);
    const product = dbResponse.rows[0];

    client.end();
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
