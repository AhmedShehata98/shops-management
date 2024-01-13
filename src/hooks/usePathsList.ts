import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { mapPathAtom } from "../atoms/mapPath.atom";

type Props = {
  shops: ShopsType[];
  isLoading: boolean;
  isError: boolean;
};
const usePathsList = ({ isError, isLoading, shops }: Props) => {
  const [paths, setPaths] = useRecoilState(mapPathAtom);

  useEffect(() => {
    if (!isLoading && !isError) {
      if (!shops) return;
      const paths = shops.map((path) => ({
        lat: path.location.latlng.lat,
        lng: path.location.latlng.lng,
      }));
      setPaths(paths);
    }
  }, [isError, isLoading, shops]);

  return { paths };
};

export default usePathsList;
