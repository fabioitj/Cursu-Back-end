class Error {
    static error = [];

    static addError(error) {
        this.error.push(error);
    }

    static getErrors() {
        return this.error;
    }
}

export default Error;