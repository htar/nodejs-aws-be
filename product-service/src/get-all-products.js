import { generateResponse } from "./utils";
import { createClient } from "./db/client";
import getProducts from "./db/select-products.sql";

export const getAllProducts = async () => {
  let client;
  try {
    client = await createClient();
    await client.query("begin"); 
    const queryResult = await client.query(getProducts);
    const products = queryResult.rows;
    client.end();
    return generateResponse({ body: JSON.stringify(products) });
  } catch {
    await client.query("rollback");
    return generateResponse({
      code: 500,
      body: { error: "Cannot get list of products" },
    });
  } finally {
    client && client.end();
  }
};
