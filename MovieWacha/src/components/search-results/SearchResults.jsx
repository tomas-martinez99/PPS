import { useEffect, useState } from "react";

import { search } from "../../services/movieServices";
import { useParams } from "react-router-dom";
import Card from "../shared/card/Card";
import "./searchResults.css";

const SearchResults = () => {
  const { searchString } = useParams();

  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        console.log(searchString);
        const result = await search(searchString);
        setResult(result);
        console.log(result);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchSearch();
  }, [searchString]);

  return (
    <div className="search-container">
      {result.length > 0 ? (
        <div className="results-container">
          {result.map((item, index) => (
            <div>
              <Card key={index} item={item} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          No se encontró la película o serie que buscas, pero aquí hay algunas
          opciones similares:
        </div>
      )}
    </div>
  );
};
export default SearchResults;
