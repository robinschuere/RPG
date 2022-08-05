import { Profession } from './Profession';
import { Race } from './Race';
import { Gender } from './Gender';
import { User } from './User';
import { Traits } from './Traits';

export interface Character {
  id: string;
  userId: string;
  name: string;
  genderId: number;
  raceId: number;
  level: number;
  experience: number;
  totalExperience: number;
  traits: Traits;
  points: number;
  professionIds: number[];
}

export interface Character {
  user?: User;
  gender?: Gender;
  race?: Race;
  professions?: Profession[];
}

export interface NewCharacterProps {
  name: string;
  raceId: number;
  genderId: number;
  traits: Traits;
}