const debug = require("debug")("activeRecord");
const CoreModel = require("./CoreModel");
const ofrigo = require("../client/client-db-ofrigo");

class Account extends CoreModel{
    static tableName = 'account';
    last_name;
    first_name;
    email;
    #password;
    role;
    ingredient;
    message;
    created_at;
    updated_at;

    constructor(obj){
        super(obj);
        this.id = obj.id;
        this.last_name = obj.last_name;
        this.first_name = obj.first_name;
        this.email = obj.email;
        this.#password = obj.password;
        this.role = obj.role;
        this.ingredient = obj.ingredient;
        this.message = obj.message;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;

    };
    /**
     * Getter to get the privacy password
     */
    get password() {
        return this.#password;
    };

    /**
     * Get an account information in the database by his email
     * @param {string} email instance's email
     * @returns an instance
     */
    static async findByEmail(email) {
        const query = {
            text : `SELECT * FROM account WHERE email=$1`,
            values: [email]
        }
        
        const result = await ofrigo.query(query);

        return result.rows[0];
    };

    /**
     * Add an ingredient to the user stock
     * @param {int} ingredient_id 
     * @returns an instance
     */
    async addIngredient(ingredient_id){
        const query = {
            text: `INSERT INTO account_has_ingredient(account_id, ingredient_id) VALUES ($1, $2) RETURNING *;`,
            values: [this.id, ingredient_id]
        };
        let response;

        try{
            response = await ofrigo.query(query);
            return response.rows[0];
        }catch(error){
        }
    };
    
    /**
     * Delete an ingredient to the user stock
     * @param {int} ingredient_id 
     * @returns an instance
     */
    async removeIngredient(ingredient_id){
        const query = {
            text: `DELETE FROM "account_has_ingredient" WHERE "account_id"=$1 AND "ingredient_id"=$2;`,
            values: [this.id, ingredient_id]
        };
        let response;

        try {
            response = await ofrigo.query(query);
            debug(response)
        } catch (error) {
            console.log(error);
        }

        return response.rowCount;
    };

    /**
     * Remove an ingredient as admin
     * @param {int} account_id 
     * @param {int} ingredient_id 
     * @returns an instance
     */
    static async removeIngredientAdmin(account_id, ingredient_id){
        const query = {
            text: `DELETE FROM "account_has_ingredient" WHERE "account_id"=$1 AND "ingredient_id"=$2;`,
            values: [account_id, ingredient_id]
        };
        let response;

        try {
            response = await ofrigo.query(query);
            debug(response)
        } catch (error) {
            console.log(error);
        }

        return response.rowCount;
    };

    /**
     * Remove a message from as admin
     * @param {string} account_email 
     * @param {int} message_id 
     * @returns an instance
     */
    static async removeMessageAdmin(account_email, message_id){
        const query = {
            text: `DELETE FROM message
            WHERE message.email=$1
            AND message.id=$2;`,
            values: [account_email, message_id]
        };
        let response;

        try {
            response = await ofrigo.query(query);
            debug(response)
        } catch (error) {
            console.log(error);
        }

        return response.rowCount;
    };

};

module.exports = Account;