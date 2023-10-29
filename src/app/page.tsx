"use client"

import { LinkButton } from "../components/Button";
import Link from 'next/link';
import { Logo } from '../components/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import useUserData from "@/lib/useUserData";

export default function Page() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { getUserData } = useUserData();

  useEffect(() => {
    const loggedIn = !!getUserData();

    if (loggedIn) {
      setLoggedIn(true);
    }

    return () => {
      setLoggedIn(false);
    }
  }, [getUserData]);

  return (
    <main>
      <div className="flex justify-center bg-blue-950 h-[40vh]">
        <div className="mt-[30vh]">
          <Logo />
          {loggedIn && (
          <Link href="/cover/setup">
            <FontAwesomeIcon 
              icon={faCog} 
              fixedWidth
              inverse 
              className="absolute top-2 right-0 fa-2xl"
            />
          </Link>
          )}
        </div>
      </div>
      <h1 className="text-5xl text-center my-24"> Cover </h1>

      <div className="flex justify-center mt-16">
        {loggedIn ? (
          <LinkButton
            text="Start"
            href="/cover/sessions"
          />
        ) : (
          <LinkButton
            text="Setup"
            href="/cover/setup"
          />
        )}
      </div>
    </main>
  )
}
