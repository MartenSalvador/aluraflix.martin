import React, {useState, useEffect} from "react";
import "./Presentacion.css"


function Presentacion(){

    const [movies, setMovies] = useState([]);
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState(null); // Estado para la tarjeta expandida


    useEffect(()=>{
        const fetchMovies = async ()=>{
            try{
                const response = await fetch ("http://localhost:5000/movies")
                const data = await response.json();
                setMovies(data);
            }catch(error){
                console.error("Error al cargar las peliculas", error);
            }
        };

        fetchMovies();
        
    },[]);

    useEffect(() => {
        if (movies.length > 0) {
          const intervalId = setInterval(() => {
            setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length); // Cambiar al siguiente índice, volviendo al inicio
          }, 4000);
    
          return () => clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
        }
      }, [movies]); // Este efecto depende de las películas cargadas

      const handleCardClick = (movie) => {
        setSelectedMovie(movie); // Expande la tarjeta al hacer clic
      };
    
      const handleCloseCard = () => {
        setSelectedMovie(null); // Cierra la tarjeta expandida
      };
    
      if (movies.length === 0) {
        return <p>Cargando películas...</p>;
      }
    
      const currentMovie = movies[currentMovieIndex]; // Película actual

    return (
        <section className="presentacion">
      <div className="movie-card" onClick={() => handleCardClick(currentMovie)}>
        <img src={currentMovie.image} alt={currentMovie.title} />
        <h3>{currentMovie.title}</h3>
        <p>{currentMovie.descripcion}</p>
      </div>
      {selectedMovie && (
        <div className="expanded-card" onClick={handleCloseCard}>
          <div className="expanded-content">
            <img src={selectedMovie.image} alt={selectedMovie.title} />
            <h3>{selectedMovie.title}</h3>
            <p>{selectedMovie.descripcion}</p>
            <p><strong>Categoría:</strong> {selectedMovie.categoria}</p>
          </div>
        </div>
      )}
    </section>
    );
} 




export default Presentacion