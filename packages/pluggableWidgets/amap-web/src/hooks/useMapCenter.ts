import { useEffect, useState } from "react";

export const useMapCenter = (map: AMap.Map) => {
    const [lngLat, setLngLat] = useState<AMap.LngLat>();
    useEffect(() => {
        const handle = () => {
            setLngLat(map.getCenter());
        };
        map.on("mapmove", handle);
        return () => {
            map.off("mapmove", handle);
        };
    }, [map]);
    return lngLat;
};
