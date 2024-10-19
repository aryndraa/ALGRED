import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Guidebooks } from "./pages/Guidebook";
import { News } from "./pages/News";
import { Navbar } from "./components/templates/navbar/Navbar";
import { Header } from "./components/templates/header/Header";
import { Control } from "./pages/Control";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/control" element={<Control />} />
          <Route path="/guidebooks" element={<Guidebooks />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
