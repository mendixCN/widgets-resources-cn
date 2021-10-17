import classNames from "classnames";
import { svgBaseProps, useInsertStyles, warning } from "./utils";
import React, { Children, createElement, forwardRef, isValidElement } from "react";

export interface IconBaseProps extends React.HTMLProps<HTMLDivElement> {
    spin?: boolean;
    rotate?: number;
}

export interface CustomIconComponentProps {
    width: string | number;
    height: string | number;
    fill: string;
    viewBox?: string;
    className?: string;
    style?: Omit<React.CSSProperties, "fontSizeAdjust">;
}

export interface IconComponentProps extends IconBaseProps {
    viewBox?: string;
    ariaLabel?: React.AriaAttributes["aria-label"];
    style?: Omit<React.CSSProperties, "fontSizeAdjust">;
}

const Icon = forwardRef<HTMLDivElement, IconComponentProps>((props, ref) => {
    const {
        // affect outter <i>...</i>
        className,
        style,

        viewBox,
        spin,
        rotate,

        tabIndex,

        // children
        children
    } = props;

    warning(Boolean(children), "Should have `children` prop.");

    useInsertStyles();

    const classString = classNames("anticon", className);

    const svgClassString = classNames({
        "anticon-spin": !!spin
    });

    const svgStyle: Omit<React.CSSProperties, "fontSizeAdjust"> = rotate
        ? {
              msTransform: `rotate(${rotate}deg)`,
              transform: `rotate(${rotate}deg)`
          }
        : {};
    svgStyle.height = style?.height;
    svgStyle.width = style?.width;

    const innerSvgProps: CustomIconComponentProps = {
        ...svgBaseProps,
        className: svgClassString,
        style: svgStyle,
        viewBox
    };

    if (!viewBox) {
        delete innerSvgProps.viewBox;
    }

    let iconTabIndex = tabIndex;
    if (iconTabIndex === undefined) {
        iconTabIndex = -1;
    }

    warning(
        Boolean(viewBox) ||
            (Children.count(children) === 1 && isValidElement(children) && Children.only(children).type === "use"),
        "Make sure that you provide correct `viewBox`" + " prop (default `0 0 1024 1024`) to the icon."
    );

    return (
        <div style={style} tabIndex={iconTabIndex} ref={ref} className={classString}>
            {" "}
            <svg className={svgClassString} {...innerSvgProps} viewBox={viewBox}>
                {" "}
                {children}{" "}
            </svg>{" "}
        </div>
    );
});

Icon.displayName = "AntdIcon";

export default Icon;
