import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/estilo.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', description: '', image: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/movies');
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleInputChange = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  const handleCreateMovie = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/movies', newMovie, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewMovie({ title: '', description: '', image: '' });
      fetchMovies();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMovies();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFavoriteToggle = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/movies/favorite/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMovies();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="movies-container">
      <h2>Películas Moodwatch</h2>

      <form onSubmit={handleCreateMovie}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={newMovie.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={newMovie.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          placeholder="URL de la imagen"
          value={newMovie.image}
          onChange={handleInputChange}
        />
        <button type="submit">Agregar Película</button>
      </form>

      <div className="movies-list">
        {movies.map((movie) => (
          <div key={movie._id} className="movie-card">
            <img src={movie.image} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <button onClick={() => handleDeleteMovie(movie._id)}>Eliminar</button>
            <button onClick={() => handleFavoriteToggle(movie._id)}>
              {movie.isFavorite ? '💖 Quitar Favorito' : '🤍 Añadir Favorito'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
