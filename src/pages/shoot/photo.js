import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PhotoCard from "../../components/photoCard";
import Frame from "../../components/frame.js";
import Header from "../../components/home/header.js";
import FooterButton from "../../components/footerButton.js";

function Photo() {
    const location = useLocation();
    const navigate = useNavigate();
    const { saved_paths, song_prompt, translate_prompts } = location.state || {};

    const handleNext = () => {
        navigate("/song/loading", { state: { song_prompt, saved_paths } });
    };

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        padding: "2vw",
        paddingTop: "0",
    };

    return (
        <Frame>
            <Header />
            <div style={containerStyle}>
                <PhotoCard
                    photo={saved_paths}
                    song_prompts={translate_prompts}
                />
                <div style={{ width : "100%"}} onClick={handleNext}>
                    <FooterButton
                        msg="이 사진들로 노래 만들기"
                    />
                </div>
            </div>
        </Frame>
    );
}

export default Photo;
