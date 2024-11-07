import React from "react";
import useGetMovie from "../../../../hooks/movies/useGetMovie";
import { useRef } from "react";
import { useEffect } from "react";
import useUpdateMovie from "../../../../hooks/movies/useUpdateMovie";
import { Alert } from "react-bootstrap";

const ModalUpdateMovie = ({ id, onClose, onUpdate }) => {
  const [movie, isMovieLoading, isMovieError] = useGetMovie(id);
  const [updatedMovie, isUpdatedMovieLoading, isUpdatedMovieError, updateMovie] = useUpdateMovie();
  const titleInputRef = useRef(null);
  const durationInputRef = useRef(null);
  const synopsisInputRef = useRef(null);
  const languageInputRef = useRef(null);
  const genresInputRef = useRef(null);
  const yearInputRef = useRef(null);
  const directorInputRef = useRef(null);
  const showCaseImageUrlInputRef = useRef(null);
  const movieCoverUrlInputRef = useRef(null);

  //Enviar la pelicula modificada al componente padre
  useEffect(() => {
    if (updatedMovie) {
        const title = titleInputRef.current.value
        const genresInput = genresInputRef.current.value.split(",");
        
        onUpdate(id, title, genresInput);
    }
  }, [updatedMovie]);

  //Inicializar los campos con los valores de la movie a editar
  useEffect(() => {
    if(movie){
      console.log(movie)
      titleInputRef.current.value = movie.title;
      durationInputRef.current.value = movie.duration;
      synopsisInputRef.current.value = movie.synopsis;
      languageInputRef.current.value = movie.language;
      genresInputRef.current.value = movie.genres.join(", ");
      yearInputRef.current.value = movie.year;
      directorInputRef.current.value = movie.director;
      showCaseImageUrlInputRef.current.value = movie.showCaseImageUrl;
      movieCoverUrlInputRef.current.value = movie.movieCoverUrl;
    }
  }, [movie]);

  //Manejar submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const movieVideoInput = event.target.elements.movieVideo;

    formData.append("Title", titleInputRef.current.value);
    formData.append("Duration", durationInputRef.current.value);
    formData.append("Synopsis", synopsisInputRef.current.value);
    formData.append("Language", languageInputRef.current.value);
    formData.append("Year", yearInputRef.current.value);
    formData.append("Director", directorInputRef.current.value);
    formData.append("ShowCaseImageUrl", showCaseImageUrlInputRef.current.value);
    formData.append("MovieCoverUrl", movieCoverUrlInputRef.current.value);
    formData.append("MovieVideo", movieVideoInput.files[0]);
    const genresArray = genresInputRef.current.value.split(",");
    genresArray.forEach((genre, index) => {
      formData.append(`GenreNames[${index}]`, genre.trim());
    });

    await updateMovie(id,formData);


  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <label>
            Título:
            <input type="text" name="title" ref={titleInputRef} required />
          </label>
          <label>
            Duration:
            <input type="text" name="duration" ref={durationInputRef} required />
          </label>
          <label>
            Synopsis:
            <input type="text" minLength={4} name="synopsis" ref={synopsisInputRef} required />
          </label>
          <label>
            Language:
            <input type="text" name="language" ref={languageInputRef} required/>
          </label>
          <label>
            Genres:
            <input type="text" name="genres" ref={genresInputRef} required />
          </label>
          <label>
            Year:
            <input type="text" name="year" placeholder="1988" ref={yearInputRef} required />
          </label>
          <label>
            Director:
            <input type="text" name="director" ref={directorInputRef} required/>
          </label>
          <label>
            ShowCaseImageUrl:
            <input type="text" name="showCaseImageUrl" ref={showCaseImageUrlInputRef}/>
          </label>
          <label>
            MovieCoverUrl:
            <input type="text" name="movieCoverUrl" ref={movieCoverUrlInputRef} required />
          </label>
          <label>
            Video:
            <input type="file" name="movieVideo" required />
          </label>
          {isMovieLoading && <p>Cargando...</p>}
          {isMovieError && <p>{isMovieError}</p>}

          {isUpdatedMovieError && (
            <Alert variant="danger">{isUpdatedMovieError}</Alert>
          )}
          {isUpdatedMovieLoading && (
            <Alert variant="info">Modificando pelicula...</Alert>
          )}

          {updatedMovie && (
            <Alert variant="success">
              Pelicula modificada exitosamente
            </Alert>
          )}
          <button type="submit" className="save-button">
            Modificar pelicula
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateMovie;
