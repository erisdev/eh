export function partition(arr, func) {
    var obj = {};
    for (let entry of arr) {
        let key = func(entry);
        (key in obj ? obj[key] : obj[key] = []).push(entry);
    }
    return Object.entries(obj);
}

export function debounce(func, ms) {
    var timer;
    return function(...args) {
        if (timer)
            clearTimeout(timer);
        setTimeout(() => func.apply(this, args), ms);
    }
}