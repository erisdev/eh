import Attribute from './attribute';
import Feature from './feature';

const attribute_factory = _ => new Attribute(_);
const feature_factory = _ => new Feature(_);

export default class Robot {
    constructor(attributes, features) {
        this.max_points = 100;
        this.points = 100;

        this.attributes = {};
        this.features = {};
        this.derived_factors = {};
        this.all_properties = {};

        for (let attribute of attributes.map(attribute_factory)) {
            this.all_properties[attribute.short_name] = attribute;
            this.attributes[attribute.short_name] = attribute;
        }

        for (let feature of features.map(feature_factory)) {
            this.all_properties[feature.short_name] = feature;
            this.features[feature.short_name] = feature;
        }
    }

    recalculate() {
        this.points = this.max_points;

        for (let prop of Object.values(this.all_properties))
            this.points += prop.cost;

        // for (let prop of this.derived_factors)
        //     prop.calculate(this);
    }
}