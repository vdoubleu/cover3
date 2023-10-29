"use client";

import Header from "@/components/Header";
import useBestReportData from "../useBestReportData";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BUILDINGS_MAP, SingleFloorInfo } from "@/lib/buildingLayouts";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import SimpleInput from "@/components/SimpleInput";
import MultiLineInput from "@/components/MultiLineInput";
import Button from "@/components/Button";

export default function Page({ params }: { params: { region: string } }) {
  const { getReportData, setReportData: setProperReportData } = useBestReportData();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reportData, setReportData] = useState<any>(null);
  const [currRegionInfo, setCurrRegionInfo] = useState<any>(null);

  const isEdit = searchParams.get("edit") === "true";

  const { region } = params;

  useEffect(() => {
    async function asyncGet() {
      const reportData = await getReportData();
      setReportData(reportData);

      if (!reportData) {
        return;
      }

      const { buildingName, regionInfo } = reportData;

      // @ts-ignore
      const buildingFloorPlan: { [key: string]: SingleFloorInfo } = BUILDINGS_MAP[buildingName];
      const regionMetadata = buildingFloorPlan[region];

      const defaultRoomInfo = Object.fromEntries(
        regionMetadata.rooms.map((room) => [room, 0])
      );

      const regionInfoForRegion = regionInfo[region] ?? {
        ...defaultRoomInfo,
        "notes": "",
      };

      setCurrRegionInfo(regionInfoForRegion);
    }

    asyncGet();
  }, [getReportData, region])

  if (!reportData) {
    return (<div>Loading... if this does not load, there may be an error</div>);
  }

  const { buildingName, regionInfo } = reportData;

  // @ts-ignore
  const buildingFloorPlan: { [key: string]: SingleFloorInfo } = BUILDINGS_MAP[buildingName];
  const regionMetadata = buildingFloorPlan[region];

  const inputFields = (() => {
    const regionRooms = regionMetadata.rooms;
    const inputFields = regionRooms.map((room: string, index: number) => {
      return (
        <div className="mt-4" key={index}>
          <SimpleInput 
            key={index}
            labelText={`Students in ${room}`}
            type="number"
            name={room}
            onChange={(e) => setCurrRegionInfo({
              ...currRegionInfo,
              [room]: e.target.value,
            })}
            value={currRegionInfo[room]}
          />
        </div>
      );
    });

    return (
      <div>
        {inputFields}
        <div className="mt-4">
          <MultiLineInput
            labelText="Notes"
            name="notes"
            onChange={(e) => {setCurrRegionInfo({
              ...currRegionInfo,
              "notes": e.target.value,
            })}}
            value={currRegionInfo["notes"]}
          />
        </div>
      </div>
    );
  })();

  const onSubmit = async () => {
    const newRegionInfo = {
      ...regionInfo,
      [region]: currRegionInfo,
    };

    await setProperReportData({
      ...reportData,
      regionInfo: newRegionInfo,
    });

    if (isEdit) {
      router.push(`/cover/app/review`);
      return;
    }

    router.push(`/cover/app/${regionMetadata.next}`);
  };

  return (
    <main>
      <Header />
      <Container>
        <Typography type="header" className="text-center mt-4">
          {regionMetadata.name}
        </Typography>
        {inputFields}
        <div className="flex justify-center mt-8">
          <Button
            onClick={onSubmit}
            text={isEdit ? "Done" : "Next"}
          />
        </div>
      </Container>
    </main>
  );
}
