export type Session = {
  id: number;
  lead: string;
  startDateTime: Date;
  building: string;
  sweeps: Sweep[];
}

export type Sweep = {
  id: number;
  startDateTime: Date;
  endDateTime?: Date;
  sweeperNames: string[];
}
