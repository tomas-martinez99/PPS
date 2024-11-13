import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./mediaList.css";
import { useNavigate } from "react-router-dom";
import Card from "./card/Card";
import CardEpisode from "./card/CardEpisode";
import { getFavorites } from "../../services/FavoritesService";

const MediaList = ({ movies, series, ep, favorites }) => {
  const [combinedByGenre, setCombinedByGenre] = useState({});
  const [soloParaTi, setSoloParaTi] = useState([]);
  const [miLista, setMiLista] = useState([]);
  const [continuarViendo, setContinuarViendo] = useState([]);

  const [url, setUrl] = useState(window.location.pathname);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const result = await getFavorites();
        setMiLista(result);
        console.log("favorites", result);
      } catch (error) {
        setError(error);
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchFavorites();
  }, []);

  const combinedGenres = () => {
    const combined = {};

    if (soloParaTi.length > 0) {
      combined["Solo para ti"] = soloParaTi;
    }

    if (continuarViendo.length > 0) {
      combined["Continuar viendo"] = continuarViendo;
    }

    if (miLista.length > 0) {
      combined["Mi lista"] = miLista;
    }

    const addByGenre = (items, type) => {
      if (!items || items.length === 0) return;

      items.forEach((item) => {
        const genres = item.genres || [];
        genres.forEach((genre) => {
          if (!combined[genre]) {
            combined[genre] = [];
          }
          combined[genre].push({ ...item, type });
        });
      });
    };

    addByGenre(movies, 0); // 0 para películas
    addByGenre(series, 1); // 1 para series

    setCombinedByGenre(combined);
    console.log(combined);
  };

  useEffect(() => {
    combinedGenres();
  }, [movies, series]); // Recalcular cuando cambien las películas o series

  const hasMovies = movies && movies.length > 0;
  const hasSeries = series && series.length > 0;

  return (
    <div>
      {/* Sliders por género o lista única para pre-repro */}
      {ep ? (
        <div className="media-container">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={5}
            navigation
            loop={false}
          >
            {ep.map((item) => (
              <SwiperSlide key={item.id}>
                <CardEpisode item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p></p>
      )}
      {url.includes("pre-repro") && !ep ? (
        <div className="media-container">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={6}
            navigation
            loop={false}
          >
            {/* Combinar películas y series en una sola lista */}
            {hasMovies || hasSeries ? (
              [...(hasMovies ? movies : []), ...(hasSeries ? series : [])].map(
                (item) => (
                  <SwiperSlide key={item.id}>
                    <Card item={item} />
                  </SwiperSlide>
                )
              )
            ) : (
              <p></p>
            )}
          </Swiper>
        </div>
      ) : Object.keys(combinedByGenre).length > 0 ? (
        Object.keys(combinedByGenre).map((genre) => (
          <div key={genre} className="media-container">
            <h5>{genre}</h5>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={6}
              navigation
              loop={false}
            >
              {combinedByGenre[genre].map((item) => (
                <SwiperSlide key={item.id} className="mt-3">
                  <Card item={item} />
                  <p style={{ textAlign: "center", color: "#d3d3d3" }}>
                    {item.title}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))
      ) : favorites ? (
        <div className="media-container">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={6}
            navigation
            loop={false}
          >
            {favorites.map((item) => (
              <SwiperSlide key={item.id}>
                <Card item={item} />
                <p style={{ textAlign: "center", color: "#d3d3d3" }}>
                  {item.title}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default MediaList;
