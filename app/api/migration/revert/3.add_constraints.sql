-- Revert ofrigo:3.add_constraints from pg

BEGIN;

ALTER TABLE account
  ALTER COLUMN email TYPE TEXT,
  Alter COLUMN password TYPE TEXT,
  ALTER COLUMN last_name TYPE TEXT,
  ALTER COLUMN first_name TYPE TEXT;


ALTER TABLE message 
  ALTER COLUMN title TYPE TEXT,
  ALTER COLUMN content TYPE TEXT,
  ALTER COLUMN email TYPE TEXT;

ALTER TABLE category
  ALTER COLUMN label TYPE TEXT;

ALTER TABLE ingredient
  ALTER COLUMN label TYPE TEXT;

ALTER TABLE recipe
  DROP CONSTRAINT unique_recipe_label,
  ALTER COLUMN label TYPE TEXT,
  ALTER COLUMN rate TYPE NUMERIC;

ALTER TABLE step
  ALTER COLUMN content TYPE TEXT,
  ALTER COLUMN number TYPE INTEGER;

ALTER TABLE tag
  DROP CONSTRAINT unique_tag_label,
  ALTER COLUMN label TYPE TEXT;


-- UNIQUE(a,c) --> This specifies that the combination of values in the indicated columns is unique across the whole table, though any one of the columns need not be (and ordinarily isn't) unique. -- 
-- Thus, an account cannot have multiple instances of the same ingredient in its list.
ALTER TABLE account_has_ingredient
  DROP CONSTRAINT unique_account_ingredient;

ALTER TABLE recipe_has_ingredient_with_quantity
  ALTER COLUMN ingredient_quantity TYPE NUMERIC;


DROP DOMAIN email_validator ;
DROP DOMAIN password_validator;
DROP DOMAIN lenghtName_validator;
DROP DOMAIN title_validator;
DROP DOMAIN little_title_validator;
DROP DOMAIN content_validator;
DROP DOMAIN rate_validator;
DROP DOMAIN positive_int;
DROP DOMAIN positive_number;

COMMIT;
