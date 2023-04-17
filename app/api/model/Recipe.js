const debug = require("debug")("activeRecord");
const ofrigo = require("../client/client-db-ofrigo");
const CoreModel = require("./CoreModel");

class Recipe extends CoreModel{
    static tableName = 'recipe';
    label;
    picture;
    rate;
    difficulty;
    time;
    ingredient;
    step;
    tag;
    created_at;
    updated_at;

    constructor(obj){
        super(obj);
        this.label = obj.label;
        this.picture = obj.picture;
        this.rate = obj.rate;
        this.difficulty = obj.difficulty;
        this.time = obj.time;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
        this.ingredient = obj.ingredient;
        this.step = obj.step;
        this.tag = obj.tag;
    };

    static async findAllRecipeWithAll () {
        const query = `SELECT
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
        ORDER BY r.id ASC;`;

        const result = [];

        try {
            const recipes = await ofrigo.query(query);
            debug(recipes.rows);

            for (const recipe of recipes.rows) {
                result.push(new this(recipe)); 
            }
        } catch (error) {
            console.log(error);
        }

        return result;
    };

    static async findOneRecipeWithAll (id) {
        const query = `SELECT
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
        WHERE r.id=${id}
        GROUP BY r.id
        ORDER BY r.id ASC;`;

        try {
            const recipe = await ofrigo.query(query);
            debug(recipe.rows[0]);

            return new this(recipe.rows[0]);
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = Recipe;