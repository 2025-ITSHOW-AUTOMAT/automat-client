import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shoot from "./pages/shoot/shoot";
import Loading from "./pages/song/loading";
import Song from "./pages/song/song";
import Sketch from "./pages/detail/sketch" 

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/shoot" element={<Shoot />} />
                <Route path="/loading" element={<Loading />} />
                <Route path="/song" element={<Song />} />
                <Route path="/sketch" element={<Sketch />} />
                <Route path="*" element={<Shoot />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
