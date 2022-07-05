import { Region } from './Region';

export interface Location {
  id: number;
  regionId: number;
  name: string;
  description: string;
  locationType: string;
}

export interface Location {
  region: Region;
}
