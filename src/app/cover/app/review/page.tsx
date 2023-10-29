"use client";

import Container from "@/components/Container";
import Header from "@/components/Header";
import Typography from "@/components/Typography";
import useUserData from "@/lib/useUserData";
import React, { useState, useEffect } from "react";
import useBestReportData from "../useBestReportData";
import {useRouter} from "next/navigation";
import {CoverageState} from "@/lib/CoverageData";
import { getCoverageInfoText, CoverageInfoEdit } from "@/lib/ReportGen";
import Button from "@/components/Button";

export default function Page() {
  const [endTime, setEndTime] = useState(new Date());
  const [reportData, setReportData] = useState<CoverageState | null>(null);
  const [hasSetClipboard, setHasSetClipboard] = useState(false);
  const [hasEmailed, setHasEmailed] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  const { getUserData } = useUserData();
  const { getReportData, setReportData: setReportDataStorage } = useBestReportData();
  const router = useRouter();

  const userData = getUserData();

  useEffect(() => {
      const timer = setTimeout(() => {
          setEndTime(new Date());
      }, 1000);
      return () => clearTimeout(timer);
  }, [endTime]);

  useEffect(() => {
    async function asyncGet() {
      const reportData = await getReportData();
      setReportData(reportData);
    }

    asyncGet();
  }, [])

  if (!reportData) {
    return <div>Loading... if this doesn't load, there may be an error</div>;
  }

  const isOneOffReport = !reportData.id;

  const coverageInfoText = getCoverageInfoText(reportData, endTime);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverageInfoText);
    setHasSetClipboard(true);
  }

  const sendEmail = async () => {
    if (!userData) {
      alert("You must be logged in to send an email");
      return;
    }

    const confirmation = window.confirm("Are you sure you want to email this to: " + userData.email + "?");

    if (!confirmation) {
      return;
    }

    if (process.env.NEXT_PUBLIC_DEV) {
        console.log("Email sent!");
        console.log("Email sent to: " + userData.email);
        console.log("Email body: " + coverageInfoText);
    } else {
      setEmailSending(true);
      fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: process.env.NEXT_PUBLIC_SERVICE_ID,
          template_id: process.env.NEXT_PUBLIC_TEMPLATE_ID,
          user_id: process.env.NEXT_PUBLIC_USER_ID,
          accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
          template_params: {
            "to_email": userData.email,
            "message": coverageInfoText,
          },
        }),
      }).then((response) => {
        if (response.status === 200) {
          console.log("Email sent!");
          setEmailSending(false);
        } else {
          console.log("Email failed to send.");
          setEmailSending(false);
          alert("Email failed to send. Please contact VW for help.");
        }
      }).catch((error) => {
        console.log("Email failed to send. Error: " + error);
        setEmailSending(false);
        alert("Email failed to send. Please contact VW for help.");
      });
    }

    setHasEmailed(true);
  }

  const finishCoverage = async () => {
    if (reportData.id) {
      const res = await fetch("/api/v1/sweep", {
        method: "PUT",
        body: JSON.stringify({
          reportId: reportData.id,
          endTimestamp: endTime,
        }),
      });

      if (res.status !== 200) {
        alert("Error finishing coverage. Please contact VW for help.");
      }
    }

    const a = await fetch("/api/v1/analytics", {
      method: "POST",
      body: JSON.stringify({
        building: reportData.buildingName,
        email: userData?.email,
      })
    });

    console.log(a.status);

    setReportDataStorage(null);
    router.push("/cover/app/done");
  }

  return (
    <main>
      <Header />
      <Container>
        <Typography type="header" className="text-center mt-4">Review</Typography>

        <pre className="mt-8">
          <CoverageInfoEdit reportData={reportData} endTimestamp={endTime} />
        </pre>

        {(isOneOffReport) && (<div className="flex justify-between mt-8">
            <Button
              onClick={copyToClipboard}
              text="Copy"
              disabled={hasSetClipboard}
            />
            <Button
              text={emailSending ? "..." : "Email"}
              onClick={sendEmail}
              disabled={hasEmailed}
            />
          </div>)
        }

        <div className="my-8 flex justify-center">
          <Button
            text="Finish"
            onClick={finishCoverage}
            disabled={isOneOffReport && (!hasSetClipboard && !hasEmailed)}
          />
        </div>
      </Container>
    </main>
  );
}
