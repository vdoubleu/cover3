import { roundedHourOnlyFormat, dateOnlyFormat } from "../../../lib/DateTimeHelpers";
import Card from "../../../components/Card";
import Link from "next/link";

export type SessionCardProps = {
  id: number;
  lead: string;
  startDateTime: Date;
  building: string;
  sweeps: {
    sweeperNames: string[];
    startDateTime: Date;
  }[];
}; 

export default function SessionCard({
  id,
  lead,
  startDateTime,
  building,
  sweeps,
}: SessionCardProps) {
  const sweepList = sweeps.map((sweepData) => (
    <li key={sweepData.startDateTime.toISOString()} className="grid grid-cols-4 grid-rows-1">
      <div> {roundedHourOnlyFormat(sweepData.startDateTime)}: </div>
      <div className="col-span-3"> {sweepData.sweeperNames.join(", ")} </div>
    </li>
  ));

  return (
    <Link href={`/cover/session/${id}`}>
      <Card
        title={dateOnlyFormat(startDateTime) + " - " + building}
        subtitle={"Lead: " + lead}
      >
          <ul className="text-lg">{sweepList}</ul>
      </Card>
    </Link>
  );
}
