import { generateResponse } from "./utils";
import { createClient } from "./db/client";
import createProduct from "./db/create-product.sql";

export const addProduct = async (event) => {
  console.log("add product with event: ", event);

  let client;
  try {
    const { description, title, price, count } = JSON.parse(event.body);
    client = await createClient();
    const dbResponse = await client.query(createProduct, [
      description,
      title,
      price,
      count,
    ]);

    return generateResponse({
      body: JSON.stringify({
        ...dbResponse.rows[0],
        count,
      }),
    });
  } catch (err) {
    console.error(err);
    return generateResponse({
      code: 500,
      body: { error: "DB error: Cannot insert product" },
    });
  } finally {
    client && client.end();
  }
};
