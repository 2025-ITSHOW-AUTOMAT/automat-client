import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shoot from "./pages/shoot/shoot";
import ShootLoading from "./pages/shoot/loading";
import Photo from "./pages/shoot/photo";
import SongLoading from "./pages/song/loading";
import Sketch from "./pages/detail/sketch" 
import Home from "./pages/home";
import Description from "./pages/detail/description";
import SongDetail from "./pages/songDetail";
import Finish from "./pages/finish";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/shoot" element={<Shoot />} />
                <Route path="/shoot/loading" element={<ShootLoading />} /> 
                <Route path="/shoot/photo" element={<Photo />} />
                <Route path="/song/loading" element={<SongLoading />} />
                <Route path="/sketch" element={<Sketch />} />
                <Route path="/description" element={<Description />} />
                <Route path='/song/detail' element={<SongDetail/>}/>
                <Route path='/finish' element={<Finish/>}/>
                <Route path="*" element={<Shoot />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
