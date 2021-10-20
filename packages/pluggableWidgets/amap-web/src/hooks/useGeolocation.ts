// copy from https://github.com/bence-toth/react-hook-geolocation/blob/27c97736cb8d155bcc8ef0f68f1dc22ba0b8267e/src/index.js

/* 
  // 创建gps坐标位置点标记
    var lnglat = [113.518723,22.248239];
// 坐标转换
    function convertFrom(lnglat, type){
        AMap.convertFrom(lnglat, type, function (status, result) {
          if (result.info === 'ok') {
            var resLnglat = result.locations[0];
            m2 = new AMap.Marker({
                position: resLnglat,
            });
            map.add(m2);
            // 设置标签
            m2.setLabel({
                offset: new AMap.Pixel(20, 20),
                content: "高德坐标系中首开广场（正确）"
            });
          }
        });
    }
    convertFrom(lnglat,'gps');

    //jsonp_910915_({"status":"1","info":"ok","infocode":"10000","locations":"113.523315429688,22.250418836806"})
 */

import { useEffect, useState } from "react";
export interface EnrichedGeolocationCoordinates {
    data?: GeolocationPosition;
    error?: GeolocationPositionError;
}
const useGeolocation = (
    { enableHighAccuracy, maximumAge, timeout }: PositionOptions = {},
    callback?: (geolocation: EnrichedGeolocationCoordinates) => void
): EnrichedGeolocationCoordinates | undefined => {
    const [coordinates, setCoordinates] = useState<EnrichedGeolocationCoordinates>();

    useEffect(() => {
        let didCancel: boolean;
        const updateCoordinates: PositionCallback = data => {
            if (!didCancel) {
                setCoordinates({
                    data
                });
                if (callback instanceof Function) {
                    callback({
                        data
                    });
                }
            }
        };

        const setError: PositionErrorCallback = error => {
            if (!didCancel) {
                setCoordinates({
                    error
                });
            }
        };

        let watchId: number;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(updateCoordinates, setError);
            watchId = navigator.geolocation.watchPosition(updateCoordinates, setError, {
                enableHighAccuracy,
                maximumAge,
                timeout
            });
        }
        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
            didCancel = true;
        };
    }, [callback, enableHighAccuracy, maximumAge, timeout]);

    return coordinates;
};

export default useGeolocation;
