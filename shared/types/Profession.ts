export interface Profession {
  id: number;
  fromProfessionId: number;
  name: string;
  description: string;
  extraRaise: number;
}

export interface Profession {
  fromProfession: Profession;
}
