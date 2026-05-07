import GeneralInfo from "./components/general_info/ui/GeneralInfo";
// import InfoPanel from "./components/info_panel/ui/InfoPanel";

import "./App.css";

function App() {
  return (
    //  grid-template-rows: auto 1fr auto;
    <main className="flex-1 grid grid-rows-[auto_1fr_auto]">
      {/* <InfoPanel className="info_top">Акция! Новая информация. Добро пожаловать на панель. Время:</InfoPanel> */}
      <GeneralInfo />
      {/* <InfoPanel className="info_bot" duration={18}>
        мчвсамвампыва
      </InfoPanel> */}
    </main>
  );
}

export default App;
