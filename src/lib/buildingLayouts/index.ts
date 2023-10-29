import {SingleFloorInfo} from '.';
import PGCLLFloorInfo from './PGCLL';

export * from './PGCLL';
export type * from './types';

export const BUILDINGS = [
  "PGCLL"
];

export type BuildingFloorInfo = { [key: string]: SingleFloorInfo };


export const BUILDINGS_MAP: { [key: string]: BuildingFloorInfo } = {
  "PGCLL": PGCLLFloorInfo
};
