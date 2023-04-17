-- Deploy ofrigo:4.add_functions to pg

BEGIN;

CREATE OR REPLACE FUNCTION getAllRecipes () 
  RETURNS TABLE (
    id int,
    label text,
    picture text,
    rate rate_validator,
    difficulty text,
    timetodo text,
    ingredientsLabel little_title_validator,
    unit measure,
    ingredientQuantity positive_number_or_null,
    stepNumber positive_int,
    stepContent content_validator,
    tag little_title_validator ) AS $$
    SELECT
    r.id ,
    r.label as recepe_name, 
    r.picture,
    r.rate,
    r.difficulty,
    r.time,
    i.label as ingredient_name,
    i.unit,
    riq.ingredient_quantity as quantity,
    s.number,
    s.content,
    t.label as tag_name
    FROM recipe r
    JOIN recipe_has_ingredient_with_quantity riq
    ON recipe_id=r.id
    JOIN ingredient i
    ON ingredient_id=i.id
    JOIN step s
    ON s.recipe_id=r.id
    JOIN recipe_has_tag rt
    ON rt.recipe_id=r.id
    JOIN tag t
    ON tag_id=t.id
    ORDER BY r.id
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION getOneRecipe (r_id int) 
  RETURNS TABLE (
    id int,
    label text,
    picture text,
    rate rate_validator,
    difficulty text,
    timetodo text,
    ingredientsLabel little_title_validator,
    unit measure,
    ingredientQuantity positive_number_or_null,
    stepNumber positive_int,
    stepContent content_validator,
    tag little_title_validator ) AS $$
    SELECT
    r.id ,
    r.label as recepe_name, 
    r.picture,
    r.rate,
    r.difficulty,
    r.time,
    i.label as ingredient_name,
    i.unit,
    riq.ingredient_quantity as quantity,
    s.number,
    s.content,
    t.label as tag_name
    FROM recipe r
    JOIN recipe_has_ingredient_with_quantity riq
    ON riq.recipe_id=r.id
    JOIN ingredient i
    ON ingredient_id=i.id
    JOIN step s
    ON s.recipe_id=r.id
    JOIN recipe_has_tag rt
    ON rt.recipe_id=r.id
    JOIN tag t
    ON tag_id=t.id
    WHERE r.id=r_id
$$ LANGUAGE SQL;

-- Functions test --> TODO DELETE if we don't need them anymore --

-- CREATE OR REPLACE FUNCTION getOneRecipe (recipe_id int) RETURNS recipe AS $$
-- 	SELECT * FROM recipe
-- 	WHERE id = recipe_id
-- $$ LANGUAGE SQL 

-- SELECT * FROM getOneRecipe(2)


-- CREATE FUNCTION getAllRecipe () RETURNS SETOF Recipe AS $$
--     SELECT *
--     FROM recipe
-- $$ LANGUAGE SQL;

-- SELECT *  FROM getAllRecipe()


-- --Avec un aggregate

-- CREATE OR REPLACE FUNCTION getOneRecipeWithIngredients (recipe_id int) RETURNS TABLE (id int, label text, rate rate_validator, difficulty text, timeToDo text, ingredients little_title_validator[]) AS $$
-- 	SELECT recipe.id, recipe.label, recipe.rate, recipe.difficulty, recipe.time, array_agg(ingredient.label)
-- 	FROM recipe
-- 	JOIN recipe_has_ingredient_with_quantity
-- 	ON recipe.id=recipe_id
-- 	JOIN ingredient
-- 	ON ingredient.id=ingredient_id
-- 	WHERE recipe.id=recipe_id
-- 	GROUP BY recipe.id;
-- $$ LANGUAGE SQL;

-- SELECT * FROM getOneRecipeWithIngredients(1)


-- ----- Ou sans aggregate 

-- CREATE OR REPLACE FUNCTION getOneRecipeWithIngredients (recipe_id int) RETURNS TABLE (id int, label text, rate rate_validator, difficulty text, timeToDo text, ingredients little_title_validator) AS $$
-- 	SELECT recipe.id, recipe.label, recipe.rate, recipe.difficulty, recipe.time, ingredient.label
-- 	FROM recipe
-- 	JOIN recipe_has_ingredient_with_quantity
-- 	ON recipe.id=recipe_id
-- 	JOIN ingredient
-- 	ON ingredient.id=ingredient_id
-- 	WHERE recipe.id=recipe_id
-- 	GROUP BY recipe.id, ingredient.label;
-- $$ LANGUAGE SQL;

-- SELECT * FROM getOneRecipeWithIngredients(1)
-- ORDER BY id


-- -------

-- CREATE OR REPLACE FUNCTION getAllRecipeWithIngredients () RETURNS TABLE (id int, label text, rate rate_validator, difficulty text, timeToDo text, ingredients little_title_validator, unit measure) AS $$
-- 	SELECT recipe.id, recipe.label, recipe.rate, recipe.difficulty, recipe.time, ingredient.label, ingredient.unit
-- 	FROM recipe
-- 	JOIN recipe_has_ingredient_with_quantity
-- 	ON recipe.id=recipe_id
-- 	JOIN ingredient
-- 	ON ingredient.id=ingredient_id
-- 	GROUP BY recipe.id, ingredient.label, ingredient.unit;
-- $$ LANGUAGE SQL;

-- SELECT * FROM getAllRecipeWithIngredients()
-- GROUP BY getallrecipewithingredients.id, getallrecipewithingredients.label, getallrecipewithingredients.rate,getallrecipewithingredients.difficulty, getallrecipewithingredients.timetodo,getallrecipewithingredients.ingredients,getallrecipewithingredients.unit


COMMIT;
