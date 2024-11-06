import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services/homeServices";
import { useRef } from "react";

const WatchMovie = () => {
  const { movieId } = useParams();
  const [error, setError] = useState(null);
  const [movieById, setMovieById] = useState();
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        const result = await getMovieById(movieId);
        setMovieById(result);

        const fileName = result.movieVideo.fileName;

        const response = await fetch(
          `https://localhost:7289/api/media/protected/${fileName}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch the video");
        }

        const videoBlob = await response.blob();
        const videoUrl = URL.createObjectURL(videoBlob);

        if (videoRef.current) {
          videoRef.current.src = videoUrl;
        }
      } catch (error) {
        setError(error);
        console.error("Error loading video:", error);
      }
    };

    fetchData();
  }, [movieId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!movieById) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Ver Película: {movieById.title}</h1>
      <video ref={videoRef} controls width="100%">
        Tu navegador no soporta la etiqueta de video.
      </video>
    </div>
  );
};

export default WatchMovie;
