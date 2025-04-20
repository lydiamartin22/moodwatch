import { useState, useEffect } from 'react';
import axios from 'axios';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
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

  // Crear nueva película
  const handleCreateMovie = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/movies`, { title, description, image }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setTitle('');
      setDescription('');
      setImage('');
      fetchMovies(); // Actualizar lista después de crear
    } catch (err) {
      console.error('Error al crear película:', err.response ? err.response.data : err.message);
    }
  };

  // Eliminar película
  const handleDeleteMovie = async (id) => {
    try {
      await axios.delete(`${API_URL}/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMovies();
    } catch (err) {
      console.error('Error al eliminar película:', err.response ? err.response.data : err.message);
    }
  };

  // Marcar/Desmarcar favorito
  const handleFavoriteToggle = async (id) => {
    try {
      await axios.put(`${API_URL}/movies/favorite/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMovies();
    } catch (err) {
      console.error('Error al marcar favorito:', err.response ? err.response.data : err.message);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="movies-container">
      <h2>Crear Nueva Película</h2>
      <form onSubmit={handleCreateMovie} className="create-movie-form">
        <input 
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input 
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input 
          type="text"
          placeholder="URL de imagen"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <button type="submit">Crear Película</button>
      </form>

      <h2>Catálogo de Películas</h2>
      <div className="movies-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie._id} className="movie-card">
              <img src={movie.image} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>

              <button onClick={() => handleDeleteMovie(movie._id)}>Eliminar</button>

              <button onClick={() => handleFavoriteToggle(movie._id)}>
                {movie.isFavorite ? '💖 Quitar Favorito' : '🤍 Añadir Favorito'}
              </button>
            </div>
          ))
        ) : (
          <p>No hay películas disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Movies;
