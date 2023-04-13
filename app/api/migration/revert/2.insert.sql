-- Revert ofrigo:2.insert from pg

BEGIN;

TRUNCATE account, message, category, ingredient, recipe, step, tag, account_has_ingredient, recipe_has_ingredient_with_quantity, recipe_has_tag RESTART IDENTITY;

COMMIT;
