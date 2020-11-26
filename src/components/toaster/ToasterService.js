class ToasterService {
    _timeout = 3000

    constructor() {
        this._messages = []
    }

    get messages() {
        return this._messages
    }

    set messages(messages) {
        this._messages = messages
    }

    info(message) {
        this.toast(message, 'info')
    }

    success(message) {
        this.toast(message, 'success')
    }

    warning(message) {
        this.toast(message, 'warning')
    }

    error(message) {
        this.toast(message, 'error')
    }

    toast(message, level) {
        const id = new Date().toISOString() + Math.random().toString()
        this._messages.push({
            id: id,
            type: level,
            value: message
        })
        setTimeout(() => this.remove(id), this._timeout)
    }

    remove(id) {
        const index = this._messages.map(item => item.id).indexOf(id)
        ~index && this._messages.splice(index, 1)
    }
}

export default new ToasterService()
