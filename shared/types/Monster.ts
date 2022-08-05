import { Gender } from "./Gender";
import { Profession } from "./Profession";
import { Race } from "./Race";
import { Traits } from "./Traits";

export interface Monster {
  id: number;
  name: string;
  raceId: number;
  genderId: number;
  description: string;
  level: number;
  experience: number,
  traits: Traits;
  professionIds: number[];
}

export interface Monster {
  professions?: Profession[];
  race?: Race;
  gender?: Gender;
}
