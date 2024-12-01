// src/controllers/transactionController.ts

import { Request, Response } from 'express';
import { parseCSV } from '../utils/csvParser';
import { TransactionService } from '../models/Transaction'; // Vous devrez implémenter cette fonction
import { CategoryService } from '../models/Category'; // Vous devrez implémenter cette fonction
import fs from 'fs';
import { Transaction } from '../entity/Transaction'; // Import the Transaction type


const transactionService = new TransactionService();
const categoryService = new CategoryService();

export const getTransactionsForLast24Months = async (req: Request, res: Response) => {
    try {
        const transactions = await transactionService.getTransactionsForLast24Months();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

export const getTransactionsForYear = async (req: Request, res: Response) => {
    const year = parseInt(req.query.year as string);
    if (isNaN(year)) {
        return res.status(400).json({ error: 'Invalid year parameter' });
    }

    try {
        const transactions = await transactionService.getTransactionsForYear(year);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};



export const uploadAndParseCSV = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send('Aucun fichier n\'a été téléchargé.');
    }

    try {
        const parsedTransactions = await parseCSV(req.file.path);

        // Convert the parsed transactions into Transaction objects (entities)
        const transactions: Transaction[] = await Promise.all(parsedTransactions.map(async t => {
            const transaction = new Transaction();
            transaction.transactionId = t.transactionId;
            transaction.transactionDate = t.transactionDate;
            transaction.description = t.description;
            transaction.amount = t.amount;
            transaction.createdAt = new Date();
            transaction.updatedAt = new Date();
            transaction.category = await categoryService.findCategoryForTransaction(t.description);
            return transaction;
        }));

        // Sauvegarder les transactions dans la base de données
        await transactionService.saveTransactionsToDatabase(transactions);

        // Supprimer le fichier temporaire après le traitement
        fs.unlinkSync(req.file.path);

        res.status(200).json({
            message: 'Fichier CSV traité avec succès',
            transactionsCount: transactions.length
        });
    } catch (error) {
        console.error('Erreur lors du traitement du fichier CSV:', error);
        res.status(500).send('Erreur lors du traitement du fichier CSV');
    }
};

export const getAllTransactions = async (req: Request, res: Response) => {
    const transactions = await transactionService.getAll();
    res.json(transactions);
};

export const getTransactionsByYear = async (req: Request, res: Response) => {
    const year = req.query.year as string;
    const transactions = await transactionService.getTransactionsByYear(year);
    res.json(transactions);
};

/**
 * get transaction for a category for a specific month
    * @param req
    * @param res
    * @returns {Promise<void>} 
 */

export const getTransactionsByCategoryAndMonth = async (req: Request, res: Response) => {
    const { year, month, category } = req.query;

    const transactions = await transactionService.getTransactionsByCategoryAndMonth(year as string, month as string, category as string);
    res.json(transactions);
};

/**
 * update transaction category
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

export const updateTransactionCategory = async (req: Request, res: Response):Promise<void> => {
    const { transactionId, category } = req.body;
    const transaction = await transactionService.updateTransactionCategory(parseInt(transactionId) as number, parseInt(category) as number);
    res.json(transaction);
}
