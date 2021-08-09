export function hidePropertyIn(propertyGroups, _value, key, nestedPropIndex, nestedPropKey) {
    modifyProperty((_, index, container) => container.splice(index, 1), propertyGroups, key, nestedPropIndex, nestedPropKey);
}
export function hidePropertiesIn(propertyGroups, _value, keys) {
    keys.forEach(key => modifyProperty((_, index, container) => container.splice(index, 1), propertyGroups, key, undefined, undefined));
}
export function hideNestedPropertiesIn(propertyGroups, _value, key, nestedPropIndex, nestedPropKeys) {
    nestedPropKeys.forEach(nestedKey => hidePropertyIn(propertyGroups, _value, key, nestedPropIndex, nestedKey));
}
export function changePropertyIn(propertyGroups, _value, modify, key, nestedPropIndex, nestedPropKey) {
    modifyProperty(modify, propertyGroups, key, nestedPropIndex, nestedPropKey);
}
export function transformGroupsIntoTabs(properties) {
    const groups = [];
    properties.forEach(property => {
        if (property.propertyGroups) {
            groups.push(...property.propertyGroups);
            property.propertyGroups = [];
        }
    });
    properties.push(...groups);
}
function modifyProperty(modify, propertyGroups, key, nestedPropIndex, nestedPropKey) {
    propertyGroups.forEach(propGroup => {
        var _a;
        if (propGroup.propertyGroups) {
            modifyProperty(modify, propGroup.propertyGroups, key, nestedPropIndex, nestedPropKey);
        }
        (_a = propGroup.properties) === null || _a === void 0 ? void 0 : _a.forEach((prop, index, array) => {
            if (prop.key === key) {
                if (nestedPropIndex === undefined || nestedPropKey === undefined) {
                    modify(prop, index, array);
                }
                else if (prop.objects) {
                    modifyProperty(modify, prop.objects[nestedPropIndex].properties, nestedPropKey);
                }
                else if (prop.properties) {
                    modifyProperty(modify, prop.properties[nestedPropIndex], nestedPropKey);
                }
            }
        });
    });
}
export function moveProperty(fromIndex, toIndex, properties) {
    if (fromIndex >= 0 && toIndex >= 0 && fromIndex < properties.length && toIndex < properties.length) {
        const elementToMove = properties[fromIndex];
        const isMoveForward = toIndex - fromIndex >= 0;
        const maxIndexStep = isMoveForward ? toIndex - fromIndex : fromIndex - toIndex;
        const getNextIndex = (currentIndex) => currentIndex + (isMoveForward ? +1 : -1);
        const getCurrentIndex = (indexStep) => fromIndex + (isMoveForward ? +indexStep : -indexStep);
        for (let indexStep = 0; indexStep <= maxIndexStep; indexStep++) {
            const currentIndex = getCurrentIndex(indexStep);
            const newElement = currentIndex === toIndex ? elementToMove : properties[getNextIndex(currentIndex)];
            properties[currentIndex] = newElement;
        }
    }
}
