"use client";

import {CoverageState, RegionInfo} from "@/lib/CoverageData";
import {BUILDINGS_MAP, BuildingFloorInfo} from "./buildingLayouts";
import {dateOnlyFormat, hourMinuteFormat, roundedHourOnlyFormat} from "@/lib/DateTimeHelpers";
import {useRouter} from "next/navigation";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

function singleRegionInfoBlock(reportData: CoverageState, buildingFloorPlan: BuildingFloorInfo, regionName: string): string {
  // mapping from room to people in room and also notes
  const regionInfoForRegion: RegionInfo = reportData.regionInfo[regionName];

  if (!regionInfoForRegion) {
      return "";
  }

  const floorRooms = buildingFloorPlan[regionName].rooms.map((room: string) => (
      `${buildingFloorPlan[regionName].name} ${room}: ${regionInfoForRegion[room]}\n`
  )).reduce((prev: string, curr: string) => prev + curr, "");

  const notes = regionInfoForRegion["notes"] ? `${buildingFloorPlan[regionName].name} Notes:\n${regionInfoForRegion["notes"]}\n` : "";

  return `${floorRooms}${notes}\n`;
}

function coverageMetadata(reportData: CoverageState, endTime: Date): string {
  const startTime = new Date(reportData.startTime);

  const title = `${roundedHourOnlyFormat(startTime)} Sweep Notes\n`;

  const time = `Time: ${hourMinuteFormat(startTime)} - ${hourMinuteFormat(endTime)}\n`;
  const date = `Date: ${dateOnlyFormat(startTime)}\n`;
  const CAs = `CAs on Sweep: ${reportData.sweepers[0]} and ${reportData.sweepers[1]}\n\n`;

  return title + time + date + CAs + "\n";
};

export function getCoverageInfoText(reportData: CoverageState, endTime: Date): string {
  const buildingFloorPlan: BuildingFloorInfo = BUILDINGS_MAP[reportData.buildingName];

  const regionInfoText = Object.keys(buildingFloorPlan).map((regionName: string) => {
    return singleRegionInfoBlock(reportData, buildingFloorPlan, regionName) + "\n";
  }).reduce((prev, curr) => prev + curr, "");

  return coverageMetadata(reportData, endTime) + regionInfoText;
}

export function CoverageInfoEdit({reportData, endTimestamp, hideEdit }: { reportData: CoverageState, endTimestamp: Date, hideEdit?: boolean }) {
  const buildingFloorPlan: BuildingFloorInfo = BUILDINGS_MAP[reportData.buildingName];
  const router = useRouter();
  const endTime = new Date(endTimestamp);

  const floorInfoEdit = Object.keys(buildingFloorPlan).map((floorNameWithoutReview: string) => {
    const lineContent = singleRegionInfoBlock(reportData, buildingFloorPlan, floorNameWithoutReview);

    if (!lineContent.trim()) {
      return <React.Fragment key={floorNameWithoutReview + "-edit"} />;
    }

    return (
      <React.Fragment key={floorNameWithoutReview + "-edit"}>
        <div className="flex justify-between">
          {lineContent} 
          {!hideEdit && (<FontAwesomeIcon
            icon={faPenToSquare} 
            onClick={() => router.push(`/cover/app/${floorNameWithoutReview}?edit=true`)} 
          />)
          }
        </div>
      </React.Fragment>
    );
  });

  return (<>{coverageMetadata(reportData, endTime)}{floorInfoEdit}</>);
}
