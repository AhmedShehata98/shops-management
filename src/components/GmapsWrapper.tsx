import { memo, useCallback, useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { usePosition } from "../hooks/usePosition";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { mapPathAtom } from "../atoms/mapPath.atom";

type Props = {
  onClick?: ((e: google.maps.MapMouseEvent) => void) | undefined;
};
function GmapsWrapper({ onClick }: Props) {
  const { isLoading, position } = usePosition();
  const paths = useRecoilValue(mapPathAtom);
  const [_map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GMAPS_API_KEY,
  });
  const [center, setCenter] = useState({
    lat: paths.at(0)?.lat || position.lat,
    lng: paths.at(0)?.lng || position.lng,
  });
  const onLoad = useCallback(
    (map: google.maps.Map) => {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    },
    [paths]
  );
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (paths.at(0)?.lat && paths.at(0)?.lng) {
      setCenter({
        lat: paths.at(0)?.lat!,
        lng: paths.at(0)?.lng!,
      });
    }
  }, [paths]);

  return !isLoading && isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={onClick}
    >
      {paths &&
        paths.map((path, idx) => <Marker key={idx} position={path as any} />)}
    </GoogleMap>
  ) : (
    <div className="flex flex-col gap-4 items-center justify-center h-[400px] ">
      <RefreshIcon fontSize="large" className="animate-spin !text-4xl" />
      <Typography
        color="GrayText"
        fontWeight={"700"}
        textTransform={"uppercase"}
      >
        loading maps ...
      </Typography>
    </div>
  );
}

export default memo(GmapsWrapper);
