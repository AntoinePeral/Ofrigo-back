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
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;

    };

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
        console.log(result);

        return result.rows[0];
    };

        /**
     * Returns all data from a table
     * @returns Return array
     */
    static async findAllAccount () {
        const query = `SELECT * FROM "${this.tableName}"
        JOIN account_has_ingredient ai
        ON ai.account_id = acc.id
        JOIN ingredient i
        ON i.id = ai.ingredient_id;`;
        
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
    static async findOneAccount (id) {
        const query = `SELECT * FROM ${this.tableName} WHERE id=${id};`;

        try {
            const response = await ofrigo.query(query);
            debug(response.rows[0]);

            return new this(response.rows[0]);
        } catch (error) {
            console.log(error);
        }
    };

};

module.exports = Account;