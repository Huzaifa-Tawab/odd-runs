import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Event from "./pages/event/event";
import League from "./pages/leauge/league";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/:sport/:country/:league/:event_id"
          element={<Event />}
        ></Route>
        <Route path="/:sport/:country/:league" element={<League />}></Route>
        {/* <Route path="/event/:id" element={<Event />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
