import { createElement, Ref, useRef } from "react";
import { Map, ScaleControl, ToolBarControl, ControlBarControl, MapProps, Marker } from "@uiw/react-amap";

import "../../vendor/AMapSDK";

export interface AMarker {
    title: string;
    lat: number;
    lng: number;
}
export interface AMapComponentProps {
    onDblClick?: (event: AMap.MapsEvent, idx: number) => void;
    change?: (lat: number, lng: number) => void;
    zoom: number;
    lat: number;
    lng: number;
    marks: AMarker[];
    onZoomChange?: (zoom: number) => void;
}

export const AMapComponent = (props: AMapComponentProps) => {
    const mapRef: Ref<MapProps & { map?: any | undefined }> | undefined = useRef(null);

    return (
        <div style={{ width: "100%", height: 600 }}>
            <Map
                ref={mapRef}
                zoom={props.zoom}
                onZoomChange={() => {
                    if (props.change) {
                        props.change(mapRef.current?.map.getCenter().lat, mapRef.current?.map.getCenter().lng);
                    }
                    return props.onZoomChange && props.onZoomChange(mapRef.current?.map.getZoom());
                }}
                center={[props.lng, props.lat]}
                onDblClick={(event: AMap.MapsEvent) => {
                    if (props.change) {
                        props.change(event.lnglat.getLat!(), event.lnglat.getLng!());
                    }
                }}
            >
                <ScaleControl offset={[16, 30]} position="LB" />
                <ToolBarControl offset={[16, 10]} position="RB" />
                <ControlBarControl offset={[16, 180]} position="RB" />
                {props.marks.map((mark, idx) => (
                    <Marker
                        key={idx}
                        onDblClick={(e: any) => {
                            if (props.onDblClick) {
                                props.onDblClick(e, idx);
                            }
                        }}
                        visiable
                        title={mark.title}
                        position={new AMap.LngLat(mark.lng, mark.lat)}
                    />
                ))}
            </Map>
        </div>
    );
};
