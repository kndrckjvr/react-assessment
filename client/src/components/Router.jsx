import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Home from "./Home";

let Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
