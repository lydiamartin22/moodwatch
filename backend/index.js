const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('Moodwatch API funcionando');
});

const moviesRoutes = require('./routes/movies');
app.use('/api/movies', moviesRoutes);

app.use('/api/auth', require('./routes/auth'));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.error(err));

// Servidor escuchando
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Servidor funcionando en el puerto ${PORT}`));