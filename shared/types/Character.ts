import { Profession } from './Profession';
import { Race } from './Race';
import { Gender } from './Gender';
import { User } from './User';

export interface Character {
  id: string;
  userId: string;
  name: string;
  genderId: number;
  raceId: number;
  level: number;
  experience: number;
  totalExperience: number;
  health: number;
  strength: number;
  defence: number;
  wisdom: number;
  dexterity: number;
  intelligence: number;
  accuracy: number;
  speed: number;
  luck: number;
  points: number;
  professionIds: number[];
}

export interface Character {
  user?: User;
  gender?: Gender;
  race?: Race;
  professions?: Profession[];
}
