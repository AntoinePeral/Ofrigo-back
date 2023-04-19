-- Deploy ofrigo:3.add_constraints to pg

BEGIN;
-- Create Domain to secure and define type in Database  
CREATE DOMAIN email_validator as TEXT CHECK ( VALUE ~ '^[\w\-_]+(\.[\w\-_]+)?@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)?\.[a-z]{2,}$');
CREATE DOMAIN password_validator as TEXT CHECK (VALUE ~ '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\/$.#!?§:;%])[A-Za-z\d!?:;@$!%*?&\/$.#%]{8,}$');
CREATE DOMAIN lenghtName_validator as TEXT CHECK (VALUE ~ '^[a-zA-Z]{2,100}$');
CREATE DOMAIN title_validator AS TEXT CHECK (LENGTH(VALUE) <= 100);
CREATE DOMAIN little_title_validator AS TEXT CHECK (LENGTH(VALUE) <= 50);
CREATE DOMAIN content_validator AS TEXT CHECK (LENGTH(VALUE) <= 1000);
CREATE DOMAIN rate_validator AS NUMERIC CHECK (VALUE >= 0 AND VALUE <= 5);
CREATE DOMAIN positive_int AS INT CHECK (VALUE > 0);
CREATE DOMAIN positive_number_or_null AS NUMERIC CHECK (VALUE > 0 OR VALUE IS NULL);


ALTER TABLE account
  ALTER COLUMN email TYPE email_validator,
  Alter COLUMN password TYPE password_validator,
  ALTER COLUMN last_name TYPE lenghtName_validator,
  ALTER COLUMN first_name TYPE lenghtName_validator;


ALTER TABLE message 
  ALTER COLUMN title TYPE title_validator,
  ALTER COLUMN content TYPE content_validator,
  ALTER COLUMN email TYPE email_validator;

ALTER TABLE category
  ALTER COLUMN label TYPE little_title_validator;

ALTER TABLE ingredient
  ALTER COLUMN label TYPE little_title_validator;

ALTER TABLE recipe
  ADD CONSTRAINT unique_recipe_label UNIQUE(label),
  ALTER COLUMN label TYPE title_validator,
  ALTER COLUMN rate TYPE rate_validator;

ALTER TABLE step
  ALTER COLUMN content TYPE content_validator,
  ALTER COLUMN number TYPE positive_int;

ALTER TABLE tag
  ADD CONSTRAINT unique_tag_label UNIQUE (label),
  ALTER COLUMN label TYPE little_title_validator;


-- UNIQUE(a,c) --> This specifies that the combination of values in the indicated columns is unique across the whole table, though any one of the columns need not be (and ordinarily isn't) unique. -- 
-- Thus, an account cannot have multiple instances of the same ingredient in its list.
ALTER TABLE account_has_ingredient
  ADD CONSTRAINT unique_account_ingredient
  UNIQUE (account_id, ingredient_id);

ALTER TABLE recipe_has_ingredient_with_quantity
  ALTER COLUMN ingredient_quantity TYPE positive_number_or_null;

COMMIT;
