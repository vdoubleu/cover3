export type CoverageState = {
  id?: number;
  buildingName: string;
  sweepers: string[];
  startTime: Date;
  regionInfo: { [key: string]: RegionInfo };
}

export type RegionInfo = {
  [key: string]: undefined | string;
}
