class UserService {
    constructor () {
        this._login = ''
        this._functions = []
    }

    get login () {
        return this._login
    }

    set login (login) {
        this._login = login
    }

    get functions () {
        return this._functions
    }

    set functions (functions) {
        this._functions = functions
    }

    hasFunction(func) {
        return this._functions.includes(func)
    }
}

export default new UserService()
