import { createElement, forwardRef, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from "react";
import Icon, { IconBaseProps } from "./Icon";
import "./font_8d5l8fzk5b87iudi";

// scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
export const BuildinIconScriptUrl = "widgets/resources/font_8d5l8fzk5b87iudi.js";
const customCache = new Set<string>();
customCache.add(BuildinIconScriptUrl);

export interface CustomIconOptions {
    extraCommonProps?: { [key: string]: any };
}

export interface IconFontProps extends IconBaseProps {
    type: string;
}

function isValidCustomScriptUrl(scriptUrl: string): boolean {
    return Boolean(typeof scriptUrl === "string" && scriptUrl.length && !customCache.has(scriptUrl));
}

function createScriptUrlElements(scriptUrls: string[], index = 0): void {
    const currentScriptUrl = scriptUrls[index];
    if (isValidCustomScriptUrl(currentScriptUrl)) {
        const script = document.createElement("script");
        script.setAttribute("src", currentScriptUrl);
        script.setAttribute("data-namespace", currentScriptUrl);
        if (scriptUrls.length > index + 1) {
            script.onload = () => {
                createScriptUrlElements(scriptUrls, index + 1);
            };
            script.onerror = () => {
                createScriptUrlElements(scriptUrls, index + 1);
            };
        }
        customCache.add(currentScriptUrl);
        document.body.appendChild(script);
    }
}

export default function create(
    options: CustomIconOptions = {}
): ForwardRefExoticComponent<PropsWithoutRef<IconFontProps> & RefAttributes<HTMLDivElement>> {
    const { extraCommonProps = {} } = options;

    const Iconfont = forwardRef<HTMLDivElement, IconFontProps>((props, ref) => {
        const { type, children, ...restProps } = props;

        // children > type
        let content: React.ReactNode = null;
        if (props.type) {
            content = <use xlinkHref={`#${type}`} />;
        }
        if (children) {
            content = children;
        }
        return (
            <Icon
                {...extraCommonProps}
                {...restProps}
                ref={ref}
                className={props.className}
                style={props.style}
                name={props.name}
                tabIndex={props.tabIndex}
            >
                {content}
            </Icon>
        );
    });

    Iconfont.displayName = "Iconfont";

    return Iconfont;
}
export function loadIconLib(scriptUrl: string | string[] | undefined) {
    /**
     * DOM API required.
     * Make sure in browser environment.
     * The Custom Icon will create a <script/>
     * that loads SVG symbols and insert the SVG Element into the document body.
     */
    if (
        scriptUrl &&
        typeof document !== "undefined" &&
        typeof window !== "undefined" &&
        typeof document.createElement === "function"
    ) {
        if (Array.isArray(scriptUrl)) {
            // 因为iconfont资源会把svg插入before，所以前加载相同type会覆盖后加载，为了数组覆盖顺序，倒叙插入
            if (scriptUrl.length > 0) {
                createScriptUrlElements(scriptUrl.reverse());
            }
        } else {
            createScriptUrlElements([scriptUrl]);
        }
    }
}
