import { createElement, Fragment, Ref, useEffect, useMemo, useRef } from "react";
import { Map, ScaleControl, ToolBarControl, ControlBarControl, MapProps } from "@uiw/react-amap";
import classNames from "classnames";

let lastPaneId = 1;

function Driving(p: any) {
    const lastDrivingRef = useRef<any>();
    useEffect(() => {
        if (!p.startAndEnd) {
            return;
        }
        if (lastDrivingRef.current) {
            lastDrivingRef.current.clear();
            lastDrivingRef.current = null;
        }
        // @ts-ignore
        window.AMap.plugin("AMap.Driving", () => {
            console.log(p.startAndEnd);
            // @ts-ignore
            const driving = new window.AMap.Driving({
                // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                // @ts-ignore
                policy: window.AMap.DrivingPolicy.LEAST_TIME,
                map: p.map,
                panel: p.paneId
            });

            lastDrivingRef.current = driving;

            /*             const points = [
                            { keyword: "北京市地震局（公交站）", city: "北京" },
                            { keyword: "亦庄文化园（地铁站）", city: "北京" }
                        ]; */

            // @ts-ignore
            driving.search(
                new AMap.LngLat(p.startAndEnd[0], p.startAndEnd[1]),
                new AMap.LngLat(p.startAndEnd[2], p.startAndEnd[3]),
                (status: any, result: any) => {
                    // 未出错时，result即是对应的路线规划方案
                    console.log(status, result);
                }
            );
        });
    }, [p.startAndEnd]);
    return null;
}

interface NavModeProps {
    startAndEnd?: [number, number, number, number];
}

export default function NavMode(props: NavModeProps) {
    const paneId = useMemo(() => +new Date() + "-pane" + lastPaneId++, []);
    const mapRef: Ref<MapProps & { map?: any | undefined }> | undefined = useRef(null);

    return (
        <Fragment>
            <Map className={classNames("flexitem-9")} ref={mapRef}>
                <Driving paneId={paneId} startAndEnd={props.startAndEnd}></Driving>

                <ScaleControl offset={[16, 20]} position="LB" />
                <ToolBarControl offset={[16, 60]} position="RB" />
                <ControlBarControl position="RT" />
            </Map>
            <div id={paneId} className={classNames("flexitem-3")} style={{ overflow: "auto" }}></div>
        </Fragment>
    );
}
