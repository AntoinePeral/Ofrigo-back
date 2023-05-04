const debug = require("debug")("activeRecord");
const ofrigo = require("../client/client-db-ofrigo");

class CoreModel {
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
            query = `SELECT * FROM getAllAccount();`;
        }
        if(this.tableName == "category"){
            query = `SELECT * FROM getAllCategory();`;
        }
        if(this.tableName == "ingredient"){
            query = `SELECT * FROM getAllIngredient();`;
        }
        if(this.tableName == "message"){
            query = `SELECT * FROM getAllMessage();`;
        }
        if(this.tableName == "recipe"){
            query = `SELECT * FROM getAllRecipe();`;
        }
        if(this.tableName == "tag"){
            query = `SELECT * FROM getAllTag();`;
        }

        const result = [];
        let response;

        try {
            response = await ofrigo.query(query);
            // debug(response.rows);

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
        let query;

        if(this.tableName == "account"){
            query = {
                text: `SELECT * FROM getOneAccount($1);`,
                values: [id]
            }
        }
        if(this.tableName == "category"){
            query = {
                text: `SELECT * FROM getOneCategory($1);`,
                values: [id]
            }
        }
        if(this.tableName == "ingredient"){
            query = {
                text: `SELECT * FROM getOneIngredient($1);`,
                values: [id]
            }
        }
        if(this.tableName == "message"){
            query = {
                text: `SELECT * FROM getOneMessage($1);`,
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
                text: `SELECT * FROM getOneTag($1);`,
                values: [id]
            }
        }

        try {
            const response = await ofrigo.query(query);
            // debug(response.rows[0]);
            return new this(response.rows[0]);
            
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * General function that allows you to create
     * @param {object} privateFields 
     * @returns an instance
     */
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
                if(key !== "id" && key !== "created_at" && key !== "updated_at" && key!== "category" && key != "picture"){
                    fields.push(key);
                }
                if(value !== undefined){
                    if(value == ''){
                        value = null;
                        values.push(value);
                        parameters.push(`$${counter}`);
                        counter++;
                    }
                    else{
                        values.push(value);
                        parameters.push(`$${counter}`);
                        counter++;
                    }
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
        
        try {
            response = await ofrigo.query(query, values);
            debug(response);
        } catch (error) {
            console.log(error);
        }

        return response.rows[0];
    };

    /**
     * General function that allows you to update
     * @param {object} privateFields 
     * @returns an instance
     */
    async update (privateFields = null) {
        const fields = []; 
        const values = [];
        let counter = 1;
        //let date = new Date.now();

        if(this.constructor.tableName == "account"){
            Object.entries(this).forEach(([key,value])=>{
                if(key !== "id" && key !== "created_at" && key !== "updated_at" && key!== "ingredient" && key!== "message"){
                    fields.push(key + "=$" + counter);
                    values.push(value);
                    counter++;
                }
                if(key == "updated_at"){
                    fields.push(key + "=$" + counter);
                    value = 'now()';
                    values.push(value);
                    counter++;
                }
            });
            if(privateFields){
                Object.entries(privateFields).forEach(([key, value]) =>{
                    fields.push(key + "=$" + counter);
                    values.push(value);
                    counter++;
                });
            }
        }
        if(this.constructor.tableName == "category"){
            Object.entries(this).forEach(([key,value])=>{
                if(key !== "id" && key !== "created_at" && key !== "updated_at" && key!== "ingredient"){
                    fields.push(key + "=$" + counter);
                    values.push(value);
                    counter++;
                }
                if(key == "updated_at"){
                    fields.push(key + "=$" + counter);
                    value = 'now()';
                    values.push(value);
                    counter++;
                }
            });
        }
        if(this.constructor.tableName == "ingredient"){
            Object.entries(this).forEach(([key,value])=>{
                if(key !== "id" && key !== "created_at" && key !== "updated_at" && key!== "category" && key !== "unit"){
                    fields.push(key + "=$" + counter);
                    values.push(value);
                    counter++;
                }
                if(key == "updated_at"){
                    fields.push(key + "=$" + counter);
                    value = 'now()';
                    values.push(value);
                    counter++;
                }
                if(key == "unit"){
                    if(value == ''){
                        fields.push(key + "=$" + counter);
                        value = null;
                        values.push(value);
                        counter++;
                    }
                    else{
                        fields.push(key + "=$" + counter);
                        values.push(value);
                        counter++;
                    }
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
                if(key == "updated_at"){
                    fields.push(key + "=$" + counter);
                    value = 'now()';
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
                if(key == "updated_at"){
                    fields.push(key + "=$" + counter);
                    value = 'now()';
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
                if(key == "updated_at"){
                    fields.push(key + "=$" + counter);
                    value = 'now()';
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
     * General function that allows you to delete by id
     * @param {int} id 
     * @returns an instance
     */
    static async delete (id) {
        const query = {
            text: `DELETE FROM "${this.tableName}" WHERE "id"=$1;`,
            values: [id]
        };
        let response;

        try {
            response = await ofrigo.query(query);
            debug(response);
            return response.rowCount;
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Create an admin account
     * @param {object} privateFields 
     * @returns an instance
     */
    async addAdmin (privateFields = null){
        const fields = []; 
        const values = [];
        let counter = 1;
        const parameters = [];

        if(this.constructor.tableName == "account"){
            Object.entries(this).forEach(([key, value])=>{
                if(key !== "id" && key !== "created_at" && key !== "updated_at" && key!== "ingredient" && key!== "message"){
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

        const query = `INSERT INTO ${this.constructor.tableName} (${fields.join()}) VALUES (${parameters.join()}) RETURNING *`;
        let response;
        
        try {
            response = await ofrigo.query(query, values);
            // debug(response);
        } catch (error) {
            console.log(error);
        }

        return response.rows[0];
    };

    /**
     * Find tableName in DB
     * @returns an array of tableName
     */
    static async findTableName(){
        const query = `SELECT 
        TABLE_NAME
        FROM
        information_schema.tables
        WHERE TABLE_CATALOG='ofrigo'
        AND TABLE_SCHEMA='public'`;
        let response;
        
        try{
            response = await ofrigo.query(query);
            let tableName = [];
        
            for(const name of response.rows){
                if(name.table_name !== "account_has_ingredient" && name.table_name !== "recipe_has_tag" && name.table_name !== "step" && name.table_name !== "recipe_has_ingredient_with_quantity"){
                    tableName.push(name.table_name);
                }
            }
    
            return tableName;
        }catch(error){
            console.log(error);
        }
    };

    /**
     * Find unit measure in DB
     * @returns an array of object unit measure
     */
    static async findMeasure () {
        const query = `SELECT unnest(enum_range(NULL::measure)) AS label;`

        try{
            const response = await ofrigo.query(query);;
            return response.rows;
        }catch(error){
            console.log(error);
        }
    };

};

module.exports = CoreModel;