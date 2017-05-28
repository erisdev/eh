import BaseProperty from './base_property'

const cost = x => x > 0 ? x + cost(x - 1) : 0;

export default class Attribute extends BaseProperty {
    constructor(def) {
        super(def);
    }

    get cost() {
        return -cost(+this.rating);
    }
}
