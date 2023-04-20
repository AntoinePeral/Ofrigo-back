const CoreModel = require("./CoreModel");
const ofrigo = require("../client/client-db-ofrigo");

class Account extends CoreModel{
    static tableName = 'account';
    last_name;
    first_name;
    email;
    #password;
    role;
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
    static async getByEmail(email) {
        const preparedQuery = {
            text : `SELECT * FROM account WHERE email = $1`,
            values: [email]
        }
        console.log(preparedQuery);
        const result = await ofrigo.query(preparedQuery);

        return result.rows[0];
    };
};

module.exports = Account;