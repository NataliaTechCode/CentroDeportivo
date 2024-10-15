const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');

const userRoutes = require('./routes/UserRoutes');
const studentRoutes = require('./routes/StudentRoutes');
const sportRoutes = require('./routes/SportRoutes');
const coachRoutes = require('./routes/CoachRoutes');
const scheduleRoutes = require('./routes/ScheduleRoutes');
const monthlyRoutes = require('./routes/MonthlyRoutes');


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api', userRoutes);
app.use('/api', studentRoutes);
app.use('/api', sportRoutes);
app.use('/api', coachRoutes);
app.use('/api', scheduleRoutes);
app.use('/api', monthlyRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
