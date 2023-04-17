
CREATE OR REPLACE FUNCTION getOneRecipeWithIngredients (recipe_id int) RETURNS TABLE (id int, label text, rate rate_validator, difficulty text, timeToDo text, ingredients little_title_validator[]) AS $$
	SELECT recipe.id, recipe.label, recipe.rate, recipe.difficulty, recipe.time, array_agg(ingredient.label)
	FROM recipe
	JOIN recipe_has_ingredient_with_quantity
	ON recipe.id=recipe_id
	JOIN ingredient
	ON ingredient.id=ingredient_id
	WHERE recipe.id=recipe_id
	GROUP BY recipe.id;
$$ LANGUAGE SQL;

SELECT * FROM getOneRecipeWithIngredients(1)

-----------------

-- Bonne version 
 SELECT
  r.label AS recipe,
  r.picture,
  r.rate,
  r.difficulty,
  r.time,
  json_agg(i.label) AS ingrédients,
  (
    SELECT json_agg(i.unit) FROM (
      SELECT DISTINCT ON (i2.id) i2.unit FROM ingredient i2 
      JOIN recipe_has_ingredient_with_quantity riq ON riq.recipe_id = r.id
      WHERE i2.id = riq.ingredient_id
    ) i
  ) AS unit,
  (
    SELECT json_agg(DISTINCT s.number ORDER BY s.number) FROM step s WHERE s.recipe_id = r.id
  ) AS stepsNumber,
  (
      SELECT json_agg(riq.ingredient_quantity) FROM recipe_has_ingredient_with_quantity riq WHERE riq.recipe_id=r.id
  ) AS Quantity,
	(
	SELECT json_agg(s.content) FROM step s WHERE s.recipe_id = r.id
  ) AS steps,
	json_agg (c.label) as category_name,
 	json_agg(DISTINCT (t.label)) as tag_name
FROM
  	recipe r
	JOIN recipe_has_ingredient_with_quantity riq ON riq.recipe_id = r.id
	JOIN ingredient i ON i.id = riq.ingredient_id
	JOIN category c ON c.id=i.category_id
	JOIN recipe_has_tag rt
	ON rt.recipe_id=r.id
	JOIN tag t
	ON tag_id=t.id
GROUP BY
  r.label, r.id
  

  -- Avec un id
   SELECT
  r.label AS recipe,
  r.picture,
  r.rate,
  r.difficulty,
  r.time,
  json_agg(i.label) AS ingrédients,
  (
    SELECT json_agg(i.unit) FROM (
      SELECT DISTINCT ON (i2.id) i2.unit FROM ingredient i2 
      JOIN recipe_has_ingredient_with_quantity riq ON riq.recipe_id = r.id
      WHERE i2.id = riq.ingredient_id
    ) i
  ) AS unit,
  (
    SELECT json_agg(DISTINCT s.number ORDER BY s.number) FROM step s WHERE s.recipe_id = r.id
  ) AS stepsNumber,
  (
      SELECT json_agg(riq.ingredient_quantity) FROM recipe_has_ingredient_with_quantity riq WHERE riq.recipe_id=r.id
  ) AS Quantity,
	(
	SELECT json_agg(s.content) FROM step s WHERE s.recipe_id = r.id
  ) AS steps,
	json_agg (c.label) as category_name,
 	json_agg(DISTINCT (t.label)) as tag_name
FROM
  	recipe r
	JOIN recipe_has_ingredient_with_quantity riq ON riq.recipe_id = r.id
	JOIN ingredient i ON i.id = riq.ingredient_id
	JOIN category c ON c.id=i.category_id
	JOIN recipe_has_tag rt
	ON rt.recipe_id=r.id
	JOIN tag t
	ON tag_id=t.id
	WHERE r.id=1
GROUP BY
  r.label, r.id


-- --------------
-- SELECT
--   r.label AS recipe,
--   json_agg(DISTINCT i.label) AS ingrédients,
--   json_agg(i.unit) AS unit,
--   json_agg(DISTINCT s.number) AS steps
-- FROM
--   recipe r
--   JOIN recipe_has_ingredient_with_quantity riq ON riq.recipe_id = r.id
--   JOIN ingredient i ON i.id = riq.ingredient_id
--   JOIN step s ON s.recipe_id = r.id
-- GROUP BY
--   r.id;


-- CREATE OR REPLACE FUNCTION getAllRecipe () 
-- RETURNS TABLE 
-- (id int, label text, picture text, rate rate_validator, difficulty text, timetodo text, ingredientsLabel little_title_validator, unit measure, ingredientQuantity positive_number_or_null, steppNumber positive_int, stepContent content_validator, tag little_title_validator ) AS $$
-- 	SELECT
-- 	r.id ,
-- 	r.label as recepe_name, 
-- 	r.picture,
-- 	r.rate,
-- 	r.difficulty,
-- 	r.time,
-- 	i.label as ingredient_name,
-- 	i.unit,
-- 	riq.ingredient_quantity as quantity,
-- 	s.number,
-- 	s.content,
-- 	t.label as tag_name
-- 	FROM recipe r
-- 	JOIN recipe_has_ingredient_with_quantity riq
-- 	ON recipe_id=r.id
-- 	JOIN ingredient i
-- 	ON ingredient_id=i.id
-- 	JOIN step s
-- 	ON s.recipe_id=r.id
-- 	JOIN recipe_has_tag rt
-- 	ON rt.recipe_id=r.id
-- 	JOIN tag t
-- 	ON tag_id=t.id
-- 	ORDER BY r.id
-- $$ LANGUAGE SQL;

-- SELECT * FROM getAllRecipeWithIngredients () 

-- -----------

-- CREATE OR REPLACE FUNCTION getOneRecipe (r_id int) 
--   RETURNS TABLE (
--     id int,
--     label text,
--     picture text,
--     rate rate_validator,
--     difficulty text,
--     timetodo text,
--     ingredientsLabel little_title_validator,
--     unit measure,
--     ingredientQuantity positive_number_or_null,
--     stepNumber positive_int,
--     stepContent content_validator,
--     tag little_title_validator ) AS $$
--     SELECT
--     r.id,
--     r.label as recepe_name, 
--     r.picture,
--     r.rate,
--     r.difficulty,
--     r.time,
-- 	array_agg(DISTINCT (i.label)) as ingredient_name,
--     array_agg(DISTINCT (i.unit))as unit_measure,
--     array_agg(DISTINCT (riq.ingredient_quantity)) as quantity,
--     array_agg(DISTINCT(s.number)) as step_number,
--     array_agg (DISTINCT(s.content)) as step,
--     array_agg(DISTINCT (t.label)) as tag_name
--     FROM recipe r
--     JOIN recipe_has_ingredient_with_quantity riq
--     ON riq.recipe_id=r.id
--     JOIN ingredient i
--     ON ingredient_id=i.id
--     JOIN step s
--     ON s.recipe_id=r.id
--     JOIN recipe_has_tag rt
--     ON rt.recipe_id=r.id
--     JOIN tag t
--     ON tag_id=t.id
--     GROUP BY r.id,s.id
-- 	ORDER BY s.id
-- $$ LANGUAGE SQL;

-- SELECT * FROM getOneRecipe(1)


-- ---

-- SELECT
--     r.label as recepe_name, 
--     r.picture,
--     r.rate,
--     r.difficulty,
--     r.time,
--     array_agg (i.label) as ingredient_name,
--     array_agg (i.unit) as unit,
--     array_agg(riq.ingredient_quantity) as quantity,
--     array_agg (s.number) as step,
-- 	array_agg(s.content)as content,
--     array_agg(t.label) as tag_name
--     FROM recipe r
--     JOIN recipe_has_ingredient_with_quantity riq
--     ON riq.recipe_id=r.id
--     JOIN ingredient i
--     ON ingredient_id=i.id
--     JOIN step s
--     ON s.recipe_id=r.id
--     JOIN recipe_has_tag rt
--     ON rt.recipe_id=r.id
--     JOIN tag t
--     ON tag_id=t.id
--     GROUP BY r.id


  
  
--   --------
--  SELECT
--   r.label AS recipe,
--   r.picture,
--   r.rate,
--   r.difficulty,
--   r.time,
--   json_agg(i.label) AS ingrédients,
--   (
--     SELECT json_agg(i.unit) FROM (
--       SELECT DISTINCT ON (i2.id) i2.unit FROM ingredient i2 
--       JOIN recipe_has_ingredient_with_quantity riq ON riq.recipe_id = r.id
--       WHERE i2.id = riq.ingredient_id
--     ) i
--   ) AS unit,
--   (
--     SELECT json_agg(DISTINCT s.number ORDER BY s.number) FROM step s WHERE s.recipe_id = r.id
--   ) AS stepsNumber,
--   (
--       SELECT json_agg(riq.ingredient_quantity) FROM recipe_has_ingredient_with_quantity riq WHERE riq.recipe_id=r.id
--   ) AS Quantity,
-- 	(
-- 	SELECT json_agg(s.content) FROM step s WHERE s.recipe_id = r.id
--   ) AS steps,
-- (
--   SELECT json_agg(c.label) FROM (
-- 	  SELECT DISTINCT ON (c2.id)c2.label FROM category c2
-- 	  JOIN ingredient i ON c2.id=i.category_id
-- 	  WHERE c2.id = i.category_id
-- )c1) as category_name,
--   array_agg(DISTINCT (t.label)) as tag_name
-- FROM
--   	recipe r
-- 	JOIN recipe_has_ingredient_with_quantity riq ON riq.recipe_id = r.id
-- 	JOIN ingredient i ON i.id = riq.ingredient_id
-- 	JOIN category c ON c.id=i.category_id
-- 	JOIN recipe_has_tag rt
-- 	ON rt.recipe_id=r.id
-- 	JOIN tag t
-- 	ON tag_id=t.id

-- GROUP BY
--   r.label, r.id
  
  
--   ------
-- SELECT
--   r.label AS recipe,
--   r.picture,
--   r.rate,
--   r.difficulty,
--   r.time,
--   json_agg(i.label) AS ingrédients,
--   (
--     SELECT json_agg(i.unit) FROM (
--       SELECT DISTINCT ON (i2.id) i2.unit FROM ingredient i2 
--       JOIN recipe_has_ingredient_with_quantity riq ON riq.recipe_id = r.id
--       WHERE i2.id = riq.ingredient_id
--     ) i
--   ) AS unit,
--   (
--     SELECT json_agg(DISTINCT s.number ORDER BY s.number) FROM step s WHERE s.recipe_id = r.id
--   ) AS stepsNumber,
--   (
--       SELECT json_agg(riq.ingredient_quantity) FROM recipe_has_ingredient_with_quantity riq WHERE riq.recipe_id=r.id
--   ) AS Quantity,
-- 	(
-- 	SELECT json_agg(s.content) FROM step s WHERE s.recipe_id = r.id
--   ) AS steps,
-- (
--   SELECT json_agg(c.label) FROM (
--     SELECT DISTINCT ON (c2.id) c2.label FROM category c2
--     JOIN category c ON c.id=i.category_id
--     WHERE c2.id = i.category_id
--   ) c1
-- ) AS category_name,
--   array_agg(DISTINCT (t.label)) as tag_name
-- FROM
--   	recipe r
-- 	JOIN recipe_has_ingredient_with_quantity riq ON riq.recipe_id = r.id
-- 	JOIN ingredient i ON i.id = riq.ingredient_id
-- 	JOIN category c ON c.id=i.category_id
-- 	JOIN recipe_has_tag rt
-- 	ON rt.recipe_id=r.id
-- 	JOIN tag t
-- 	ON tag_id=t.id
-- GROUP BY
--   r.label, r.id, c.id
  
--   --
  
--   SELECT
--   r.label AS recipe,
--   r.picture,
--   r.rate,
--   r.difficulty,
--   r.time,
--   json_agg(i.label) AS ingrédients,
--   (
--     SELECT json_agg(i.unit) FROM (
--       SELECT DISTINCT ON (i2.id) i2.unit FROM ingredient i2 
--       JOIN recipe_has_ingredient_with_quantity riq ON riq.recipe_id = r.id
--       WHERE i2.id = riq.ingredient_id
--     ) i
--   ) AS unit,
--   (
--     SELECT json_agg(DISTINCT s.number ORDER BY s.number) FROM step s WHERE s.recipe_id = r.id
--   ) AS stepsNumber,
--   (
--       SELECT json_agg(riq.ingredient_quantity) FROM recipe_has_ingredient_with_quantity riq WHERE riq.recipe_id=r.id
--   ) AS Quantity,
-- 	(
-- 	SELECT json_agg(s.content) FROM step s WHERE s.recipe_id = r.id
--   ) AS steps,
--   (
--     SELECT json_agg(c2.label) FROM (
--     SELECT DISTINCT ON (c.id) c.id, c.label FROM category c
--     JOIN ingredient i ON c.id = i.category_id
--     JOIN recipe_has_ingredient_with_quantity riq ON i.id = riq.ingredient_id
--     WHERE riq.recipe_id = r.id
-- ) c2)
-- 	  AS category_name,
--   array_agg(DISTINCT (t.label)) as tag_name
-- FROM
--   	recipe r
-- 	JOIN recipe_has_ingredient_with_quantity riq ON riq.recipe_id = r.id
-- 	JOIN ingredient i ON i.id = riq.ingredient_id
-- 	JOIN category c ON c.id=i.category_id
-- 	JOIN recipe_has_tag rt
-- 	ON rt.recipe_id=r.id
-- 	JOIN tag t
-- 	ON tag_id=t.id
-- GROUP BY
--   r.label, r.id;


