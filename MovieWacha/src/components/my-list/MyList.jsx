import { useEffect, useState } from "react";
import MediaList from "../shared/MediaList";
import { getFavorites } from "../../services/FavoritesService";

const MyList = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const result = await getFavorites();
        setFavorites(result);
        console.log("favorites", result);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <>
      {favorites?.length > 0 ? (
        <MediaList favorites={favorites} />
      ) : (
        <p className="m-4">No tienes nada en tu lista de favoritos.</p>
      )}
    </>
  );
};

export default MyList;
