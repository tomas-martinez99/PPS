import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieById } from "../../services/homeServices";
import { useRef } from "react";
import { AuthenticationContext } from "../../services/Authentication.context";

const WatchMovie = () => {
  const { user } = useContext(AuthenticationContext);

  const { movieId } = useParams();
  const [error, setError] = useState(null);
  const [movieById, setMovieById] = useState();
  const videoRef = useRef(null);

  const userState = user?.subscriptionState;

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

  if (!movieId) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {!user && (
        <div>
          <p>
            Debes estar logueado para ver esta Película{" "}
            <Link to={"/login"}>Click aquí</Link> para loguearte
          </p>
        </div>
      )}

      {user && userState != "Active" && (
        <div>
          <p>
            Debes suscribirte para ver esta Película{" "}
            <Link to={"/selectPlan"}>Click aquí </Link> para suscribirte
          </p>
        </div>
      )}

      {user && userState == "Active" && (
        <>
          <h1>Ver Película: {movieId.title}</h1>
          <video ref={videoRef} controls width="100%">
            Tu navegador no soporta la etiqueta de video.
          </video>
        </>
      )}
    </div>
  );
};

export default WatchMovie;
