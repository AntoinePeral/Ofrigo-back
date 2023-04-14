-- Verify ofrigo:3.add_constraints on pg

BEGIN;

SELECT id,last_name,first_name,email,password,role FROM account WHERE false;
SELECT id,title,content,email FROM message WHERE false;
SELECT id,label FROM category WHERE false;
SELECT id,label,unit measure FROM ingredient WHERE false;
SELECT id,label,picture,rate,difficulty,time FROM recipe WHERE false;
SELECT id,content,number,recipe_id FROM step WHERE false;
SELECT id,label FROM tag WHERE false;
SELECT account_id,ingredient_id FROM account_has_ingredient WHERE false;
SELECT id,recipe_id,ingredient_id,ingredient_quantity FROM recipe_has_ingredient_with_quantity WHERE false;
SELECT recipe_id,tag_id FROM recipe_has_tag WHERE false;


INSERT INTO account (last_name, first_name, email, password, role)
VALUES( 'Doe', 'John', 'johndoe@example.com', 'Password123!', 'user'); -- email valide
-- ('Smith', 'Jane', 'janesmith@', 'Password123!', 'user'); -- email invalide

-- password_validator
INSERT INTO account ( last_name, first_name, email, password, role)
VALUES
('Doe', 'John', 'johndoes@example.com', 'Password123!', 'user'), -- mot de passe valide
('Does', 'Johns', 'johndoezz@example.cosm', 'Password123!', 'admin');
-- ('Does', 'Johns', 'johndoe@example.cosm', 'Password123!', null),
-- ('Smith', 'Jane', 'janesmith@', 'password', 'user'); -- mot de passe invalide

-- lenghtName_validator
INSERT INTO account ( last_name, first_name, email, password, role)
VALUES
('Doe', 'John', 'johndoecx@example.com', 'Password123!', 'user'); -- nom valide
-- ('S', 'Jane', 'janesmith@example.com', 'Password123!', 'user'); -- nom invalide

-- title_validator
INSERT INTO recipe ( label, picture, rate, difficulty, time)
VALUES
('Deliciouds Chicken Curry with Rice and Peas', 'http://example.com/curry.jpg', 4.5, 'medium', '60 minutes');-- titre valide
-- ('This is a long title that should not be allowed because it exceeds the maximum length of the title_validator domain', 'http://example.com/long_title.jpg', 3.2, 'easy', '30 minutes'); -- titre invalide

-- little_title_validator
INSERT INTO category ( label)
VALUES
('Soup'); -- petit titre valide
-- ('This is a long label that should not be allowed because it exceeds the maximum length of the little_title_validator domain'); -- petit titre invalide

-- content_validator
INSERT INTO message ( title, content, email)
VALUES
('Hello', 'This is a message with valid content.', 'johndoe@example.com'); -- contenu valide
-- ('Goodbye', 'This is a message with content that is too long and should not be allowed by the content_validator domain.', 'janesmith@example.com'); -- contenu invalide

-- rate_validator
INSERT INTO recipe ( label, picture, rate, difficulty, time)
VALUES
('Delicious Chicken Curry with Rice and Peas', 'http://example.com/curry.jpg', 4.5, 'medium', '60 minutes'); -- note valide
-- ('Not So Good Soup', 'http://example.com/soup.jpg', 10, 'easy', '30 minutes'); -- note invalide

-- positive_int
INSERT INTO step ( content, number, recipe_id)
VALUES
('Step 1: Heat the oven to 375 degrees.', 1, 1); -- entier positif valide
-- ('Step 2: Mix ingredients together in a large bowl.', -1, 1); -- entier positif invalide


-- Domain positive_number
INSERT INTO recipe_has_ingredient_with_quantity (recipe_id, ingredient_id, ingredient_quantity) VALUES (1, 1, 1.5);
INSERT INTO recipe_has_ingredient_with_quantity (recipe_id, ingredient_id, ingredient_quantity) VALUES (2, 2, NULL);

ROLLBACK;
