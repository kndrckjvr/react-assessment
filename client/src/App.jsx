import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";

let App = () => {
  return (
    <div className="container mx-auto flex flex-row">
      <Sidebar></Sidebar>
      <div></div>
      <Outlet></Outlet>
    </div>
  );
};

export default App;
