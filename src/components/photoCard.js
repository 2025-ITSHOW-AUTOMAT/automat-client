import React from 'react';

const PhotoCard = ({ photo = [], translate_prompt = [] }) => {
    const cards = photo.map((img, idx) => ({
        id: idx + 1,
        content: translate_prompt[idx] || "프롬프트 없음",
        image: img,
    }));

    const containerStyle = {
        width: "24vw",
        height: "20vh",
        marginBottom: "3vh",
        backgroundColor: "white",
        border: "1px solid #B2D4DA",
        borderRadius: "2vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        overflow: "hidden",
        transition: "all 0.3s ease",
        padding: "2.5vh",
    };

    const imageStyle = {
        width: "8vw",
        height: "17vh",
        objectFit: "cover",
    };

    const contentStyle = {
        width: "12vw",
        height: "17vh",
        flex: 1,
        display: "flex",
        // justifyContent: "space-between",
        textAlign: "center",
        fontSize: "1.8vh",
        color: "#333",
    };

    return (
        <div style={{
            position: "relative"
        }}>
            <div style={{
                height: "85vh"
            }}>
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        style={{
                            position: "sticky",
                            top: 30,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: index + 1,
                        }}
                    >
                        <div
                            style={{
                                ...containerStyle,
                                // marginTop: `${index * 3}vh`,
                            }}
                        >
                            <div style={{
                                border: "1px solid rgba(178, 212, 218, 0.2)",
                                borderRadius: "1vh",
                                backgroundColor: "rgba(208, 230, 236, 0.1)",
                                padding: "1vh",
                            }}>
                                <img src={card.image} alt={`card-${card.id}`} style={imageStyle} />
                            </div>
                            <div style={{
                                marginLeft: "1.5vw",
                                border: "1px solid rgba(178, 212, 218, 0.2)",
                                borderRadius: "1vh",
                                backgroundColor: "rgba(208, 230, 236, 0.1)",
                                padding: "1vh",
                                width: "12vw",
                                height: "17vh",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}>
                                <div style={{
                                    ...contentStyle,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                }}>
                                    <p style={{
                                        fontSize: "2vh", 
                                        fontWeight: "bold",
                                        marginLeft: "1vw",
                                        marginBottom: "1vh",
                                        color: "#00A4C8",
                                    }}>
                                        {String(card.id).padStart(2, '0')}
                                    </p>
                                    <hr style={{
                                        width: "90%",
                                        borderTop: "1px solid #D6EDF3",
                                    }} />
                                    <p style={{
                                        marginLeft: "1vw",
                                        marginTop: "1vh",
                                        fontSize: "1.5vh",
                                        color: "#1C1C1C",
                                    }}>{card.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoCard;
