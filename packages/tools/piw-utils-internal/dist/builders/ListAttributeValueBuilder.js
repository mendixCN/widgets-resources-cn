export class ListAttributeValueBuilder {
    constructor() {
        this.listAttribute = {
            id: "",
            get: jest.fn(),
            sortable: true,
            filterable: true,
            type: "String",
            formatter: {
                format: jest.fn((value) => value.toString()),
                parse: jest.fn()
            },
            universe: undefined
        };
    }
    withId(id) {
        this.listAttribute.id = id;
        return this;
    }
    withSortable(sortable) {
        this.listAttribute.sortable = sortable;
        return this;
    }
    withFilterable(filterable) {
        this.listAttribute.filterable = filterable;
        return this;
    }
    withType(type) {
        this.listAttribute.type = type;
        return this;
    }
    withFormatter(format, parse) {
        this.listAttribute.formatter = {
            format,
            parse
        };
        return this;
    }
    withUniverse(universe) {
        this.listAttribute.universe = universe;
        return this;
    }
    build() {
        return this.listAttribute;
    }
}
