const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

// Conectamos a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.error(err));

async function createUser() {
  const email = 'moodwatch@demo.com'; // Email
  const plainPassword = 'M00dW@tch!2024$'; // Contraseña

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    const user = new User({
      email: email,
      password: hashedPassword
    });

    await user.save();
    console.log('✅ Usuario creado exitosamente');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error al crear usuario:', err);
  }
}

createUser();
