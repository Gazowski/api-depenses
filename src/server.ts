import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import comptesRoutes from './routes/comptes';
import uploadRoutes from './routes/upload';
import { AppDataSource } from "./data-source";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/comptes', comptesRoutes);
app.use('/api/upload', uploadRoutes);

// Database connection
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API de suivi des comptes bancaires' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export { app };