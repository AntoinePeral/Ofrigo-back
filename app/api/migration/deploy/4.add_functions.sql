--  Fonction création de convert des quantity
CREATE OR REPLACE FUNCTION convertQuantity(r_id int, i_id int) RETURNS TABLE (ingredient_quantity text)  AS $$
SELECT
	CASE
		WHEN riq.ingredient_quantity IS NULL AND i.unit IS NOT NULL THEN LOWER(i.label)
		WHEN riq.ingredient_quantity >0 AND  riq.ingredient_quantity <1000 AND i.unit='mg' THEN CONCAT(ROUND(riq.ingredient_quantity), ' ', 'mg', ' de ', LOWER(i.label))
		WHEN riq.ingredient_quantity >10 AND  riq.ingredient_quantity <1000 AND i.unit='ml' THEN CONCAT(ROUND(riq.ingredient_quantity/10), ' ','cl', ' de ', LOWER(i.label))
		WHEN riq.ingredient_quantity >=1000 AND  riq.ingredient_quantity <1000000 AND i.unit='mg' THEN CONCAT(ROUND(riq.ingredient_quantity/1000), ' ','g', ' de ', LOWER(i.label))
		WHEN riq.ingredient_quantity >=1000 AND i.unit='ml' THEN CONCAT(ROUND(riq.ingredient_quantity/1000), ' ','l', ' de ', LOWER(i.label))
		WHEN riq.ingredient_quantity >=1000000 AND i.unit='mg' THEN CONCAT(ROUND(riq.ingredient_quantity/1000000), ' ','kg', ' de ', LOWER(i.label))
		WHEN riq.ingredient_quantity IS NOT NULL AND i.unit IS NULL AND riq.ingredient_quantity < 2 THEN CONCAT(riq.ingredient_quantity, ' ', LOWER(i.label))
		WHEN riq.ingredient_quantity IS NOT NULL AND i.unit IS NULL AND riq.ingredient_quantity > 1 THEN CONCAT(riq.ingredient_quantity, ' ', LOWER(i.label), 's')
		WHEN riq.ingredient_quantity IS NOT NULL AND i.unit IS NOT NULL AND riq.ingredient_quantity < 2 THEN CONCAT(riq.ingredient_quantity, ' ', i.unit, ' de ', LOWER(i.label))
		WHEN riq.ingredient_quantity IS NOT NULL AND i.unit IS NOT NULL AND riq.ingredient_quantity > 1 AND riq.ingredient_quantity < 10 THEN CONCAT(riq.ingredient_quantity, ' ', i.unit, 's', ' de ', LOWER(i.label))
	END AS ingredient_quantity
FROM ingredient i
JOIN recipe_has_ingredient_with_quantity riq
ON riq.ingredient_id = i.id
JOIN recipe r
ON riq.recipe_id= r.id
WHERE riq.recipe_id=r_id
AND riq.ingredient_id=i_id
$$ LANGUAGE SQL;

-- Fonction Pour récupérer toutes les recettes
CREATE OR REPLACE FUNCTION getAllRecipe ()
  RETURNS TABLE (
    id int,
    label text,
    picture text,
    rate rate_validator,
    difficulty text,
    "time" text,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
    ingredient json,
	step json,
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
				'quantity', (SELECT * FROM convertQuantity(r.id, i.id)),
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




-- Function pour récuprer 1 recette
CREATE OR REPLACE FUNCTION getOneRecipe (r_id int)
  RETURNS TABLE (
    id int,
    label text,
    picture text,
    rate rate_validator,
    difficulty text,
    "time" text,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
    ingredient json,
	step json,
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
				'quantity', (SELECT * FROM convertQuantity(r.id, i.id)),
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
WHERE r.id = r_id
GROUP BY r.id
ORDER BY r.id ASC
$$ LANGUAGE SQL;