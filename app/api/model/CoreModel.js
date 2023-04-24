const debug = require("debug")("activeRecord");
const ofrigo = require("../client/client-db-ofrigo");

class CoreModel{
    id;

    constructor (obj) {
        if (obj.id) {
            this.id = obj.id;
        }
    }

    /**
     * Returns all data from a table
     * @returns Return array
     */
    static async findAll () {
        let query
        if(this.tableName == "account"){
            query = `SELECT 
            acc.*,
            (
                SELECT
                    json_agg(
                        json_build_object(
                            'label', i.label,
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
                    json_agg(m.* ORDER BY m.created_at) 
                FROM message m
                WHERE m.email=acc.email
            ) AS message
            FROM account acc
            GROUP BY acc.id;`;
        }
        if(this.tableName == "category"){
            query = `SELECT *,
            (
                SELECT
                    json_agg(i.*)
                FROM ingredient i
                WHERE i.category_id=c.id
            ) AS ingredient
            FROM category c`;
        }
        if(this.tableName == "ingredient"){
            query = `SELECT *,
            (
                SELECT
                    json_agg(c.*)
                FROM category c
                WHERE i.category_id=c.id
            ) AS category
            FROM ingredient i`;
        }
        if(this.tableName == "message"){
            query = `SELECT *,
            (
                SELECT
                    json_agg(
                        json_build_object(
                            'id', acc.id,
                            'last_name', acc.last_name,
                            'first_name', acc.first_name,
                            'email', acc.email,
                            'created_at', acc.created_at,
                            'updated_at', acc.updated_at
                        )
                    )
                FROM account acc
                WHERE m.email=acc.email
            ) AS account
            FROM message m`;
        }
        if(this.tableName == "recipe"){
            query = `SELECT * FROM getAllRecipe()`;
        }
        if(this.tableName == "tag"){
            query = `SELECT *,
            (
                SELECT
                    json_agg(r.*)
                FROM recipe r
                JOIN recipe_has_tag rt
                ON rt.recipe_id=r.id
                WHERE rt.tag_id=t.id
            ) AS recipe
            FROM tag t`;
        }

        const result = [];
        let response;

        try {
            response = await ofrigo.query(query);
            debug(response.rows);

            for (const row of response.rows) {
                result.push(new this(row));
            }
        } catch (error) {
            console.log(error);
        }

        return result;
    };

    /**
     * Returns one data from a table
     * @param {int} id data id
     * @returns Return object
     */
    static async findOne (id) {
        let query
        if(this.tableName == "account"){
            query = {
                text: `SELECT 
                acc.*,
                (
                    SELECT
                        json_agg(
                            json_build_object(
                                'label', i.label,
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
                        json_agg(m.* ORDER BY m.created_at) 
                    FROM message m
                    WHERE m.email=acc.email
                ) AS message
                FROM account acc
                WHERE acc.id=$1
                GROUP BY acc.id;`,
                values: [id]
            }
        }
        if(this.tableName == "category"){
            query = {
                text: `SELECT *,
                (
                    SELECT
                        json_agg(i.*)
                    FROM ingredient i
                    WHERE i.category_id=c.id
                ) AS ingredient
                FROM category c
                WHERE c.id=$1`,
                values: [id]
            }
        }
        if(this.tableName == "ingredient"){
            query = {
                text: `SELECT *,
                (
                    SELECT
                        json_agg(c.*)
                    FROM category c
                    WHERE i.category_id=c.id
                ) AS category
                FROM ingredient i
                WHERE i.id=$1`,
                values: [id]
            }
        }
        if(this.tableName == "message"){
            query = {
                text: `SELECT *,
                (
                    SELECT
                        json_agg(
                            json_build_object(
                                'id', acc.id,
                                'last_name', acc.last_name,
                                'first_name', acc.first_name,
                                'email', acc.email,
                                'created_at', acc.created_at,
                                'updated_at', acc.updated_at
                            )
                        )
                    FROM account acc
                    WHERE m.email=acc.email
                ) AS account
                FROM message m
                WHERE m.id=$1`,
                values: [id]
            }
        }
        if(this.tableName == "recipe"){
            query = {
                text: `SELECT * FROM getOneRecipe($1)`,
                values: [id]
            }
        }
        if(this.tableName == "tag"){
            query = {
                text: `SELECT *,
                (
                    SELECT
                        json_agg(r.*)
                    FROM recipe r
                    JOIN recipe_has_tag rt
                    ON rt.recipe_id=r.id
                    WHERE rt.tag_id=t.id
                ) AS recipe
                FROM tag t
                WHERE t.id=$1`,
                values: [id]
            }
        }

        try {
            const response = await ofrigo.query(query);
            debug(response.rows[0]);

            return new this(response.rows[0]);
        } catch (error) {
            console.log(error);
        }
    };

    async add (privateFields = null) {
        const fields = []; 
        const values = [];
        let counter = 1;
        const parameters = [];

        if(this.constructor.tableName == "account"){
            Object.entries(this).forEach(([key, value])=>{
                if(key !== "id" && key !== "created_at" && key !== "updated_at" && key!== "role" && key!== "ingredient" && key!== "message"){
                    fields.push(key);
                }
                if(value !== undefined){
                    values.push(value);
                    parameters.push(`$${counter}`);
                    counter++;
                }
            });
    
            if(privateFields){
                Object.entries(privateFields).forEach(([key, value]) =>{
                    fields.push(key);
                    values.push(value);
                    parameters.push(`$${counter}`);
                    counter++;
                });
            }
        }
        if(this.constructor.tableName == "category"){
            Object.entries(this).forEach(([key, value])=>{
                if(key !== "id" && key !== "created_at" && key !== "updated_at" && key!== "ingredient"){
                    fields.push(key);
                }
                if(value !== undefined){
                    values.push(value);
                    parameters.push(`$${counter}`);
                    counter++;
                }
            });
        }
        if(this.constructor.tableName == "ingredient"){
            Object.entries(this).forEach(([key, value])=>{
                if(key !== "id" && key !== "created_at" && key !== "updated_at" && key!== "category"){
                    fields.push(key);
                }
                if(value !== undefined){
                    values.push(value);
                    parameters.push(`$${counter}`);
                    counter++;
                }
            });
        }
        if(this.constructor.tableName == "message"){
            Object.entries(this).forEach(([key, value])=>{
                if(key !== "id" && key !== "created_at" && key !== "updated_at" && key!== "account"){
                    fields.push(key);
                }
                if(value !== undefined){
                    values.push(value);
                    parameters.push(`$${counter}`);
                    counter++;
                }
            });
        }
        if(this.constructor.tableName == "recipe"){
            Object.entries(this).forEach(([key, value])=>{
                if(key !== "id" && key !== "created_at" && key !== "updated_at" && key!== "ingredient" && key!== "step" && key!== "tag"){
                    fields.push(key);
                }
                if(value !== undefined){
                    values.push(value);
                    parameters.push(`$${counter}`);
                    counter++;
                }
            });
        }
        if(this.constructor.tableName == "tag"){
            Object.entries(this).forEach(([key, value])=>{
                if(key !== "id" && key !== "created_at" && key !== "updated_at" && key!== "recipe"){
                    fields.push(key);
                }
                if(value !== undefined){
                    values.push(value);
                    parameters.push(`$${counter}`);
                    counter++;
                }
            });
        }

        const query = `INSERT INTO ${this.constructor.tableName} (${fields.join()}) VALUES (${parameters.join()}) RETURNING *`;
        let response;
        console.log(query);
        console.log(values);
        
        try {
            response = await ofrigo.query(query, values);
            debug(response);
        } catch (error) {
            console.log(error);
        }

        return response.rows[0];
    };

    /**
     * Update in database
     * @param {Object} body 
     */
    async update () {
        const fields = []; 
        const values = [];
        let counter = 1;

        if(this.constructor.tableName == "account"){
            Object.entries(this).forEach(([key,value])=>{
                if(key !== "id" && key !== "created_at" && key !== "updated_at" && key!== "role" && key!== "ingredient" && key!== "message"){
                    fields.push(key + "=$" + counter);
                    values.push(value);
                    counter++;
                }
            });
        }
        if(this.constructor.tableName == "category"){
            Object.entries(this).forEach(([key,value])=>{
                if(key !== "id" && key !== "created_at" && key !== "updated_at" && key!== "ingredient"){
                    fields.push(key + "=$" + counter);
                    values.push(value);
                    counter++;
                }
            });
        }
        if(this.constructor.tableName == "ingredient"){
            Object.entries(this).forEach(([key,value])=>{
                if(key !== "id" && key !== "created_at" && key !== "updated_at" && key!== "category"){
                    fields.push(key + "=$" + counter);
                    values.push(value);
                    counter++;
                }
            });
        }
        if(this.constructor.tableName == "message"){
            Object.entries(this).forEach(([key,value])=>{
                if(key !== "id" && key !== "created_at" && key !== "updated_at" && key!== "account"){
                    fields.push(key + "=$" + counter);
                    values.push(value);
                    counter++;
                }
            });
        }
        if(this.constructor.tableName == "recipe"){
            Object.entries(this).forEach(([key,value])=>{
                if(key !== "id" && key !== "created_at" && key !== "updated_at" && key!== "ingredient" && key!== "step" && key!== "tag"){
                    fields.push(key + "=$" + counter);
                    values.push(value);
                    counter++;
                }
            });
        }
        if(this.constructor.tableName == "tag"){
            Object.entries(this).forEach(([key,value])=>{
                if(key !== "id" && key !== "created_at" && key !== "updated_at" && key!== "recipe"){
                    fields.push(key + "=$" + counter);
                    values.push(value);
                    counter++;
                }
            });
        }

        const query = `UPDATE ${this.constructor.tableName} SET ${fields.join()} WHERE id='${this.id}' RETURNING *;`;

        const response = await ofrigo.query(query, values);
        return response.rows[0];
    };

    /**
     * Delete in database
     * @param {int} id 
     * @returns 
     */
    static async delete (id) {
        const query = {
            text: `DELETE FROM "${this.tableName}" WHERE "id"=$1;`,
            values: [id]
        };
        let response;

        try {
            response = await ofrigo.query(query);
            debug(response)
        } catch (error) {
            console.log("Erreur");
        }

        return response.rowCount;
    };
};

module.exports = CoreModel;