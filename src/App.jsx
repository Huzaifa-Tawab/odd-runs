import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import LeagueTable from "./pages/leauge/leaguetable";
import Event from "./pages/home/event/event";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/test/:id" element={<LeagueTable />}></Route>
        <Route path="/event/:id" element={<Event />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
