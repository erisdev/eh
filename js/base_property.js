export default class BaseProperty {
    constructor({name, category, short, desc}) {
        this._name = name;
        this._category = category;
        this._short_name = short || name.replace(/\s+/g, '');
        this._description = desc ? desc.trim() : '';
        this.rating = 0;
    }

    get name() { return this._name }
    get category() { return this._category }
    get short_name() { return this._short_name }
    get description() { return this._description }
}
