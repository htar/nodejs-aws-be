SELECT product_table.id, description, title, price, count
FROM product product_table
INNER JOIN stock stock_table ON stock_table.product_id = product_table.id