WITH product_insertion AS (
  INSERT INTO product(description, title, price) VALUES($1, $2, $3) RETURNING id
) INSERT INTO stock(product_id, count) (SELECT product_insertion.id, $4 as count from product_insertion)
RETURNING product_id