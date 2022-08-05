import { Traits } from "./Traits";

interface ItemRequirements {
  level?: number;
  experience?: number;
  health?: number;
  strength?: number;
  defence?: number;
  wisdom?: number;
  dexterity?: number;
  intelligence?: number;
  accuracy?: number;
  speed?: number;
  luck?: number;
}

export interface Item {
  id: number;
  name: string;
  description: string;
  itemTypeId: number;
  requirements: ItemRequirements;
  traits: Traits;
  extras: any[];
  worth: number;
  slots: number[];
  stackable: boolean;
  offenceType: string;
}
