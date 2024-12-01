import express from 'express';
import {
    getAllCategories,
    addCategory,
    addKeyword,
    findCategoryForTransaction,
    getTotalsByCategory
} from '../controllers/categoryController';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/add', addCategory);
router.post('/addKeyword', addKeyword);
router.post('/findCategoryForTransaction', findCategoryForTransaction);
router.get('/getTotals', getTotalsByCategory);


export default router;