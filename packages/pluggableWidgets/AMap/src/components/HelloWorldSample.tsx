import { createElement } from "react";
import { Map, APILoader, ScaleControl, ToolBarControl, ControlBarControl, Geolocation } from '@uiw/react-amap';

import './AMapSDK';

export interface HelloWorldSampleProps {
    sampleText?: string;
}

const Demo = () => (

        <Map>
            <ScaleControl offset={[16, 30]} position="LB" />
            <ToolBarControl offset={[16, 10]} position="RB" />
            <ControlBarControl offset={[16, 180]} position="RB" />
            <Geolocation
                maximumAge={100000}
                borderRadius="5px"
                position="RB"
                offset={[16, 80]}
                zoomToAccuracy={true}
                showCircle={true}
            />
        </Map>
    
);

export const HelloWorldSample = (props: HelloWorldSampleProps) => {

    console.log(props);

    return <div style={{ width: '100%', height: 300 }}>
        <APILoader>
            <Demo></Demo>
        </APILoader>
    </div>
}
