import Gallery from "../../gallery/ui/Gallery";
import SideBar from "../../side_bar/ui/SideBar";
import "./generalInfo.css";

export default function GeneralInfo() {
  return (
    <div className="general_info grid grid-cols-[1fr_280px] flex-1 p-[30px_10px] text-2xl">
      <Gallery />
      <SideBar />
    </div>
  );
}
