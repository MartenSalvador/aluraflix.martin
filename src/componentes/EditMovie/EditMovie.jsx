import React, { useState, useEffect } from "react";
import "./EditMovie.css";

const EditMovie = ({ movie, updateMovie, closeForm }) => {
  const [editedMovie, setEditedMovie] = useState(movie);

  useEffect(() => {
    setEditedMovie(movie); // Aseguramos que los datos iniciales del formulario se reciban
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMovie({ ...editedMovie, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie(editedMovie); // Actualiza la película
    closeForm(); // Cierra el formulario de edición
  };

  return (
    <div className="modal-overlay" onClick={closeForm}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h2>Editar Película</h2>

          <label>
            TÍTULO
            <input
              type="text"
              name="title"
              value={editedMovie.title}
              onChange={handleChange}
              placeholder="Título de la película"
            />
          </label>

          <label>
            CATEGORÍA
            <select
              name="categoria"
              value={editedMovie.categoria}
              onChange={handleChange}
            >
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
              value={editedMovie.image}
              onChange={handleChange}
              placeholder="URL de la imagen"
            />
          </label>

          <label>
            VIDEO
            <input
              type="text"
              name="video"
              value={editedMovie.video}
              onChange={handleChange}
              placeholder="URL del video"
            />
          </label>

          <label>
            DESCRIPCIÓN
            <textarea
              name="descripcion"
              value={editedMovie.descripcion}
              onChange={handleChange}
              placeholder="Descripción de la tarjeta"
            />
          </label>

          <div>
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={closeForm}>
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovie;
