import { createElement } from "react";

import "../ui/antd.css";
import { Select } from "antd";

const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];

export default function SelectComponent() {
    return (
        <Select mode="multiple" placeholder="Inserted are removed" style={{ width: "100%" }}>
            {OPTIONS.map(item => (
                <Select.Option key={item} value={item}>
                    {item}
                </Select.Option>
            ))}
        </Select>
    );
}
