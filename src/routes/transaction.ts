import express from 'express';
import multer from 'multer';
import path from 'path';
import { 
  uploadAndParseCSV, 
  getAllTransactions, 
  getTransactionsByYear,
  getTransactionsByCategoryAndMonth,
  updateTransactionCategory,
} from '../controllers/transactionsController';

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

router.get('/', getAllTransactions);
router.post('/upload', upload.single('file'), uploadAndParseCSV);
router.get('/transactionsForYear', getTransactionsByYear);
router.get('/transactionsForCategoryAndMonth', getTransactionsByCategoryAndMonth);
router.post('/updateTransactionCategory', updateTransactionCategory);

export default router;