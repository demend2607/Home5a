import "./sideBar.css";

import { useCurrentDateTime } from "../../../shared/libs/hooks/CurentDateTime";

export default function SideBar() {
  const { dayName, day, monthName, year, time } = useCurrentDateTime();

  return (
    <div className="side_bar text-[#8cc003]">
      <div className="flex flex-col gap-4 mb-10">
        <p className="numbers font-mono">{time}</p>
        <p className="text">
          {monthName} {year}
        </p>
        <p className="numbers">{day}</p>
        <p className="text">{dayName}</p>
      </div>

      <div className="weather flex flex-col gap-3 py-6">
        <p className="numbers">☀️ +22°C</p>
        <span className="text">Иконка</span>
        <p className="text">Небольшой снег</p>
      </div>
    </div>
  );
}
