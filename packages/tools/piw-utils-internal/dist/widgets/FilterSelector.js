import { createElement, useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useOnClickOutside } from "../utils";
export function FilterSelector(props) {
    const [value, setValue] = useState(props.defaultFilter);
    const [show, setShow] = useState(false);
    const componentRef = useRef(null);
    useOnClickOutside(componentRef, () => setShow(false));
    const onClick = useCallback((value) => {
        setValue(value);
        props.onChange(value);
        setShow(false);
    }, [props.onChange]);
    useEffect(() => {
        setValue(props.defaultFilter);
        props.onChange(props.defaultFilter);
    }, [props.defaultFilter, props.onChange]);
    return (createElement("div", { className: "filter-selector" },
        createElement("div", { className: "filter-selector-content", ref: componentRef },
            createElement("button", { "aria-controls": `${props.name}-filter-selectors`, "aria-expanded": show, "aria-haspopup": true, "aria-label": props.ariaLabel, className: classNames("btn btn-default filter-selector-button button-icon", value), onClick: () => setShow(show => !show) }, "\u00A0"),
            show && (createElement("ul", { id: `${props.name}-filter-selectors`, className: "filter-selectors", role: "menu", "data-focusindex": 0 }, props.options.map((option, index) => (createElement("li", { className: classNames({ "filter-selected": value === option.value }), key: index, onClick: () => onClick(option.value), onKeyDown: e => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onClick(option.value);
                    }
                }, role: "menuitem", tabIndex: 0 },
                createElement("div", { className: classNames("filter-icon", option.value), "aria-hidden": true }),
                createElement("div", { className: "filter-label" }, option.label)))))))));
}
