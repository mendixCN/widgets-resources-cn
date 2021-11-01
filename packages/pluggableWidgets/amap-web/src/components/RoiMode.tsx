import { createElement, Ref, useRef, useState } from "react";
import { Map, ScaleControl, ToolBarControl, ControlBarControl, MapProps, Marker } from "@uiw/react-amap";
import classNames from "classnames";

export interface AMarker {
    title: string;
    lat: number;
    lng: number;
}

interface RoiModeProps {
    change?: (lat: number, lng: number) => void;
    marks: AMarker[];
    onDblClick?: (event: AMap.MapsEvent, idx: number) => void;
    onCenterChange?: (lat: number, lng: number) => void;
    zoom: number;
    onZoomChange?: (zoom: number) => void;
    lat: number;
    lng: number;
}
export default function RoiMode(props: RoiModeProps) {
    const [isMoving, setIsMoving] = useState(false);
    const mapRef: Ref<MapProps & { map?: any | undefined }> | undefined = useRef(null);
    return (
        <Map
            className={classNames("flexitem-9")}
            ref={mapRef}
            zoom={props.zoom}
            center={isMoving ? undefined : [props.lng, props.lat]}
            onDblClick={(event: AMap.MapsEvent) => {
                if (props.change) {
                    props.change(event.lnglat.getLat!(), event.lnglat.getLng!());
                }
            }}
            onMoveStart={() => setIsMoving(true)}
            onMoveEnd={() => setIsMoving(false)}
            onMapMove={() => {
                if (props.onCenterChange) {
                    props.onCenterChange(mapRef.current?.map.getCenter().lat, mapRef.current?.map.getCenter().lng);
                }
            }}
            onZoomChange={() => {
                if (props.onCenterChange) {
                    props.onCenterChange(mapRef.current?.map.getCenter().lat, mapRef.current?.map.getCenter().lng);
                }
                return props.onZoomChange && props.onZoomChange(mapRef.current?.map.getZoom());
            }}
        >
            <ScaleControl offset={[16, 20]} position="LB" />
            <ToolBarControl offset={[16, 60]} position="RB" />
            <ControlBarControl position="RT" />
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
    );
}
