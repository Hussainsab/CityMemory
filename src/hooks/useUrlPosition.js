import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [serachParam, setSearchParam] = useSearchParams();

  let lat = serachParam.get("lat");
  let lng = serachParam.get("lng");
  return [lat, lng];
}
