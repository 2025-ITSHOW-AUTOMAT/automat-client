import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PhotoCard from "../../components/photoCard";
import Frame from "../../components/frame.js";
import Header from "../../components/home/header.js";

function Photo() {
    const location = useLocation();
    const navigate = useNavigate();
    const { saved_paths, song_prompt, translate_prompt } = location.state || {};

    const handleNext = () => {
        navigate("/song/loading", { state: { song_prompt, saved_paths } });
    };

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
    };

    const buttonStyle = {
        marginTop: "2rem",
        padding: "0.75rem 1.5rem",
        backgroundColor: "#3b82f6",
        color: "white",
        borderRadius: "9999px",
        fontSize: "1.125rem",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    };

    const buttonHoverStyle = {
        backgroundColor: "#2563eb",
    };

    return (
        <Frame>
            <Header />
            <div style={containerStyle}>
                <PhotoCard
                    photo={saved_paths}
                    translate_prompt={translate_prompt}
                />
          
          
                <button
                    onClick={handleNext}
                    style={buttonStyle}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
                >
                    다음
                </button>
            </div>
        </Frame>
    );
}

export default Photo;
