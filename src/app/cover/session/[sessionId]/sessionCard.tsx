"use client";

import Card from "@/components/Card";

export default function SessionCard({ title, subtitle, onClick }: { title: string, subtitle: string, onClick: () => void }) {
  return (
    <Card
      title={title}
      body={subtitle}
      onClick={onClick}
    />
  )
}
