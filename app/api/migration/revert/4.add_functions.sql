-- Revert ofrigo:4.add_functions from pg

BEGIN;

DROP FUNCTION getAllRecipes,convertQuantity ;

COMMIT;
