export var FormatterType;
(function (FormatterType) {
    FormatterType["Number"] = "number";
    FormatterType["DateTime"] = "datetime";
})(FormatterType || (FormatterType = {}));
export class EditableValueBuilder {
    constructor() {
        this.editableValue = {
            value: undefined,
            displayValue: "",
            status: "available" /* Available */,
            validation: undefined,
            readOnly: false,
            formatter: {
                format: jest.fn(name => `Formatted ${name}`),
                parse: jest.fn(),
                withConfig: jest.fn(() => new EditableValueBuilder().build().formatter),
                getFormatPlaceholder: jest.fn(),
                type: FormatterType.DateTime,
                config: {}
            },
            setValidator: jest.fn(),
            setValue: jest.fn((value) => this.withValue(value)),
            setTextValue: jest.fn(),
            setFormatter: jest.fn()
        };
    }
    withValue(value) {
        this.editableValue.value = value;
        this.editableValue.displayValue = this.editableValue.formatter.format(value);
        return this;
    }
    withFormatter(formatter) {
        this.editableValue.formatter = formatter;
        return this;
    }
    isReadOnly() {
        this.editableValue.readOnly = true;
        return this;
    }
    isLoading() {
        this.editableValue.status = "loading" /* Loading */;
        return this.isReadOnly();
    }
    isUnavailable() {
        this.editableValue.status = "unavailable" /* Unavailable */;
        return this.isReadOnly();
    }
    withValidation(validation) {
        this.editableValue.validation = validation;
        return this;
    }
    withUniverse(...values) {
        this.editableValue.universe = values;
        return this;
    }
    build() {
        return this.editableValue;
    }
}
