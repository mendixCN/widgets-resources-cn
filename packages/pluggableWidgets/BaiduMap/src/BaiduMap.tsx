import { Component, ReactNode, createElement } from "react";

import { BaiduMapContainerProps } from "../typings/BaiduMapProps";
import { BaiduMapComponent } from "./components/BaiduMapComponent";

import "./ui/BaiduMap.css";

export default class BaiduMap extends Component<BaiduMapContainerProps> {
    render(): ReactNode {
        return <BaiduMapComponent></BaiduMapComponent>;
    }
}
