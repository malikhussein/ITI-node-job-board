import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import Application from './controllers/application.controller.js';
import mainRouter from './routes/server.route.js';

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('Server working');
});

app.use('/api', mainRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
