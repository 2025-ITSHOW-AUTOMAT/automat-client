import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shoot from "./pages/shoot/shoot";
import ShootLoading from "./pages/shoot/loading";
import Photo from "./pages/shoot/photo";
import SongLoading from "./pages/song/loading";
import Sketch from "./pages/detail/sketch" 
import Home from "./pages/home";
import SketchMain from "./pages/detail/sketchMain";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/shoot" element={<Shoot />} />
                <Route path="/shoot/loading" element={<ShootLoading />} /> 
                <Route path="/shoot/photo" element={<Photo />} />
                <Route path="/song/loading" element={<SongLoading />} />
                <Route path="/sketch" element={<SketchMain />} />
                <Route path="*" element={<Shoot />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
