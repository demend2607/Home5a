import "./sideBar.css";

import CurrentDateTime from "./CurrentDateTime";
import Weather from "./Weather";
export default function SideBar() {
  return (
    <div className="side_bar text-[#8cc003]">
      <CurrentDateTime />
      <Weather />
    </div>
  );
}
