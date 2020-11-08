SELECT p.id, description, title, price, count
FROM products as p
INNER JOIN stocks as s ON s.product_id = p.id
WHERE p.id = $1