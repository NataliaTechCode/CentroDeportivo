const express = require('express');
const cors = require('cors'); 
const studentRoutes = require('./routes/StudentRoutes');
const userRoutes = require('./routes/UserRoutes');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api', studentRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
