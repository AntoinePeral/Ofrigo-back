class APIError extends Error {
  constructor(message,code, test){
      super(message); // new Error(message) - super permet d'appeler le constructeur du parent
      this.code = code;
      this.test = test;
  }
};

module.exports = APIError;