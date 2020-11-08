import { generateResponse } from "./utils";
import { createClient } from "./db/client";
import getProduct from "./db/select-product-by-id.sql";

export const getProductById = async (event) => {
  const { productId } = event.pathParameters;
  let client;
  try {
    client = await createClient();
    await client.connect();
    const queryResult = await client.query(getProduct, [productId]);

    if (queryResult.rows.length) {
      const product = queryResult.rows[0];
      client.end();
      return generateResponse({ body: JSON.stringify(product) });
    }
    return generateResponse({
      code: 404,
      body: { error: "Not found" },
    });
  } catch {
    await client.query("rollback");
    return generateResponse({
      code: 500,
      body: { error: "Cannot get product by id" },
    });
  } finally {
    client && client.end();
  }
};
