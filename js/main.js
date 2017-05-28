import Robot from './robot';
import {debounce, partition} from './tools';
import {append_template} from './templates';

const $ = (sel, ctx) => (ctx || document).querySelector(sel);
const $$ = (sel, ctx) => (ctx || document).querySelectorAll(sel);

const by_category = _ => partition(Object.values(_), _ => _.category);

var output_bindings = [];
function bind_field(field, property, is_input) {
    if (is_input)
        field.addEventListener('change', () => {
            property.rating = field.value;
            recalculate();
        });
    else
        output_bindings.push({field, property});
}

const recalculate = debounce(function() {
    robot.recalculate();
    console.log('recalculating', robot);
    for (let {field, property} of output_bindings)
        if (typeof property === 'function')
            field.value = property();
        else
            field.value = property.rating;
}, 300);

var robot = new Robot(
    require('../data/attributes.yml'),
    require('../data/features.yml'));

for (let [category, attributes] of by_category(robot.attributes))
    append_template($('.attributes'), 'attributes', {category, attributes});

for (let [category, properties] of by_category(robot.derived_factors))
    append_template($('.derived'), 'derived', {category, properties});

// for (let [category, features] of by_category(robot.features))
//     append_template($('.features'), 'features', {category, features});

for (let button of $$('.rating .inc'))
    button.addEventListener('click', () => {
        var input = $('input', button.parentNode);
        ++input.value;
        input.dispatchEvent(new Event('change'));
    });

for (let button of $$('.rating .dec'))
    button.addEventListener('click', () => {
        var input = $('input', button.parentNode);
        --input.value;
        input.dispatchEvent(new Event('change'));
    });

bind_field($('input[name=points]'), () => robot.points, false);

for (let field of $$('.rating input'))
    bind_field(field, robot.all_properties[field.name], !field.readonly);
