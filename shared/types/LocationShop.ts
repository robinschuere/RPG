import { Location } from "./Location";

export interface Sale {
  shopkeeper: string;
  items: number[];
  salePercentage: number;
  buyPercentage: number;
}

export interface LocationShop {
  id: number;
  locationId: number;
  name: string;
  description: string;
  sales: Sale;
}

export interface LocationShop {
  Location?: Location;
}