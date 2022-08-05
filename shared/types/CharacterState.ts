import { Character } from "./Character";
import { Item } from "./Item";
import { LocationMonster } from "./LocationMonster";
import { Monster } from "./Monster";
import { Race } from "./Race";
import { LocationDirection } from "./LocationDirection";
import { Location } from "./Location";
import { LocationShop } from "./LocationShop";
import { Gender } from "./Gender";
import { Profession } from "./Profession";

export interface StatisticValues {
  HEA: number;
  STR: number;
  DEF: number;
  WIS: number;
  DEX: number;
  INT: number;
  ACC: number;
  SPD: number;
  LUC: number;
}

export interface CombatStatistics {
  name: string;
  race: Race;
  gender: Gender;
  HP: number;
  MAXHP: number;
  MANA: number;
  MAXMANA: number;
  offenceType: string;
  arcaneOffence: number;
  arcaneDefence: number;
  physicalOffence: number;
  physicalDefence: number;
  dodgeChance: number;
  blockChance: number;
  accuracy: number;
  speed: number;
  experience: number;
  professionAdvantages: Profession[],
}

export interface RoundValue {
  type: string;
  amount: number;
  deflection: number;
}

export interface RoundHistory {
  roundValue: RoundValue;
  roundText: string;
}

export interface TemporaryDrop {
  tempId?: string;
  item: Item;
  amount: number;
}

export interface TrackCombatStageValues {
  monster: Monster;
  locationMonster: LocationMonster;
}

export interface ShopStageValues {
  shop: LocationShop;
}

export interface TrackStageValues {
  trackingText: string;
}

export interface IdleStageValues {
  locationDirections: LocationDirection[];
}

export interface CombatWinDropStageValues {
  drops: TemporaryDrop[];
  newLevel: number;
  oldLevel: number;
  monsterCombatState: CombatStatistics;
}

export interface CombatStageValues {
  characterCombatState: CombatStatistics;
  monsterCombatState: CombatStatistics;
  round: string;
  roundBusy: boolean;
  roundValue: RoundValue;
  roundHistory: RoundHistory[];
  locationMonster: LocationMonster;
  autoAttack: boolean;
}

export interface TrackResourceStageValues {
  drops: TemporaryDrop[];
}

export interface InventoryItem {
  id: string;
  itemId: number;
  amount: number;
}

export interface GearItem {
  slot: string;
  itemId: number;
}

export interface CharacterState {
  id?: string;
  characterId: string;
  locationId: number;
  stageType: string;
  stageValues?: CombatStageValues | IdleStageValues | TrackStageValues | TrackCombatStageValues | CombatWinDropStageValues | TrackResourceStageValues | ShopStageValues | {};
  screenType: string;
  inventory: InventoryItem[];
  gear: GearItem[];
  characterCombatState?: CombatStatistics;
  nextLevelExperience?: number;
  hasMonsters?: boolean;
  shops?: LocationShop[];
}

export interface CharacterState {
  character?: Character;
  location?: Location;
}
