const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image: String, // Aquí solo guardaremos la URL de la imagen
  isFavorite: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Movie', movieSchema);
