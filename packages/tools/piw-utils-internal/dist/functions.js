export const executeAction = (action) => {
    if (action && action.canExecute && !action.isExecuting) {
        action.execute();
    }
};
export const isAvailable = (property) => {
    return property && property.status === "available" /* Available */ && property.value;
};
export const parseStyle = (style = "") => {
    try {
        return style.split(";").reduce((styleObject, line) => {
            const pair = line.split(":");
            if (pair.length === 2) {
                const name = pair[0].trim().replace(/(-.)/g, match => match[1].toUpperCase());
                styleObject[name] = pair[1].trim();
            }
            return styleObject;
        }, {});
    }
    catch (_) {
        return {};
    }
};
export const debounce = (func, waitFor) => {
    let timeout = null;
    const debounced = (...args) => {
        if (timeout !== null) {
            clearTimeout(timeout);
            timeout = null;
        }
        timeout = setTimeout(() => func(...args), waitFor);
    };
    return debounced;
};
