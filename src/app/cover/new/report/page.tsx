"use client"

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SimpleInput from "@/components/SimpleInput";
import Button, { HelpButton } from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { BUILDINGS } from "@/lib/buildingLayouts";
import { hourMinuteFormat } from "@/lib/DateTimeHelpers";
import { useRouter, useSearchParams } from "next/navigation";
import useUserData from "@/lib/useUserData";
import useReportData from "@/lib/useReportData";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getUserData } = useUserData();
  const { setReportData } = useReportData();

  const [sweepBuddy, setSweepBuddy] = useState<string>("");
  const [buildingName, setBuildingName] = useState<string>(BUILDINGS[0]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const isOneOff = !searchParams.get("sessionId");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStartReport = async () => {
    const userData = getUserData();
    if (!userData) {
      alert("Please setup first Cover!");
      return;
    }

    const { name } = userData;

    const sessionId = searchParams.get("sessionId");
    if (!sessionId) {
      const reportData = {
        buildingName,
        sweepers: [name, sweepBuddy],
        startTime: currentTime,
        regionInfo: {}
      };

      setReportData(reportData);

      router.push("/cover/app");
      return;
    }

    const sessionIdNum = parseInt(sessionId);

    const reportData = {
      sweepers: [name, sweepBuddy],
      startTimestamp: currentTime,
      sessionId: sessionIdNum,
    };

    const res = await fetch("/api/v1/sweep", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reportData),
    });

    if (res.status !== 200) {
      alert("Something went wrong!");
      return;
    }

    const resjson = await res.json();

    setReportData({
      id: resjson.id,
      buildingName,
      sweepers: [name, sweepBuddy],
      startTime: currentTime,
      regionInfo: {},
    });

    router.push(`/cover/app/`);
  }
  
  return (
    <main>
      <Header />
      <Container>
        <Typography type="header" className="my-4">Start <br /> your Sweep</Typography>
        <Typography type="subheader3" className="my-2">Let’s get this party <br /> started 🎉🎉</Typography>
        <div className="mt-4 flex flex-col gap-2 items-center">
          <SimpleInput
            labelText="Who are you doing sweeps with?"
            name="sweep-buddy"
            value={sweepBuddy}
            onChange={(e) => setSweepBuddy(e.target.value)}
          />

          {isOneOff && (
            <Dropdown
              labelText="Which building is this?"
              items={BUILDINGS}
              itemToString={(item) => item}
              onChange={(item) => setBuildingName(item)}
            />
          )}

          
          <h2 className="text-2xl text-center mt-4">
            Current time: {hourMinuteFormat(currentTime)}
          </h2>

          <div className="flex justify-center mt-4">
            <Button
              onClick={handleStartReport}
              text="Start"
            />
          </div>
        </div>

        <HelpButton />
      </Container>
    </main>
  );
}
