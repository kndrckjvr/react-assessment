import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DeleteModal from "./components/note/DeleteModal";

const App = () => {
  return (
    <div className="container mx-auto flex flex-row">
      <Sidebar></Sidebar>
      <div className="container basis-2/4 border-r-[1px] border-r-slate-700">
        <Header></Header>
        <Outlet></Outlet>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
      <DeleteModal />
    </div>
  );
};

export default App;
