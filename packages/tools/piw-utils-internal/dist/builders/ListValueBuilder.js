export function ListValueBuilder() {
    const listValue = {
        status: "available" /* Available */,
        offset: 0,
        limit: 1,
        items: [{ id: "1" }, { id: "2" }],
        totalCount: 2,
        hasMoreItems: false,
        setLimit: jest.fn(),
        setOffset: jest.fn(),
        requestTotalCount: jest.fn(),
        sortOrder: [],
        filter: undefined,
        setSortOrder: jest.fn(),
        setFilter: jest.fn()
    };
    return {
        withItems(items) {
            return Object.assign(Object.assign({}, listValue), { items, totalCount: items.length });
        },
        withAmountOfItems(amount) {
            const items = [];
            for (let i = 0; i < amount; i++) {
                items.push({ id: i.toString() });
            }
            return this.withItems(items);
        },
        isLoading() {
            return Object.assign(Object.assign({}, listValue), { status: "loading" /* Loading */ });
        },
        isUnavailable() {
            return Object.assign(Object.assign({}, listValue), { status: "unavailable" /* Unavailable */ });
        },
        simple() {
            return listValue;
        }
    };
}
