"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Header from "@/components/Header";
import Typography from "@/components/Typography";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <main>
      <Header hasBackButton={false} />
      <Container>
        <Typography type="header" className="text-center mt-4"> Done!! 🎉🎉 </Typography>
        <Typography type="basic" className="mt-4"> Congrats!! You finished coverage!! Pat yourself on the back and relax.
You deserve it. </Typography>

        <div className="done-button flex justify-center mt-16">
            <Button
              text="Done"
              onClick={() => router.push("/")}
              disabled={false}
            />
        </div>
      </Container>
    </main>
  );
}
