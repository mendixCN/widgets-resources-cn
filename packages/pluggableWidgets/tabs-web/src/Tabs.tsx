import { useWhyDidYouUpdate } from "ahooks";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import { ValueStatus } from "mendix";
import { createElement, useEffect, useState } from "react";

import { TabsContainerProps } from "../typings/TabsProps";

import "./ui/index.scss";

export default function (props: TabsContainerProps) {
    const [activeKey, setActiveKey] = useState<string>();

    useEffect(() => {
        if (props.activeKey && props.activeKey.status === ValueStatus.Available) {
            setActiveKey(props.activeKey.value);
        }
    }, [props.activeKey]);

    useEffect(() => {
        if (
            props.activeKey &&
            props.activeKey.status === ValueStatus.Available &&
            props.activeKey.value !== activeKey
        ) {
            props.activeKey.setValue(activeKey);
        }
    }, [activeKey]);

    useWhyDidYouUpdate(props.name, { ...props });
    useWhyDidYouUpdate(props.name, { activeKey });

    return (
        <div>
            <Tabs
                animated
                centered={props.centered}
                tabPosition={props.tabPosition}
                activeKey={activeKey}
                onChange={setActiveKey}
            >
                {props.tabs.map(tab => (
                    <TabPane
                        tab={props.customHeader ? tab.headContent : tab.caption!.value}
                        disabled={tab.disabled.value}
                        tabKey={tab.tabKey}
                        key={tab.tabKey}
                    >
                        {tab.content}
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
}
