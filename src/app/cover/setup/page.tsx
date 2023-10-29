"use client"

import Button from "@/components/Button";
import Header from "@/components/Header";
import SimpleInput from "@/components/SimpleInput";
import Container from "@/components/Container";
import Typography from "@/components/Typography";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserData from "@/lib/useUserData";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { setUserData, getUserData } = useUserData();

  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
    }
  }, []);

  const handleDone = () => {
    setUserData({
      name,
      email,
    });

    router.push("/");
  };

  return (
    <main>
      <Header />
      <Container>
        <Typography type="header" className="mt-4"> Enter Your Information </Typography>
        <Typography type="subheader3"> You can always change <br /> this later in settings</Typography>
        <div className="mt-4 flex flex-col gap-2 items-center justify-center">
          <SimpleInput
            labelText="What is your name?"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />

          <SimpleInput
            labelText="What is your email?"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex justify-center mt-16">
            <Button 
              onClick={handleDone}
              text="Done"
              disabled={!name || !email}
            />
          </div>
        </div>
      </Container>
    </main>
  )
}

