

CREATE OR REPLACE FUNCTION getAllRecipes () 
  RETURNS TABLE (
    id int,
    label text,
    picture text,
    rate rate_validator,
    difficulty text,
    timetodo text,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
    ingredients json,
	steps json,
    tag json ) AS $$
SELECT
r.id,
r.label AS label,
r.picture,
r.rate,
r.difficulty,
r.time,
r.created_at,
r.updated_at,
(
	SELECT 
		json_agg(
			json_build_object(
				'id', i.id,
				'label', i.label,
				'quantity', riq.ingredient_quantity,
				'unit', i.unit,
				'created_at', i.created_at,
				'updated_at', i.updated_at,
				'category_id', c.id,
				'category_label', c.label,
				'category_created_at', c.created_at,
				'category_updated_at', c.updated_at
			) 
			ORDER BY i.created_at
		)
	FROM ingredient i 
	JOIN recipe_has_ingredient_with_quantity riq ON ingredient_id = i.id
	JOIN category c ON c.id = i.category_id
	WHERE recipe_id = r.id
) AS ingredient,
(
	SELECT 
		json_agg(s.* ORDER BY s.created_at) 
	FROM step s 
	WHERE s.recipe_id = r.id
) AS step,
(
	SELECT 
		json_agg(t.* ORDER BY t.label ASC) 
	FROM tag t 
	JOIN recipe_has_tag rt ON tag_id = t.id
	WHERE recipe_id = r.id
) AS tag
FROM recipe r
JOIN recipe_has_ingredient_with_quantity riq ON riq.recipe_id = r.id
GROUP BY r.id
ORDER BY r.id ASC
$$ LANGUAGE SQL;


-- Function à refaire si on a le temps

-- CREATE OR REPLACE FUNCTION getOneRecipe (recipe_id int) 
--   RETURNS TABLE (
--     id int,
--     label text,
--     picture text,
--     rate rate_validator,
--     difficulty text,
--     timetodo text,
-- 	created_at timestamp with time zone,
-- 	updated_at timestamp with time zone,
--     ingredients json,
-- 	steps json,
--     tag json ) AS $$
-- SELECT
-- r.id,
-- r.label AS label,
-- r.picture,
-- r.rate,
-- r.difficulty,
-- r.time,
-- r.created_at,
-- r.updated_at,
-- (
-- 	SELECT 
-- 		json_agg(
-- 			json_build_object(
-- 				'id', i.id,
-- 				'label', i.label,
-- 				'quantity', riq.ingredient_quantity,
-- 				'unit', i.unit,
-- 				'created_at', i.created_at,
-- 				'updated_at', i.updated_at,
-- 				'category_id', c.id,
-- 				'category_label', c.label,
-- 				'category_created_at', c.created_at,
-- 				'category_updated_at', c.updated_at
-- 			) 
-- 			ORDER BY i.created_at
-- 		)
-- 	FROM ingredient i 
-- 	JOIN recipe_has_ingredient_with_quantity riq ON ingredient_id = i.id
-- 	JOIN category c ON c.id = i.category_id
-- 	WHERE recipe_id = r.id
-- ) AS ingredient,
-- (
-- 	SELECT 
-- 		json_agg(s.* ORDER BY s.created_at) 
-- 	FROM step s 
-- 	WHERE s.recipe_id = r.id
-- ) AS step,
-- (
-- 	SELECT 
-- 		json_agg(t.* ORDER BY t.label ASC) 
-- 	FROM tag t 
-- 	JOIN recipe_has_tag rt ON tag_id = t.id
-- 	WHERE recipe_id = r.id
-- ) AS tag
-- FROM recipe r
-- JOIN recipe_has_ingredient_with_quantity riq ON riq.recipe_id = r.id
-- GROUP BY r.id
-- ORDER BY r.id ASC
-- WHERE r.id = recipe_id
-- $$ LANGUAGE SQL;