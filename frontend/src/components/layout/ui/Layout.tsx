import GeneralInfo from "../../general_info/ui/GeneralInfo";
import Header from "./Header";

import "./layout.css";

export default function Layout() {
  return (
    <div className="layout min-h-svh flex flex-col">
      <Header />
      <main className="flex flex-1 min-h-0">
        <GeneralInfo />
      </main>
    </div>
  );
}
