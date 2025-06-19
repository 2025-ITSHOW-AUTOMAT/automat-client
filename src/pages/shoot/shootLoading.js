// ShootLoading.js
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Frame from "../../components/frame";
import SaveLoading from "./saveLoading";
import PromptLoading from "./promptLoading";

function ShootLoading() {
    const location = useLocation();
    const navigate = useNavigate();
    const capturedImages = location.state?.capturedImages;

    const [savedPaths, setSavedPaths] = useState([]);
    const [step, setStep] = useState("save");

    const handleSaveComplete = (paths) => {
        setSavedPaths(paths);
        setStep("prompt");
    };

    const handleAnalyzeComplete = (prompts, song) => {
    
        navigate("/shoot/photo", {
            state: {
                saved_paths: savedPaths,
                song_prompts: prompts,
                song_prompt: song
            },
        });
    };

    return (
        <Frame>
            {step === "save" ? (
                <SaveLoading capturedImages={capturedImages} onSaveComplete={handleSaveComplete} />
            ) : (
                <PromptLoading savedPaths={savedPaths} onAnalyzeComplete={handleAnalyzeComplete} />
            )}
        </Frame>
    );
}

export default ShootLoading;
