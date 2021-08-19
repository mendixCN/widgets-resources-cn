import { createElement } from "react";

import { SelectContainerProps } from "../typings/SelectProps";
import SelectComponent from "./components/SelectComponent";

import "./ui/Select.css";

export default function Select(props: SelectContainerProps) {
    console.log(props);

    return <SelectComponent></SelectComponent>;
}
