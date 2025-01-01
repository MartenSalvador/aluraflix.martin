import React, { useState, useEffect } from "react";
import Header from "./componentes/Header/Header";
import MovieForm from "./componentes/MovieForm/MovieForm";
import MovieList from "./componentes/MovieList/MovieList";
import EditMovie from './componentes/EditMovie/EditMovie';
import Footer from "./componentes/Footer/Footer";
import Presentacion
 from "./componentes/Presentacion/Presentacion";
function App() {
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data)); 
  }, []);

  const addMovie = (newMovie) => {
    fetch("http://localhost:5000/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    })
      .then((response) => response.json())
      .then((savedMovie) => setMovies([...movies, savedMovie]))
      .catch((error) => console.error("Error al guardar la película:", error));
  };

  const deleteMovie = (id) => {
    fetch(`http://localhost:5000/movies/${id}`, { method: "DELETE" })
      .then(() => setMovies(movies.filter((movie) => movie.id !== id)))
      .catch((error) => console.error("Error al eliminar la película:", error));
  };

  // Actualizar una película existente
const updateMovie = (updatedMovie) => {
  fetch(`http://localhost:5000/movies/${updatedMovie.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedMovie),
  })
    .then(() => {
      setMovies(
        movies.map((movie) =>
          movie.id === updatedMovie.id ? updatedMovie : movie
        )
      );
      setEditingMovie(null); // Cerrar el formulario de edición
    })
    .catch((error) => console.error("Error al actualizar la película:", error));
};


  const handleEdit = (movie) => {
    setEditingMovie(movie); // Activar modo edición
    setShowForm(false); // Cerrar el formulario de creación si está abierto
  };

  return (
    <div>
      <Header setShowForm={setShowForm} />
      
     

      {/* Formulario para agregar película */}
      {showForm && !editingMovie && (
        <MovieForm addMovie={addMovie} closeForm={() => setShowForm(false)} />
      )}
      <Presentacion />
      {/* Lista de películas */}
      <MovieList
        movies={movies}
        deleteMovie={deleteMovie}
        onEdit={handleEdit}
      />

      {/* Modal de edición de película */}
      {editingMovie && (
        <EditMovie
          movie={editingMovie}
          updateMovie={updateMovie}
          closeForm={() => setEditingMovie(null)}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
