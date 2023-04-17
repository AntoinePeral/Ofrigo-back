--  Fonction création de convert des quantity
CREATE OR REPLACE FUNCTION convertQuantity(r_id int, i_id int) RETURNS TABLE (ingredient_quantity text)  AS $$
SELECT
	CASE
		WHEN riq.ingredient_quantity >0 AND  riq.ingredient_quantity <1000 AND i.unit='mg' THEN CONCAT(ROUND(riq.ingredient_quantity), ' ', 'mg')
		WHEN riq.ingredient_quantity >=1000 AND  riq.ingredient_quantity <1000000 AND i.unit='mg' THEN CONCAT(ROUND(riq.ingredient_quantity/1000), ' ','g')
		WHEN riq.ingredient_quantity >=1000000 AND i.unit='mg' THEN CONCAT(ROUND(riq.ingredient_quantity/1000000), ' ','kg')
		WHEN riq.ingredient_quantity >10 AND  riq.ingredient_quantity <1000 AND i.unit='ml' THEN CONCAT(ROUND(riq.ingredient_quantity/10), ' ','cl')
		WHEN riq.ingredient_quantity >=1000 AND i.unit='ml' THEN CONCAT(ROUND(riq.ingredient_quantity/1000), ' ','l')
		WHEN i.unit IS NULL THEN CONCAT(riq.ingredient_quantity)
		WHEN i.unit='mg' AND riq.ingredient_quantity IS NULL THEN NULL
		WHEN i.unit='paquet' AND riq.ingredient_quantity < 2 THEN CONCAT(riq.ingredient_quantity, ' ','paquet')
		WHEN i.unit='paquet' AND riq.ingredient_quantity > 1 THEN CONCAT(riq.ingredient_quantity, ' ','paquets')
		WHEN i.unit='pincée' AND riq.ingredient_quantity < 2 THEN CONCAT(riq.ingredient_quantity, ' ','pincée')
		WHEN i.unit='pincée' AND riq.ingredient_quantity > 1 THEN CONCAT(riq.ingredient_quantity, ' ','pincées')
		WHEN i.unit='boule' AND riq.ingredient_quantity < 2 THEN CONCAT(riq.ingredient_quantity, ' ','boule')
		WHEN i.unit='boule' AND riq.ingredient_quantity > 1 THEN CONCAT(riq.ingredient_quantity, ' ','boules')
		WHEN i.unit='gousse' AND riq.ingredient_quantity < 2 THEN CONCAT(riq.ingredient_quantity, ' ','gousse')
		WHEN i.unit='gousse' AND riq.ingredient_quantity > 1 THEN CONCAT(riq.ingredient_quantity, ' ','gousses')
		WHEN i.unit='c.à.s' THEN CONCAT(riq.ingredient_quantity, ' ','c.à.s')
		WHEN i.unit='feuille' AND riq.ingredient_quantity < 2 THEN CONCAT(riq.ingredient_quantity, ' ','feuille')
		WHEN i.unit='feuille' AND riq.ingredient_quantity > 1 THEN CONCAT(riq.ingredient_quantity, ' ','feuilles')
		WHEN i.unit='dose' AND riq.ingredient_quantity < 2 THEN CONCAT(riq.ingredient_quantity, ' ','dose')
		WHEN i.unit='dose' AND riq.ingredient_quantity > 1 THEN CONCAT(riq.ingredient_quantity, ' ','doses')
		WHEN i.unit='tranche' AND riq.ingredient_quantity < 2 THEN CONCAT(riq.ingredient_quantity, ' ','tranche')
		WHEN i.unit='tranche' AND riq.ingredient_quantity > 1 THEN CONCAT(riq.ingredient_quantity, ' ','tranches')
		WHEN i.unit='rouleau' AND riq.ingredient_quantity < 2 THEN CONCAT(riq.ingredient_quantity, ' ','rouleau')
		WHEN i.unit='rouleau' AND riq.ingredient_quantity > 1 THEN CONCAT(riq.ingredient_quantity, ' ','rouleaus')
		WHEN i.unit='coeur' AND riq.ingredient_quantity < 2 THEN CONCAT(riq.ingredient_quantity, ' ','coeur')
		WHEN i.unit='coeur' AND riq.ingredient_quantity > 1 THEN CONCAT(riq.ingredient_quantity, ' ','coeurs')
		WHEN i.unit='c.à.c' THEN CONCAT(riq.ingredient_quantity, ' ','c.à.c')
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
				'ingredient_quantity', (SELECT * FROM convertQuantity(r.id, i.id)),
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




-- Function pour récuprer 1 recette
CREATE OR REPLACE FUNCTION getOneRecipe (r_id int) 
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
				'ingredient_quantity', (SELECT * FROM convertQuantity(r.id, i.id)),
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
WHERE r.id = r_id
GROUP BY r.id
ORDER BY r.id ASC
$$ LANGUAGE SQL;