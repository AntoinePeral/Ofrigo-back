-- Verify ofrigo:4.add_functions on pg

BEGIN;

SELECT * FROM getAllRecipes();
SELECT * FROM convertQuantity(1, 2);
SELECT * FROM getOneRecipe(1);

ROLLBACK;
