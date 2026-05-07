import { useCurrentDateTime } from "../lib/CurentDateTime";

export default function CurrentDateTime() {
  const { dayName, day, monthName, year, time } = useCurrentDateTime();

  return (
    <div className="flex flex-col gap-2 mb-6">
      <p className="numbers font-mono text-[50px]!">{time}</p>
      <p className="text">
        {monthName} {year}
      </p>
      <p className="numbers">{day}</p>
      <p className="text">{dayName}</p>
    </div>
  );
}
