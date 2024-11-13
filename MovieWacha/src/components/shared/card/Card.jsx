import { useNavigate } from "react-router-dom";

const Card = ({ item }) => {
  const navigate = useNavigate();

  const handlerMovieCard = (movie) => {
    navigate(`/pre-repro-movie/${movie.id}`);
  };

  const handlerSerieCard = (serie) => {
    navigate(`/pre-repro-serie/${serie.id}`);
  };
  return (
    <div className="movie-card">
      <div className="image-container">
        <img
          src={
            item.movieCoverUrl
              ? item.movieCoverUrl
              : item.serieCoverUrl
              ? item.serieCoverUrl
              : item.coverImageUrl
              ? item.coverImageUrl
              : item.coverImage
              ? item.coverImage
              : null
          }
          alt={item.title}
          onError={(e) => (e.target.src = "/no-image.png")}
        />
        {item.type === 0 ? (
          <button
            className="view-button"
            onClick={() => handlerMovieCard(item)}
          >
            Ver Película
          </button>
        ) : (
          <button
            className="view-button"
            onClick={() => handlerSerieCard(item)}
          >
            Ver Serie
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
