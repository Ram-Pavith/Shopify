CREATE TABLE category(
    category_id SERIAL NOT NULL PRIMARY KEY,
    category_name character varying(50) NOT NULL
)

CREATE TABLE cart
(
    cart_id SERIAL NOT NULL,
    user_id integer UNIQUE NOT NULL,
    PRIMARY KEY (cart_id)
);

CREATE TABLE cart_item
(
    cart_item_id SERIAL NOT NULL,
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (cart_item_id),
    UNIQUE (cart_id, product_id)
);

CREATE TYPE "payment" AS ENUM (
  'PAYSTACK',
  'STRIPE'
);

CREATE TABLE order_item(
    order_item_id SERIAL NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    price decimal NOT NULL,
    image character varying(256) NOT NULL,
    PRIMARY KEY(order_item_id)
);

CREATE TABLE orders(
   order_id SERIAL NOT NULL,
   user_id integer NOT NULL,
   payment_status  character varying(20) NOT NULL,
   tax_price decimal NOT NULL DEFAULT 0.0,
   shipping_price decimal NOT NULL DEFAULT 0.0,
   total_price decimal NOT NULL DEFAULT 0.0,
   is_paid boolean NOT NULL DEFAULT false,
   is_delivered boolean NOT NULL DEFAULT false,
   delivered_at timestamp without time zone DEFAULT CURRENT_DATE NOT NULL,
   total decimal,
   payment_method payment,
   PRIMARY KEY(order_id)
);

CREATE TABLE resetTokens
(
    resettokens_id SERIAL NOT NULL,
    email character varying NOT NULL,
    token character varying NOT NULL,
    used boolean DEFAULT false NOT NULL,
    expiration timestamp without time zone,
    PRIMARY KEY (resettokens_id)
);

CREATE TABLE reviews(
    user_id integer NOT NULL,
    rating integer NOT NULL,
    comment text NOT NULL,
    product_id integer NOT NULL,
    review_date date NOT NULL,
    review_id integer NOT NULL,
    PRIMARY KEY (user_id,product_id)
);

CREATE TABLE products(
    product_id SERIAL NOT NULL,
    user_id integer NOT NULL,
    name character varying(50) NOT NULL,
    image_url character varying(200) NOT NULL,
    brand character varying(50) NOT NULL,
    category character varying(50) NOT NULL,
    description text NOT NULL,
    num_reviews decimal NOT NULL default 0,
    price decimal NOT NULL default 0,
    count_in_stock decimal NOT NULL default 5,
    created_at timestamp without time zone NOT NULL Default CURRENT_TIMESTAMP,
    PRIMARY KEY(product_id)

);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username character varying(50) NOT NULL,
    email character varying(50) unique NOT NULL,
    password character varying(256) NOT NULL,
    is_admin boolean NOT NULL Default false,
    address character varying(200),
    city character varying(100),
    state character varying(100),
    country character varying(100),
    created_at timestamp without time zone NOT NULL Default CURRENT_TIMESTAMP
);


ALTER TABLE cart
    ADD FOREIGN KEY (user_id)
    REFERENCES users (user_id)
    ON DELETE SET NULL
    NOT VALID;


ALTER TABLE cart_item
    ADD FOREIGN KEY (cart_id)
    REFERENCES cart (id)
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE cart_item
    ADD FOREIGN KEY (product_id)
    REFERENCES products (product_id)
    ON DELETE SET NULL
    NOT VALID;


ALTER TABLE order_item
    ADD FOREIGN KEY (order_id)
    REFERENCES orders (order_id)
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE order_item
    ADD FOREIGN KEY (product_id)
    REFERENCES products (product_id)
    ON DELETE SET NULL
    NOT VALID;


ALTER TABLE orders
    ADD FOREIGN KEY (user_id)
    REFERENCES users (user_id)
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE reviews
    ADD FOREIGN KEY (product_id)
    REFERENCES products (product_id)
    ON DELETE SET NULL
    NOT VALID;


ALTER TABLE reviews
    ADD FOREIGN KEY (user_id)
    REFERENCES users (user_id)
    ON DELETE SET NULL
    NOT VALID;

CREATE UNIQUE INDEX users_unique_lower_email_idx
    ON users (lower(email));

CREATE UNIQUE INDEX users_unique_lower_username_idx
    ON users (lower(username));

    -- Seed data for users table 
INSERT INTO public.users (email,password,username) VALUES('johndoe@example.com','123456','John Doe');
INSERT INTO public.users (email,password,username) VALUES('jonedoe@example.com','123456','Jane Doe');
INSERT INTO public.users (email,password,username,is_admin,address,city,state,country) VALUES('admin@example.com','Admin','Root User',true,'Guindy main road, Guindy','Chennai','TamilNadu','India');

    -- Seed data for Category table
INSERT INTO category(category_name) VALUES('Mens'),('Womens'),('Shoes')('New Season'),('Accessories'),('Hats')
    -- Seed data for Products table
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (1, 'Black T-Shirt', 956.97, 'A Plain Black T-Shirt, Skinny Fit Medium Size', 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',3,'Puma','Mens',5);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (2, 'White T-Shirt', 759.19, 'A Plain White T-Shirt, Skinny Fit Medium Sizze', 'https://images.pexels.com/photos/4101142/pexels-photo-4101142.jpeg?auto=compress&cs=tinysrgb&w=1600',3,'Levis','Mens',5 );
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (12, 'Funky Animals T-Shirt ', 979.29, 'A White T-Shirt with Funky Graphic Animals, Skinny Fit Medium Size ', 'https://images.pexels.com/photos/4048682/pexels-photo-4048682.jpeg?auto=compress&cs=tinysrgb&w=1600',3,'Shirtzy','Womens',5);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (3, 'Yellow T-Shirt', 669.45, 'A Plain Yellow T-Shirt, Skinny Fit Medium Size', 'https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=1600',3,'Levis','Mens, New Season',5);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (5, 'Angry Chocolate Banana T-Shirt', 753.58, 'A Angry Chocolate Banana Screaming in japanese, SKinny Fit Medium size', 'https://www.pexels.com/photo/photo-of-teenage-girl-in-bucket-hat-red-t-shirt-and-blue-jeans-standing-in-front-of-brown-wooden-door-2553790/',3,'Shirtzy','Womens',5);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (4, 'Hawaiian Shirt', 802.23, 'Hawaiian Shirt, Skinny Fit Medium Size', 'https://images.pexels.com/photos/14726363/pexels-photo-14726363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',3,'Peter England','Mens',5);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (6, 'Three Piece Suit', 936.89, 'Mens 3 piece suit, custom fitting', 'https://images.pexels.com/photos/10040216/pexels-photo-10040216.jpeg?auto=compress&cs=tinysrgb&w=1600',3,'Peter England','Mens,New Season',5);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (7, 'Hoodie', 897.34, 'Adidas Hoodie, Loose Fit Large Size', 'https://images.pexels.com/photos/1661471/pexels-photo-1661471.jpeg?auto=compress&cs=tinysrgb&w=1600',3,'Adidas','Womens,New Season',5);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (8, 'Mens Hat', 282.82, 'Mens Hat', 'https://images.pexels.com/photos/984619/pexels-photo-984619.jpeg?auto=compress&cs=tinysrgb&w=1600',3,'NewYork Caps','Mens,Hats',5);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (10, 'Birthday Hats', 35.29, 'Birthday Hats for kids', 'https://images.pexels.com/photos/7600331/pexels-photo-7600331.jpeg?auto=compress&cs=tinysrgb&w=1600',3,'Hatzy','Hats,New Season',5);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (11, 'Picnic Hat', 135.72, 'Womens Picnic Hat', 'https://images.pexels.com/photos/9532878/pexels-photo-9532878.jpeg?auto=compress&cs=tinysrgb&w=1600',3,'Hatzy','Womens,New Season',3);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (13, 'Irishman cap', 611.56, 'Irishman cap from Peaky blinders', 'https://images.pexels.com/photos/12074548/pexels-photo-12074548.jpeg?auto=compress&cs=tinysrgb&w=1600',3,'Hatzy','Hats,New Season',3);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (14, 'Beanie Caps', 287.14, 'Beanie caps for winter', 'https://images.pexels.com/photos/5215985/pexels-photo-5215985.jpeg?auto=compress&cs=tinysrgb&w=1600',3,'Hatzy','Hats',5);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (15, 'Nike Basketball Shoes', 605, 'Nike Basketball Shoes', 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1600',3,'Nike','Shoes,New Season',3);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (16, 'High Heels', 867.05, 'High Blood Red Heels', 'Icecream',3,'Zara','SHoes,New Season',3);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (17, 'Sneakers', 717.68, 'Sneakers', 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=1600',3,'Skechers','Shoes,New Season',3);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (18, 'Womens Shirt White', 898.42, 'Womens White Shirt, Large fit Large Size', 'https://images.pexels.com/photos/7945660/pexels-photo-7945660.jpeg?auto=compress&cs=tinysrgb&w=1600',3,'Zara','Womens',5);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (19, 'White Top', 732.36, 'Womens White Top, Skinny Fit Medium Size', 'https://images.pexels.com/photos/12883669/pexels-photo-12883669.jpeg?auto=compress&cs=tinysrgb&w=1600',3,'Louis Vitton','Womens,New Seaons',3);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (20, 'Womens Chinos', 606.2, 'Womens Chinos, Large Fit Large Size', 'https://images.pexels.com/photos/14559459/pexels-photo-14559459.jpeg?auto=compress&cs=tinysrgb&w=1600',3,'Louis Vitton','Womens,New Seaons',3);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (9, 'Mens Watch', 606.2, 'Swiss Watch for Men', 'https://images.pexels.com/photos/2442893/pexels-photo-2442893.jpeg?auto=compress&cs=tinysrgb&w=1600',3,'Swiss','Mens,New Seaons',3);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (21, 'Womens Earrings Leaf Shaped', 606.2, 'Womens Leaf Shaped Earrings', 'https://images.pexels.com/photos/989967/pexels-photo-989967.jpeg?auto=compress&cs=tinysrgb&w=1600',3,'Zara','Womens,New Seaons',3);
INSERT INTO public.products (product_id, name, price, description, image_url, user_id, brand, category, count_in_stock) VALUES (22, 'Black Handbag', 899.99, 'Womens Black Handbag small', 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=1600',3,'Zara','Womens,New Seaons',3);
