const CoreModel = require("./CoreModel");

class Account extends CoreModel{
    static tableName = 'account';
    last_name;
    first_name;
    email;
    #password;
    #role;
    created_at;
    updated_at;

    constructor(obj){
        super(obj);
        this.id = obj.id;
        this.last_name = obj.last_name;
        this.first_name = obj.first_name;
        this.email = obj.email;
        this.#password = obj.password;
        this.#role = obj.role;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
    };

    get password() {
        return this.#password;
    };
};

module.exports = Account;