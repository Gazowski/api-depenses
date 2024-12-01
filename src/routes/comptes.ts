import express from 'express';
//import { pool } from '../server';

const router = express.Router();

// test route
router.get('/test', (req, res) => {
  res.json({ message: 'Comptes test route' });
  res.send('Comptes test route');
});

// Get all comptes
router.get('/', async (req, res) => {
  // try {
  //   const { rows } = await pool.query('SELECT * FROM comptes');
  //   res.json(rows);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ error: 'Erreur serveur' });
  // }
});

// Add a new compte
router.post('/', async (req, res) => {
  const { nom, solde } = req.body;
  // try {
  //   const { rows } = await pool.query(
  //     'INSERT INTO comptes (nom, solde) VALUES ($1, $2) RETURNING *',
  //     [nom, solde]
  //   );
  //   res.status(201).json(rows[0]);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ error: 'Erreur serveur' });
  // }
});

export default router;