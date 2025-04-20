const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Crear nueva película
router.post('/', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener una película por ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar una película
router.put('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Eliminar una película
router.delete('/:id', async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Película eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Marcar/Desmarcar como favorito
router.put('/favorite/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    movie.isFavorite = !movie.isFavorite;
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
