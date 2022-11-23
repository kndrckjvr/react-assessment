import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Home from "./Home";
import NoteView from "./note/NoteView";
import NotFound from "./NotFound";
import Search from "./Search";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />}></Route>
          <Route path="/view/:id" element={<NoteView />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
