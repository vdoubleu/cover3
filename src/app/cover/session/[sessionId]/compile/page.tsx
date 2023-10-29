"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Header from "@/components/Header";
import Typography from "@/components/Typography";
import {CoverageState} from "@/lib/CoverageData";
import {CoverageInfoEdit, getCoverageInfoText} from "@/lib/ReportGen";
import React, {useEffect, useState} from "react";

export default function Page({ params: { sessionId } }: { params: { sessionId: string } }) {
  const [sessionData, setSessionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const sessionIdNum = Number(sessionId);

  useEffect(() => {
    const fetchSessionData = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/v1/session?id=${sessionIdNum}`)

      if (!res.ok) {
        alert("Error fetching session data");
        setIsLoading(false);
        return;
      }

      const data = await res.json();

      setSessionData(data);
      setIsLoading(false);
    }

      fetchSessionData();
  }, [sessionIdNum])

  if (Number.isNaN(sessionIdNum)) {
    return <div>Invalid session ID</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!sessionData) {
    return <div>Session not found</div>;
  }

  const reports = sessionData.sweeps.map((sweep: any, index: number) => {
    const reportData: CoverageState = {
      id: sweep.id,
      buildingName: sessionData.building,
      sweepers: sweep.sweepers.map((s: any) => s.user),
      startTime: sweep.startTimestamp,
      regionInfo: sweep.data
    };

    return (
      <React.Fragment key={index}>
        <pre className="mt-8">
          <CoverageInfoEdit
            reportData={reportData} 
            endTimestamp={sweep.endTimestamp} 
            hideEdit={true}
          />
        </pre>
        <div className="mb-4">
          <Button
            text="Copy"
            onClick={() => {
              navigator.clipboard.writeText(getCoverageInfoText(reportData, sweep.endTimestamp));
            }}
          />
        </div>
        {index !== sessionData.sweeps.length - 1 &&  (<hr />)}
      </React.Fragment>
    );
  });

  return (
    <main>
      <Header />
      <Container>
        <Typography type="header" className="text-center mt-4">Report</Typography>

        <div className="mt-8">
          {reports}
        </div>
      </Container>
    </main>
  );
}
