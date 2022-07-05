import { Location } from "./Location";

export interface LocationDirection {
  id: number;
  currentLocationId: number;
  direction: string;
  directionLocationId: number;
}

export interface LocationDirection {
  currentLocation?: Location;
  directionLocation?: Location;
}
