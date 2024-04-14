"use client"

import { useState } from "react";
import SimpleInput from "@/components/SimpleInput";
import Header from "@/components/Header";
import Button, { HelpButton } from "@/components/Button";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import Dropdown from "@/components/Dropdown";
import { BUILDINGS } from "@/lib/buildingLayouts";
import { useRouter } from "next/navigation";
import useUserData from "@/lib/useUserData";
import Spinner from "@/components/Spinner";

export default function Page() {
  const { getUserData } = useUserData();
  const router = useRouter();
  const [buildingName, setBuildingName] = useState(BUILDINGS[0]);
  const [sessionPassword, setSessionPassword] = useState("");

  const [sending, setSending] = useState(false);
  
  const handleCreateSession = async () => {
    if (sending) return;

    setSending(true);

    const userData = getUserData();
    if (!userData) {
      alert("Please first setup Cover");
      return;
    }

    const { name } = userData;

    const body = {
      building: buildingName,
      lead: name
    };

    const res = await fetch("/api/v1/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    setSending(false);

    if (!res.ok) {
      alert("Something went wrong");
      return;
    }

    const resJson = await res.json();
    const { id: sessionId } = resJson;

    router.push(`/cover/new/session/confirm?sessionId=${sessionId}`);
  }

  if (sending) {
    return (
      <main>
        <Header />
        <div className="mt-16 flex justify-center">
          <Spinner />
        </div>
      </main>
    );
  }

  return (
    <main>
      <Header />
      <Container>
        <Typography type="header" className="mt-4">Create <br /> a Session</Typography>
        <Typography type="subheader3" className="mt-2">Others can add sweeps to this session to be grouped into a report</Typography>
        <div className="flex items-center justify-center mt-4 flex-col gap-4">
          <Dropdown
            labelText="Which building is this?"
            items={BUILDINGS}
            itemToString={(item) => item}
            onChange={(item) => setBuildingName(item)}
          />

          {/*
          <SimpleInput
            labelText="Enter session password"
            name="sessionPassword"
            value={sessionPassword}
            onChange={(e) => setSessionPassword(e.target.value)}
          />*/}


          <div className="mt-6">
            <Button
              onClick={handleCreateSession}
              text="Create"
            />
          </div>
        </div>

        <HelpButton />
      </Container>
    </main>
  );
}
