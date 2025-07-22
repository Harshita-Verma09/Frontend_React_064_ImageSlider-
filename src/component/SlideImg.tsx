import React, { useEffect, useState } from "react";
import axios from "axios";


interface ImageData {
    id: number;
    webformatURL: string;
    user: string;
}


const ImageSlider: React.FC = () => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get(
                    `https://pixabay.com/api/?key=${API_KEY}&q=yellow+flowers&image_type=photo`
                );
                setImages(res.data.hits);
            } catch (err) {
                console.error(err);
            }
        };

        fetchImages();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const containerStyle: React.CSSProperties = {
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f9fafb, #e5e7eb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
    };

    const cardStyle: React.CSSProperties = {
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        textAlign: "center",
    };

    const imgStyle: React.CSSProperties = {
        width: "400px",
        height: "auto",
        borderRadius: "10px",
        marginBottom: "1rem",
    };

    const btnStyle: React.CSSProperties = {
        padding: "0.7rem 2rem",
        fontSize: "1rem",
        backgroundColor: "#6366f1",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ marginBottom: "2rem", fontSize: "2.5rem", color: "#333" }}>
                Image Viewer
            </h1>

            {images.length > 0 && (
                <div style={cardStyle}>
                    <img
                        src={images[currentIndex].webformatURL}
                        alt="Pixabay"
                        style={imgStyle}
                    />
                    <p style={{ marginBottom: "1.5rem", color: "#555" }}>
                        Uploaded by: <strong>{images[currentIndex].user}</strong>
                    </p>
                    <button
                        style={btnStyle}
                        onClick={handleNext}
                        onMouseOver={(e) =>
                            ((e.target as HTMLButtonElement).style.backgroundColor = "#4f46e5")
                        }
                        onMouseOut={(e) =>
                            ((e.target as HTMLButtonElement).style.backgroundColor = "#6366f1")
                        }
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageSlider;
