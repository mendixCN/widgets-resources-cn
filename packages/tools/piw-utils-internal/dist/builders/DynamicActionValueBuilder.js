export function dynamicValue(value, loading) {
    if (loading) {
        return { status: "loading" /* Loading */, value };
    }
    return value ? { status: "available" /* Available */, value } : { status: "unavailable" /* Unavailable */, value: undefined };
}
export function actionValue(canExecute = true, isExecuting = false) {
    return { canExecute, isExecuting, execute: jest.fn() };
}
