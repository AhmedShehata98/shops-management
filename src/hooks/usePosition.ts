import { useEffect, useState } from "react";

export const usePosition = () => {
  const [position, setPosition] = useState<{
    lng: number;
    lat: number;
  }>({ lng: 29.924526, lat: 31.205753 });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (positionSuccess) => {
        setPosition({
          lng: positionSuccess.coords.longitude,
          lat: positionSuccess.coords.latitude,
        });
        setIsLoading(false);
        setIsError(false);
      },
      (positionError) => {
        setIsLoading(false);
        setIsError(true);
      }
    );
  }, []);

  return { isError, isLoading, position };
};
