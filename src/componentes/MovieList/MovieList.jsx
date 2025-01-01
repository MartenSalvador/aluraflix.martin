import React , {useState }from "react";
import "./MovieList.css"


function MovieList({ movies, deleteMovie, onEdit }) {

  const [selectedMovie, setSelectedMovie] = useState(null); // Estado para la película seleccionada
  // Agrupamos las películas por su categoría
  const groupedMovies = movies.reduce((groups, movie) => {
    const categoria = movie.categoria || "Sin Categoría"; 
    if (!groups[categoria]) {
      groups[categoria] = [];
    }
    groups[categoria].push(movie);
    return groups;
  }, {});

  const handleCardClick = (movie) => {
    setSelectedMovie(movie); // Establecer la película seleccionada
  };

  const handleCloseCard = () => {
    setSelectedMovie(null); // Cerrar la tarjeta seleccionada
  };


  return (
    <div className="movie-list">
      {Object.keys(groupedMovies).map((categoria) => (
        <div key={categoria} className="category-section">
          <h2>{categoria}</h2> {/* Título de la categoría */}
          <div className="movies-in-category">
            {groupedMovies[categoria].map((movie) => (
              <div key={movie.id} className="movie-item">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="movie-image"
                  onClick={() => handleCardClick(movie)} // Evento click en la imagen
                />
                <h3>{movie.title}</h3>
                <div className="botonera">
                  <button onClick={() => deleteMovie(movie.id)}>Eliminar</button>
                  <button onClick={() => onEdit(movie)}>Editar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Mostrar la tarjeta expandida al hacer clic */}
      {selectedMovie && (
        <div className="movie-card-expanded" onClick={handleCloseCard}>
          <div className="expanded-content">
            <img src={selectedMovie.image} alt={selectedMovie.title} />
            <h3>{selectedMovie.title}</h3>
            <p>{selectedMovie.descripcion}</p>
            <p><strong>Categoría:</strong> {selectedMovie.categoria}</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default MovieList;
