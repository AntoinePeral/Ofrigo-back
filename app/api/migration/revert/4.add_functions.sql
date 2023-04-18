-- Revert ofrigo:4.add_functions from pg
-- Revert all functions
BEGIN;

DROP FUNCTION getAllRecipes,convertQuantity,getOneRecipe ;

COMMIT;
