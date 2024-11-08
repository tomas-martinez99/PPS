import { useNavigate } from "react-router-dom";
import "./cardEpisode.css";

const CardEpisode = ({ item }) => {
  const navigate = useNavigate();

  console.log("item", item);
  const handleWatchEp = (item) => {
    navigate(`/watch-serie/${item.id}`);
  };

  return (
    <div className="ep-card border border-primary rounded p-3">
      <div className="image-container">
        <h5>{item.title}</h5>
        <button
          className="view-button btn btn-primary mt-2"
          onClick={() => handleWatchEp(item)}
        >
          Ver
        </button>
      </div>
    </div>
  );
};

export default CardEpisode;
