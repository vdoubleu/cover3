"use client";

import Header from "@/components/Header"
import Container from "@/components/Container";
import { useState, useEffect, useCallback } from "react";
import { dateOnlyFormat, roundedHourOnlyFormat } from "@/lib/DateTimeHelpers";
import SessionCard from "./sessionCard";
import { useRouter } from "next/navigation";
import Typography from "@/components/Typography";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import Spinner from "@/components/Spinner";

export default function Page({ params: { sessionId } }: { params: { sessionId: string } }) {
  const router = useRouter();
  const [sessionData, setSessionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sessionIdNum = Number(sessionId);

  const fetchSessionData = useCallback(async () => {
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
  }, [sessionIdNum]);

  useEffect(() => {
    fetchSessionData();
  }, [sessionIdNum, fetchSessionData]);

  if (Number.isNaN(sessionIdNum)) {
    return <div>Invalid Session ID</div>
  }

  if (isLoading ) {
    return (
      <main>
        <Header />
        <div className="mt-16 flex justify-center">
          <Spinner />
        </div>
      </main>
    );
  }

  if (!sessionData) {
    return (<div>session not found</div>);
  }

  const deleteSweep = async (sweepId: number, time: string, sweepers: string[]) => {
    const confirmed = confirm(`Are you sure you want to delete the sweep at ${time} with ${sweepers[0]} and ${sweepers[1]}?`);

    if (!confirmed) {
      return;
    }

    const res = await fetch(`/api/v1/sweep?id=${sweepId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Error deleting sweep");
      return;
    }

    fetchSessionData();
  }

  return (
    <main>
      <Header />
      <Container>
        <Typography type="header" className="mt-4">{dateOnlyFormat(new Date(sessionData.startTimestamp))}</Typography>
        <Typography type="header" className="my-1">{sessionData.building}</Typography>
        <Typography type="subheader3" className="my-1">Lead: {sessionData.lead}</Typography>

        <div className="mb-8" >
          {sessionData.sweeps.map((sweep: any) => {
            const timeString = roundedHourOnlyFormat(new Date(sweep.startTimestamp));
            const sweepers = sweep.sweepers.map((sweeper: any) => sweeper.user);

            return (
              <div className="flex" key={sweep.id} onClick={() => deleteSweep(sweep.id, timeString, sweepers)}>
                <FontAwesomeIcon icon={faCircleXmark} className="mr-2 mt-1" fixedWidth/>
                <Typography type="body">
                  {timeString}: {sweepers.join(", ")}
                </Typography>
              </div>
            );
          })}
        </div>
        <div>
          <SessionCard
            title="Start your sweep"
            subtitle="Let's get this started!"
            onClick={() => {
              router.push(`/cover/new/report?sessionId=${sessionId}`);
            }}
          />
          <SessionCard
            title="Compile your report"
            subtitle="Send yourself the report and wrap everything up"
            onClick={() => {
              router.push(`/cover/session/${sessionId}/compile`);
            }}
          />
          <SessionCard
            title="Delete this session"
            subtitle="This will delete the session and all associated data"
            onClick={async () => {
              if (!confirm("Are you sure you want to delete this session?")) {
                return;
              }

              const res = await fetch(`/api/v1/session?id=${sessionIdNum}`, {
                method: "DELETE",
              });

              if (!res.ok) {
                alert("Error deleting session");
                return;
              }

              router.push("/cover/sessions");
            }}
          />
        </div>
      </Container>
    </main>
  );
}
