import { Race } from "./Race";
import { Traits } from "./Traits";

export interface Profession {
  id: number;
  fromProfessionId: number;
  name: string;
  description: string;
  extraRaise: number;
  traits: Traits;
  extras: any[];
  raceId: number;
}

export interface Profession {
  fromProfession?: Profession;
  race?: Race;
}
