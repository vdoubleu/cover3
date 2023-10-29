"use client"

import Header from "../../../components/Header";
import Card from "../../../components/Card";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 pt-16">
        <Card
          onClick={() => router.push("/cover/new/session")}
          title="Create new Session"
          body="Create a new session to group together reports from multiple sweeps and send them in one go. Others can also join your session and add sweep reports."
        />
        <Card
          onClick={() => router.push("/cover/new/report")}
          title="Create One-Off Report"
          body="Create a new one-off report. No data is stored and you can get the whole thing right away. We let you do all the heavy lifting so that you have full control."
        />
      </div>
    </div>
  );
}
