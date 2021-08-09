import { ReactNode, ReactElement } from "react";
import { WebIcon } from "mendix";
export interface AlertProps {
    children?: ReactNode;
    className?: string;
    bootstrapStyle: "default" | "primary" | "success" | "info" | "warning" | "danger";
}
export declare const Alert: {
    ({ className, bootstrapStyle, children }: AlertProps): JSX.Element | null;
    displayName: string;
};
export interface IconProps {
    icon: WebIcon | null;
    className?: string;
    fallback?: ReactElement;
}
export declare const Icon: {
    ({ icon, className, fallback }: IconProps): ReactElement | null;
    displayName: string;
};
