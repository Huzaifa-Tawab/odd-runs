import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import LeagueTable from "./pages/leauge/leaguetable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/test" element={<LeagueTable />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
