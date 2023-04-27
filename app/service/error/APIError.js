/**
 * Create a new error class, consisting of a custom message and an error code
 */
class APIError extends Error {
  constructor(message,code){
      super(message); // new Error(message) - super permet d'appeler le constructeur du parent
      this.code = code;
  }
};

module.exports = APIError;