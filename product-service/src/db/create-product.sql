WITH product_insertion AS (
  INSERT INTO products(description, title, price) VALUES($1, $2, $3) RETURNING id
) INSERT INTO stocks(product_id, count) (SELECT product_insertion.id, $4 as count from product_insertion)
RETURNING product_id