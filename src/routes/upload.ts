import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadAndParseCSV } from '../controllers/transactionsController';

const router = express.Router();

// Configuration de multer pour le stockage des fichiers

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) !== '.csv') {
      return cb(new Error('Seuls les fichiers CSV sont autorisés'));
    }
    cb(null, true);
  }
});
const handleUpload = () => {
    console.log('handleUpload');
}
router.get('/', (req, res) => {
    res.json({ message: 'Upload test route' });
    }
);
router.post('/', upload.single('file'), uploadAndParseCSV);
// router.post('/', upload.single('file'), (req, res) => {
//     if (!req.file) {
//       return res.status(400).send('Aucun fichier n\'a été téléchargé.');
//     }
//     // Ici, vous pouvez ajouter la logique pour traiter le fichier CSV
//     res.status(200).send('Fichier téléchargé avec succès');
// });

export default router;