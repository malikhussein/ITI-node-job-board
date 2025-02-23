import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('Server working');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
