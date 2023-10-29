"use client"

import {LinkButton} from "@/components/Button";
import Header from "@/components/Header";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("sessionId");

  return (
    <main>
      <Header hasBackButton={false} />
      <Container>
        <Typography type="header" className="my-4">Start your <br /> Sweep Now?</Typography>
        <Typography type="subheader3">Do you want to start <br /> your sweep now?</Typography>

        <div className="flex flex-col items-center gap-4 mt-32">
          <LinkButton
            text="Start"
            href={`/cover/new/report?sessionId=${sessionId}`}
          />
          <LinkButton
            text="Home"
            href="/"
            type="secondary"
          />
        </div>
      </Container>
    </main>
  );
}
