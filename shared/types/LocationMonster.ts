import { Location } from "./Location";
import { Monster } from "./Monster";

export interface LocationMonster {
  id: number;
  monsterId: number;
  locationId: number;
  chance: number;
  dropRolls: number;
}

export interface LocationMonster {
  location?: Location;
  monster?: Monster;
}
