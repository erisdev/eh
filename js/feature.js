import BaseProperty from './base_property';

function compile_expr(expr) {
    // FIXME this function is really bad
    return function(robot) {
        var var_names = [];
        var var_values = [];

        function def(k, v) {
            var_names.push(k);
            var_names.push(v);
        }

        def('min', Math.min);
        def('max', Math.max);

        for (let prop of Object.values(robot.all_properties))
            def(prop.short_name, prop.rating);

        return new Function(var_names, `return ${expr}`).apply(this, var_values);
    }
}

export default class Feature extends BaseProperty {
    constructor(def) {
        super(def);

        var {cost, max, requires, conflicts} = def;
        this.cost_per_rating = cost;
        this.requires = requires || [];
        this.conflicts = conflicts || [];

        if (max == null)
            this._max_rating = 1;
        if (max === '*')
            this._max_rating = Infinity;
        else if (typeof max === 'string')
            this.max_rating = compile_expr(max);
        else
            this._max_rating = max;
    }

    get cost() {
        return this.cost_per_rating * this.rating;
    }

    max_rating(robot) {
        return this._max_rating;
    }
}
