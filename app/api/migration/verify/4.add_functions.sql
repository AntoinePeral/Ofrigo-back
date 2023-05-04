-- Verify ofrigo:4.add_functions on pg
-- Verify all functions by some selects
BEGIN;

SELECT * FROM getAllRecipes();
SELECT * FROM convertQuantity(1, 2);
SELECT * FROM getOneRecipe(1);

ROLLBACK;
