export interface ClassTrait {
  trait: string;
  chance: number;
}

export interface CreateMonster {
  level: number;
  id: number;
  name: string;
  raceId: number;
  description?: string;
}
