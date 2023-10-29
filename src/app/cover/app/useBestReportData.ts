"use client";

import {CoverageState} from "@/lib/CoverageData";
import useReportData from "@/lib/useReportData";
import {useCallback} from "react";

export default function useBestReportData() {
  const { getReportData: getLocalReportData, setReportData: setLocalReportData } = useReportData();

  const reportId = getLocalReportData()?.id;

  const getReportData = useCallback(() => {
    const getServerReportData = async () => {
      const response = await fetch(`/api/v1/sweep?id=${reportId}`);
      const data = await response.json();
      const coverageState: CoverageState = {
        id: data.id,
        startTime: new Date(data.startTimestamp),
        buildingName: data.session.building,
        sweepers: data.sweepers.map((sweeper: any) => sweeper.user),
        regionInfo: data.data ?? {},
      };

      return coverageState;
    };

    if (reportId) {
      return getServerReportData();
    } else {
      return getLocalReportData();
    }
  }, [reportId, getLocalReportData]);

  const setReportData = useCallback((reportData: CoverageState | null) => {
    const setServerReportData = async (reportData: CoverageState | null) => {
      if (!reportData) {
        setLocalReportData(null);
        return;
      }

      const response = await fetch(`/api/v1/sweep`, {
        method: 'PUT',
        body: JSON.stringify({
          reportId,
          sweepData: reportData.regionInfo,
          startTimestamp: reportData.startTime,
        }),
      });
      const responseData = await response.json();
      return responseData;
    }

    if (reportId) {
      return setServerReportData(reportData);
    } else {
      return setLocalReportData(reportData);
    }
  }, [reportId, setLocalReportData]);

  return {
    getReportData,
    setReportData,
  };
}
