import { Children, createElement } from "react";
import classNames from "classnames";
export const Alert = ({ className, bootstrapStyle, children }) => Children.count(children) > 0 ? (createElement("div", { className: classNames(`alert alert-${bootstrapStyle}`, className) }, children)) : null;
Alert.displayName = "Alert";
export const Icon = ({ icon, className = "", fallback }) => {
    if ((icon === null || icon === void 0 ? void 0 : icon.type) === "glyph") {
        return createElement("span", { className: classNames("glyphicon", className, icon.iconClass), "aria-hidden": true });
    }
    if ((icon === null || icon === void 0 ? void 0 : icon.type) === "image") {
        return createElement("img", { className: className, src: icon.iconUrl, "aria-hidden": true, alt: "" });
    }
    return fallback || null;
};
Icon.displayName = "Icon";
