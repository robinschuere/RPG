import { Item } from "./Item";
import { LocationMonster } from "./LocationMonster";

export interface LocationMonsterDrop {
  id: number;
  locationMonsterId: number;
  itemId: number;
  chance: number;
  amount: number;
}

export interface LocationMonsterDrop {
  locationMonster?: LocationMonster;
  item?: Item;
}
