import handlebars from 'handlebars/runtime';

handlebars.registerHelper('paragraphs', text => {
    var paras = [];
    for (let para of text.split('\n\n'))
        paras.push('<p>' + para + '</p>');

    return new handlebars.SafeString(paras.join('\n'));
});

const templates = {
    attributes: require('./attributes.html'),
    features: require('./features.html'),
};

function create_fragment(node, html) {
    var range = document.createRange();
    if (node) range.selectNode(node);
    return range.createContextualFragment(html);
}

export default function fill_template(name, data) {
    return templates[name](data);
}

export function append_template(node, name, data) {
    var html = fill_template(name, data)
    node.appendChild(create_fragment(node, html));
}