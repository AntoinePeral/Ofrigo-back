--  Create function in DB to convert quantities according to the levels reached by the units of measure
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

-- Function to get all recipes and return their label, picture, rate, difficulté, time, ingredients, tags and steps. All is ordered and grouped by the recipe.id 
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
r.label,
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
				'picture', i.picture,
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
	JOIN recipe_has_ingredient_with_quantity riq 
	ON riq.ingredient_id = i.id
	JOIN category c 
	ON c.id = i.category_id
	WHERE recipe_id = r.id
) AS ingredient,
(
	SELECT
		json_agg(
			json_build_object(
				'id', s.id,
				'content', CONCAT(s.number, '.', s.content),
				'recipe_id', s.id,
				'created_at', s.created_at,
				'updated_at', s.updated_at
			) ORDER BY s.number
		)
	FROM step s
	WHERE s.recipe_id = r.id
) AS step,
(
	SELECT
		json_agg(t.* ORDER BY t.label ASC)
	FROM tag t
	JOIN recipe_has_tag rt 
	ON rt.tag_id = t.id
	WHERE rt.recipe_id = r.id
) AS tag
FROM recipe r
GROUP BY r.id
ORDER BY r.id ASC
$$ LANGUAGE SQL;

-- Function to get on recipe by his id and return his label, picture, rate, difficulté, time, ingredients, tags and steps.
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
r.label,
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
				'picture', i.picture,
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
	JOIN recipe_has_ingredient_with_quantity riq 
	ON riq.ingredient_id = i.id
	JOIN category c 
	ON c.id = i.category_id
	WHERE recipe_id = r.id
) AS ingredient,
(
	SELECT
		json_agg(
			json_build_object(
				'id', s.id,
				'content', CONCAT(s.number, '.', s.content),
				'recipe_id', s.id,
				'created_at', s.created_at,
				'updated_at', s.updated_at
			) ORDER BY s.number
		)
	FROM step s
	WHERE s.recipe_id = r.id
) AS step,
(
	SELECT
		json_agg(t.* ORDER BY t.label ASC)
	FROM tag t
	JOIN recipe_has_tag rt 
	ON rt.tag_id = t.id
	WHERE rt.recipe_id = r.id
) AS tag
FROM recipe r
WHERE r.id = r_id
GROUP BY r.id
ORDER BY r.id ASC
$$ LANGUAGE SQL;

-- Function to get all account and return their last_name, first_name, email, password, role, ingredients and message. All is ordered and grouped by the account.id
CREATE OR REPLACE FUNCTION getAllAccount ()
  RETURNS TABLE (
	id int,
    last_name lenghtName_validator,
    first_name lenghtName_validator,
    email email_validator,
    password text,
    role rank,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    ingredient json,
    message json ) AS $$
SELECT 
acc.*,
(
	SELECT
		json_agg(
			json_build_object(
				'id', i.id,
				'label', i.label,
				'picture', i.picture,
				'unit', i.unit,
				'category_id', i.category_id,
				'created_at', i.created_at,
				'updated_at', i.updated_at,
				'category_label', c.label
			) ORDER BY i.label
		) 
	FROM ingredient i
	JOIN category c
	ON i.category_id=c.id
	JOIN account_has_ingredient ai
	ON ai.ingredient_id = i.id
	WHERE ai.account_id=acc.id
) AS ingredient,
(
	SELECT
		json_agg(m.* ORDER BY m.id DESC) 
	FROM message m
	WHERE m.email=acc.email
) AS message
FROM account acc
GROUP BY acc.id;
$$ LANGUAGE SQL;

-- Function to get on account by his id and return his last_name, first_name, email, password, role, ingredients and message.
CREATE OR REPLACE FUNCTION getOneAccount (acc_id int)
  RETURNS TABLE (
	id int,
    last_name lenghtName_validator,
    first_name lenghtName_validator,
    email email_validator,
    password text,
    role rank,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    ingredient json,
    message json ) AS $$
SELECT 
acc.*,
(
	SELECT
		json_agg(
			json_build_object(
				'id', i.id,
				'label', i.label,
				'picture', i.picture,
				'unit', i.unit,
				'category_id', i.category_id,
				'created_at', i.created_at,
				'updated_at', i.updated_at,
				'category_label', c.label
			) ORDER BY i.label
		) 
	FROM ingredient i
	JOIN category c
	ON i.category_id=c.id
	JOIN account_has_ingredient ai
	ON ai.ingredient_id = i.id
	WHERE ai.account_id=acc.id
) AS ingredient,
(
	SELECT
		json_agg(m.* ORDER BY m.id DESC) 
	FROM message m
	WHERE m.email=acc.email
) AS message
FROM account acc
WHERE acc.id=acc_id
GROUP BY acc.id;
$$ LANGUAGE SQL;

-- Function to get all category and return their label and ingredient. All is ordered and grouped by the category.id
CREATE OR REPLACE FUNCTION getAllCategory ()
  RETURNS TABLE (
	id int,
    label little_title_validator,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    ingredient json ) AS $$
SELECT *,
	(
		SELECT
			json_agg(i.*)
		FROM ingredient i
		WHERE i.category_id=c.id
	) AS ingredient
	FROM category c
$$ LANGUAGE SQL;

-- Function to get on category by his id and return his label and ingredients.
CREATE OR REPLACE FUNCTION getOneCategory (c_id int)
   RETURNS TABLE (
	id int,
    label little_title_validator,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    ingredient json ) AS $$
SELECT *,
(
	SELECT
		json_agg(i.*)
	FROM ingredient i
	WHERE i.category_id=c.id
) AS ingredient
FROM category c
WHERE c.id=c_id
$$ LANGUAGE SQL;

-- Function to get all ingredient and return their label, unit, category_id and category. All is ordered and grouped by the ingredient.id
CREATE OR REPLACE FUNCTION getAllIngredient ()
  RETURNS TABLE (
	id int,
    label little_title_validator,
	picture text,
	unit measure,
	category_id int,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    category json ) AS $$
SELECT *,
(
	SELECT
		json_agg(c.*)
	FROM category c
	WHERE i.category_id=c.id
) AS category
FROM ingredient i
$$ LANGUAGE SQL;

-- Function to get on ingredient by his id and return his label, unit, category_id and category.
CREATE OR REPLACE FUNCTION getOneIngredient (i_id int)
  RETURNS TABLE (
	id int,
    label little_title_validator,
	picture text,
	unit measure,
	category_id int,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    category json ) AS $$
SELECT *,
(
	SELECT
		json_agg(c.*)
	FROM category c
	WHERE i.category_id=c.id
) AS category
FROM ingredient i
WHERE i.id=i_id
$$ LANGUAGE SQL;

-- Function to get all message and return their label, content, email and account. All is ordered and grouped by the message.id
CREATE OR REPLACE FUNCTION getAllMessage ()
  RETURNS TABLE (
	id int,
    label title_validator,
	content content_validator,
	email email_validator,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    account json ) AS $$
SELECT *,
(
	SELECT
		json_agg(
			json_build_object(
				'id', acc.id,
				'last_name', acc.last_name,
				'first_name', acc.first_name,
				'email', acc.email,
				'role', acc.role,
				'created_at', acc.created_at,
				'updated_at', acc.updated_at
			)
		)
	FROM account acc
	WHERE m.email=acc.email
) AS account
FROM message m
ORDER BY m.id DESC
$$ LANGUAGE SQL;

-- Function to get on message by his id and return his label, content, email and account.
CREATE OR REPLACE FUNCTION getOneMessage (m_id int)
  RETURNS TABLE (
	id int,
    label title_validator,
	content content_validator,
	email email_validator,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    account json ) AS $$
SELECT *,
(
	SELECT
		json_agg(
			json_build_object(
				'id', acc.id,
				'last_name', acc.last_name,
				'first_name', acc.first_name,
				'email', acc.email,
				'role', acc.role,
				'created_at', acc.created_at,
				'updated_at', acc.updated_at
			)
		)
	FROM account acc
	WHERE m.email=acc.email
) AS account
FROM message m
WHERE m.id=m_id
ORDER BY m.id DESC
$$ LANGUAGE SQL;

-- Function to get all tag and return their label and recipe. All is ordered and grouped by the tag.id
CREATE OR REPLACE FUNCTION getAllTag ()
  RETURNS TABLE (
	id int,
    label little_title_validator,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    recipe json ) AS $$
SELECT *,
(
	SELECT
		json_agg(r.*)
	FROM recipe r
	JOIN recipe_has_tag rt
	ON rt.recipe_id=r.id
	WHERE rt.tag_id=t.id
) AS recipe
FROM tag t
$$ LANGUAGE SQL;

-- Function to get on tag by his id and return his label and recipe.
CREATE OR REPLACE FUNCTION getOneTag (t_id int)
  RETURNS TABLE (
	id int,
    label little_title_validator,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    recipe json ) AS $$
SELECT *,
(
	SELECT
		json_agg(r.*)
	FROM recipe r
	JOIN recipe_has_tag rt
	ON rt.recipe_id=r.id
	WHERE rt.tag_id=t.id
) AS recipe
FROM tag t
WHERE t.id=t_id
$$ LANGUAGE SQL;