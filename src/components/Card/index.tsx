"use client";

import Typography from "@/components/Typography";

export type CardProps = {
  title?: string;
  subtitle?: string;
  body?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function Card({
  title,
  subtitle,
  body,
  children,
  onClick,
}: CardProps) {
  return (
    <div 
      className="border rounded-lg drop-shadow p-3 mb-2 active:drop-shadow-none active:shadow-inner active:bg-slate-200 cursor-pointer"
      onClick={onClick}
    >
      <div>
        <Typography type="subheader"> {title} </Typography>
        <Typography type="subheader2">{subtitle}</Typography>
        <Typography type="body">{ body } </Typography>
        { children }
      </div>
    </div>
  );
}
