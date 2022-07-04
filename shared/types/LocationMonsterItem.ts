import { LocationMonster } from "./LocationMonster";
import { Item } from "./Item";

export interface LocationMonsterItem {
  id: number;
  locationMonsterId: number;
  itemId: number;
  slot: string;
}

export interface LocationMonsterItem {
  locationMonster?: LocationMonster;
  item?: Item;
}
