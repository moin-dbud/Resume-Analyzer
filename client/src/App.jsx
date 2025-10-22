import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./components/Upload";
import History from "./pages/History";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/history" element={<History/>}/>
        <Route path="/about-us" element={<AboutUs/>} />
      </Routes>
    </>
  );
}

export default App;
