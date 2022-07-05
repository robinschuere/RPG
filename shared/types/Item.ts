import { SlotType } from "./SlotType";

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

interface ItemTraits {
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
  traits: ItemTraits;
  extras: any[];
  worth: number;
  slots: number[];
  stackable: boolean;
  offenceType: string;
}
