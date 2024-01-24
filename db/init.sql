DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  id varchar(36) NOT NULL,
  name varchar(100) NOT NULL,
  email varchar(50) NOT NULL,
  password varchar(60) NOT NULL,
  created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS items (
  id varchar(36) NOT NULL,
  title varchar(60) NOT NULL,
  description varchar(200) NOT NULL,
  image varchar(200),
  price DECIMAL(10,2) NOT NULL,
  ownerId varchar(36) NOT NULL,
  FOREIGN KEY (ownerId) REFERENCES users(id),
  created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO users (id, name, email, password)
VALUES ('3b473b16-dec6-11ed-9023-0242ac160003', 'John Doe', 'john@example.com', 'password1'),
       ('3b473b17-dec6-11ed-9023-0242ac160003', 'Jane Doe', 'jane@example.com', 'password2');

INSERT INTO items (id, title, description, image, price, ownerId)
VALUES ('3b480158-dec6-11ed-9023-0242ac160003', 'Book', 'A great book', 'https://www.stockvault.net/data/2009/10/28/111363/thumb16.jpg', 10.99, (SELECT id FROM users WHERE email = 'john@example.com')),
       ('3b4804bf-dec6-11ed-9023-0242ac160003', 'Shoes', 'A nice pair of shoes', 'https://thumbs.dreamstime.com/b/vintage-red-shoes-23151148.jpg', 49.99, (SELECT id FROM users WHERE email = 'john@example.com')),
       ('3b48062d-dec6-11ed-9023-0242ac160003', 'Phone', 'A new phone', 'https://static.vecteezy.com/system/resources/previews/007/449/174/original/hand-holding-mobile-phone-isolate-on-white-background-free-photo.jpg', 399.99, (SELECT id FROM users WHERE email = 'jane@example.com')),
       ('3b4808d8-dec6-11ed-9023-0242ac160003', 'Watch', 'A stylish watch', 'https://thumbs.dreamstime.com/b/gold-watch-13362757.jpg', 199.99, (SELECT id FROM users WHERE email = 'jane@example.com'));
