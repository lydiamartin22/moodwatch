import { useState, useEffect } from 'react';
import axios from 'axios';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL;

  // Traer películas
  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${API_URL}/movies`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setMovies(res.data);
    } catch (err) {
      console.error('Error al obtener películas:', err.response ? err.response.data : err.message);
    }
  };

  // Eliminar una película
  const handleDeleteMovie = async (id) => {
    try {
      await axios.delete(`${API_URL}/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMovies(); // Actualizar lista después de eliminar
    } catch (err) {
      console.error('Error al eliminar película:', err.response ? err.response.data : err.message);
    }
  };

  // Marcar/Desmarcar como favorito
  const handleFavoriteToggle = async (id) => {
    try {
      await axios.put(`${API_URL}/movies/favorite/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMovies(); // Actualizar lista después de marcar favorito
    } catch (err) {
      console.error('Error al marcar favorito:', err.response ? err.response.data : err.message);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="movies-list">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie._id} className="movie-card">
            <img src={movie.image} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>

            {/* Botón de eliminar */}
            <button onClick={() => handleDeleteMovie(movie._id)}>Eliminar</button>

            {/* Botón de favorito */}
            <button onClick={() => handleFavoriteToggle(movie._id)}>
              {movie.isFavorite ? '💖 Quitar Favorito' : '🤍 Añadir Favorito'}
            </button>
          </div>
        ))
      ) : (
        <p>No hay películas disponibles.</p>
      )}
    </div>
  );
};

export default Movies;
