import React, { useState, useEffect } from "react";
import axios from 'axios';
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
    // Cambiar URL a la de MockAPI
    axios.get("https://677517f192222241481a9ff4.mockapi.io/movies")
      .then((response) => setMovies(response.data)) // Usar la data obtenida de MockAPI
      console.log(response.data);
      .catch((error) => console.error("Error al obtener las películas:", error));
  }, []);

  const addMovie = (newMovie) => {
    axios.post("https://677517f192222241481a9ff4.mockapi.io/movies", newMovie)
      .then((response) => setMovies([...movies, response.data])) // Agregar la nueva película
      .catch((error) => console.error("Error al guardar la película:", error));
  };

  const deleteMovie = (id) => {
    axios.delete(`https://677517f192222241481a9ff4.mockapi.io/movies/${id}`)
      .then(() => setMovies(movies.filter((movie) => movie.id !== id))) // Eliminar la película
      .catch((error) => console.error("Error al eliminar la película:", error));
  };

  const updateMovie = (updatedMovie) => {
    axios.put(`https://677517f192222241481a9ff4.mockapi.io/movies/${updatedMovie.id}`, updatedMovie)
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
