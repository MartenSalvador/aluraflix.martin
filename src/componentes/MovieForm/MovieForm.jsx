import React, { useState, useEffect } from "react";
import "./MovieForm.css"

function MovieForm({ addMovie,initialData, closeForm }) {
  const [movie, setMovie] = useState({
    title: "",
    categoria: "",
    image: "",
    video: "",
    descripcion: "",
  });
  useEffect(() => {
    if (initialData) {
      setMovie(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie(movie);
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Nueva Película</h2>

      <label>
        TÍTULO
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
          placeholder="Título de la película"
        />
      </label>

      <label>
        CATEGORÍA
        <select name="categoria" value={movie.categoria} onChange={handleChange}>
          <option value="">Seleccione una categoría</option>
          <option value="Acción">Acción</option>
          <option value="Drama">Drama</option>
          <option value="Comedia">Comedia</option>
          <option value="Documental">Documental</option>
        </select>
      </label>

      <label>
        IMAGEN
        <input
          type="text"
          name="image"
          value={movie.image}
          onChange={handleChange}
          placeholder="URL de la imagen"
        />
      </label>

      <label>
        VIDEO
        <input
          type="text"
          name="video"
          value={movie.video}
          onChange={handleChange}
          placeholder="URL del video"
        />
      </label>

      <label>
        DESCRIPCIÓN
        <textarea
          name="descripcion"
          value={movie.descripcion}
          onChange={handleChange}
          placeholder="Descripción de la tarjeta"
        />
      </label>

      <div>
        <button type="submit">Guardar</button>
        <button type="button" onClick={closeForm}>Cerrar</button>
      </div>
    </form>
  );
}

export default MovieForm;
