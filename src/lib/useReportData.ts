"use client";

import { CoverageState } from "./CoverageData";

export default function useReportData() {
  function getReportData() {
    if (typeof window === "undefined") {
      return null;
    }

    const reportData = localStorage.getItem('reportData');

    if (!reportData) {
      return null;
    }

    const reportDataJson: CoverageState = JSON.parse(reportData);

    return reportDataJson;
  }

  function setReportData(reportData: CoverageState | null) {
    if (typeof window === "undefined") {
      return;
    }

    if (!reportData) {
      localStorage.removeItem('reportData');
      return;
    }

    localStorage.setItem('reportData', JSON.stringify(reportData));
  }

  return {
    getReportData,
    setReportData,
  };
}
