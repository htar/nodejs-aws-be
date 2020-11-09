import { generateResponse } from "./utils";
import { createClient } from "./db/client";
import createProduct from "./db/create-product.sql";

export const addProduct = async (event) => {
  console.log("add product with event: ", event);

  let client;
  try {
    const product = JSON.parse(event.body);
    const { description, title, price, count } = product;

    client = await createClient();
    await client.query("begin");
    const queryResult = await client.query(createProduct, [
      description,
      title,
      price,
      count,
    ]);
    await client.query("commit");
    return generateResponse({
      code: 201,
      body: {
        ...queryResult.rows[0],
        count,
      },
    });
  } catch (err) {
    console.error(err);
    await client.query("rollback");
    return generateResponse({
      code: 500,
      body: { error: "DB error: Cannot insert product" },
    });
  } finally {
    client && client.end();
  }
};
