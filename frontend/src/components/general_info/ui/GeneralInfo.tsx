import Gallery from "../../gallery/ui/Gallery";
import SideBar from "../../side_bar/ui/SideBar";
import "./generalInfo.css";

export default function GeneralInfo() {
  return (
    <div className="general_info grid flex-1 min-h-0 box-border grid-cols-[minmax(0,1fr)_280px] p-[30px_10px] text-2xl">
      <Gallery />
      <SideBar />
    </div>
  );
}
