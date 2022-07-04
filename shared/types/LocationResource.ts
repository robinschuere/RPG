import { LocationMonster } from "./LocationMonster";
import { Item } from "./Item";
import { SlotType } from "./SlotType";

export interface LocationResource {
  id: number;
  locationId: number;
  itemId: number;
  amount: number;
  chance: number;
}

export interface LocationResource {
  location?: Location;
  item?: Item;
}
