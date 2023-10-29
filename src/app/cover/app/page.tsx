"use client";

import Header from "@/components/Header";
import { BUILDINGS_MAP, SingleFloorInfo } from "@/lib/buildingLayouts";
import { faChevronRight, faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@/components/Typography";
import Container from "@/components/Container";
import { useRouter } from "next/navigation";
import useBestReportData from "./useBestReportData";
import {useEffect, useState} from "react";

export default function Page() {
  const { getReportData, setReportData: setReportDataStorage } = useBestReportData();
  const router = useRouter();
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    async function asyncGet() {
      const reportData = await getReportData();
      setReportData(reportData);
    }

    asyncGet();
  }, [getReportData])

  if (!reportData) {
    return (<div>Loading... if this does not load, there may be an error</div>);
  }

  const { buildingName, regionInfo } = reportData;

  // @ts-ignore
  const buildingFloorPlan: { [key: string]: SingleFloorInfo } = BUILDINGS_MAP[buildingName];

  const regionNames = Object.keys(buildingFloorPlan);

  const isDone = regionNames.every((regionName) => {
    return !!regionInfo[regionName];
  });

  const startingName = regionNames[0];

  const cancelSweep = async () => {
    const confirm = window.confirm("Are you sure you want to cancel this session?");

    if (!confirm) {
      return;
    }

    if (reportData.id) {
      const res = await fetch(`/api/v1/sweep?id=${reportData.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("There was an error canceling the sweep.");
      }
    }

    await setReportDataStorage(null);

    router.push("/");
  } 
  
  return (
    <main>
      <Header 
        backOnClick={cancelSweep}
        backText="Cancel"
        actionButtonUrl={isDone ? "app/review" : `app/${startingName}`} 
        actionButtonText={isDone ? "Finish" : "Start" } 
        actionButtonIcon={faChevronRight}
      />
      <Container>
        <Typography type="header" className="text-center mt-4"> {buildingName} </Typography>
        <div className="mt-4 flex gap-4 flex-col mb-8">
          {regionNames.map((regionName, index) => {
            return (
              <RegionButton
                key={index}
                regionName={buildingFloorPlan[regionName].name}
                onClick={() => {
                  router.push(`/cover/app/${regionName}`);
                }}
                isComplete={!!regionInfo[regionName]}
              />
            );
          })}
        </div>
      </Container>
    </main>
  );
}

function RegionButton({
  regionName,
  onClick,
  isComplete
}: {
  regionName: string;
  onClick: () => void;
  isComplete: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 h-12"
    >
      <div className="flex items-center">
        <div className="text-sm text-gray-500">{regionName}</div>
      </div>
      <div className="flex items-center">
        {isComplete ? (
          <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
        ) : (
          <FontAwesomeIcon icon={faCircleXmark} className="text-red-500" />
        )}
      </div>
    </button>
  );
}
