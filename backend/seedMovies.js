const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie');

dotenv.config();

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado para seed'))
  .catch((err) => console.error(err));

const seedMovies = async () => {
  try {
    // Primero eliminamos todas las películas existentes
    await Movie.deleteMany({});
    console.log('Películas anteriores eliminadas');

    // Ahora insertamos las nuevas
    const movies = [
        {
          title: 'El Padrino',
          description: 'Película de mafiosos de 1972.',
          image: 'https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg',
          isFavorite: false
        },
        {
          title: 'Fight Club',
          description: 'Un hombre descontento forma un club clandestino de lucha.',
          image: 'https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_SY445_.jpg',
          isFavorite: false
        },
        {
          title: 'Pulp Fiction',
          description: 'Historias entrelazadas en Los Ángeles criminal.',
          image: 'https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg',
          isFavorite: false
        },
        {
          title: 'Interstellar',
          description: 'Viaje espacial para salvar la humanidad.',
          image: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg',
          isFavorite: false
        },
        {
          title: 'La La Land',
          description: 'Un romance musical en Los Ángeles.',
          image: 'https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png',
          isFavorite: false
        }
      ];
      
    await Movie.insertMany(movies);
    console.log('Películas insertadas correctamente');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error al insertar películas:', err);
    mongoose.disconnect();
  }
};

seedMovies();