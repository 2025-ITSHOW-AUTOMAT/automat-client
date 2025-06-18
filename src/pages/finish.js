import React from "react";
import { useNavigate } from "react-router-dom";
import Frame from "../components/frame.js";
import FooterButton from "../components/footerButton.js";

function Finish() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <Frame>
            <div style={{
                textAlign: "center",
                width: "26.5vw",
                margin: "auto",
            }}>
                <div>
                    <h1
                        style={{
                            fontSize: "1.5vw",
                            paddingTop: "6.5vw",
                            color: "#00A4C8",
                            textAlign: "center",
                            paddingBottom: "1vw",
                            fontWeight: "600",
                            width: "26.5vw",
                            height: "7vw",
                            margin: "auto",
                            marginTop: "1.5vh",
                            marginBottom: "1.5vh",
                            backgroundColor: "white",
                            borderRadius: "1vw",
                            border: "solid #B2D4DA",
                        }}>나만의 앨범 완성!🥳</h1>
                    <div
                        onClick={handleGoHome}
                        style={{
                            width: "100%",}}
                    >
                        <FooterButton msg="홈으로 돌아가기" />
                    </div>
                </div>
            </div>
        </Frame>
    );
}

export default Finish;
