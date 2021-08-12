import { createElement } from "react";
import { Map, APILoader, ScaleControl, ToolBarControl, ControlBarControl } from '@uiw/react-amap';

import './AMapSDK';

export interface HelloWorldSampleProps {
    sampleText?: string;
    change?: (lat: number, lng: number) => void;
    lat: number;
    lng: number;
}

const Demo = (props: HelloWorldSampleProps) => (

    <Map
        center={[props.lng, props.lat]}
        onDblClick={(event: AMap.MapsEvent) => {
            props.change && props.change(event.lnglat.getLat!(), event.lnglat.getLng!());
        }}>
        <ScaleControl offset={[16, 30]} position="LB" />
        <ToolBarControl offset={[16, 10]} position="RB" />
        <ControlBarControl offset={[16, 180]} position="RB" />
    </Map>

);

export const HelloWorldSample = (props: HelloWorldSampleProps) => {

    return <div style={{ width: '100%', height: 300 }}>
        <APILoader>
            <Demo lat={props.lat} lng={props.lng} change={props.change}></Demo>
        </APILoader>
    </div>
}
