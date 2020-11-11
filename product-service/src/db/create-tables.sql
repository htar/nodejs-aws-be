DROP TABLE IF EXISTS stock;
DROP TABLE IF EXISTS product;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4(),
  description varchar(1000) NOT NULL,
  title varchar(100) NOT NULL,
  price NUMERIC(5,2) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS stocks (
  id UUID DEFAULT uuid_generate_v4(),
  product_id UUID,
  count integer NOT NULL,
  CONSTRAINT product_id FOREIGN KEY(product_id) REFERENCES product(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);

INSERT INTO products
(title, description, price) VALUES
('Eloquent JavaScript', 'A Modern Introduction to Programming', 2.4),
('Learning JavaScript Design Patterns', 'A JavaScript and jQuery Developer Guide', 10),
('Speaking JavaScript', 'An In-Depth Guide for Programmers', 23);

INSERT INTO stocks 
(product_id, count) VALUES
('2f7e7680-2cb2-4f79-8cdb-fc2aab269cda', 20),
('48bdf363-5333-4649-a425-e02df4bc520c', 10),
('e8b3f8c3-ff2f-4751-909e-37b1051fdd3d', 30);