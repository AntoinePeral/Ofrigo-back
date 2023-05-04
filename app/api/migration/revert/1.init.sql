-- Revert ofrigo:1.init from pg
-- Restore the database before creating the tables
BEGIN;

DROP TABLE IF EXISTS account, message, category, ingredient, recipe, step, tag, account_has_ingredient, recipe_has_ingredient_with_quantity, recipe_has_tag;

COMMIT;
