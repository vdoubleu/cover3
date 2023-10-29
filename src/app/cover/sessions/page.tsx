"use client"

import Header from "@/components/Header";
import Container from "@/components/Container";
import SessionCard from "./SessionCard";
import Typography from "@/components/Typography";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";

import type { Session } from "@/app/shared/types";

export default function Page() {
  const [sessionData, setSessionData] = useState<Session[] | null>(null);

  useEffect(() => {

    fetch("/api/v1/sessions", {
      next: {
        revalidate: 1,
      }
    }).then((response) => response.json())
      .then((data) => setSessionData(
        data.map((session: any) => ({
          id: session.id,
          lead: session.lead,
          startDateTime: new Date(session.startTimestamp),
          building: session.building,
          sweeps: session.sweeps.map((sweep: any) => ({
            sweeperNames: sweep.sweepers.map((sweeper: any) => sweeper.user),
            startDateTime: new Date(sweep.startTimestamp),
          }))
      }))));
  }, []);

  return (
    <main>
      <Header actionButtonUrl="/cover/new" actionButtonText="Add" actionButtonIcon={faPlus} />
      <Container>
        <Typography type="header" className="text-center my-4">Active Sessions</Typography>
        {sessionData && (<div>
          {sessionData.map((session: Session) => (
            <div key={session.id} className="col-12 col-md-4">
              <SessionCard
                key={session.id}
                id={session.id}
                lead={session.lead}
                startDateTime={session.startDateTime}
                building={session.building}
                sweeps={session.sweeps}
              />
            </div>
          ))}
        </div>)}
        {!sessionData && (<div>
          Loading...
        </div>)}
        {sessionData && sessionData.length === 0 && (<div>
          No currently active sessions. Start a new one by clicking the button on the top right.
        </div>)}
      </Container>
    </main>
  );
}
