// src/controllers/transactionController.ts

import { Request, Response } from 'express';
import { parseCSV } from '../utils/csvParser';
import { saveTransactionsToDatabase } from '../models/Transaction'; // Vous devrez implémenter cette fonction
import fs from 'fs';
import { Transaction } from '../models/Transaction'; // Import the Transaction type

export const uploadAndParseCSV = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send('Aucun fichier n\'a été téléchargé.');
    }

    try {
        const parsedTransactions = await parseCSV(req.file.path);

        // Convertir les transactions parsées en objets Transaction
        // const transactions: Partial<Transaction>[] = parsedTransactions.map(t => ({
        //     transactioDate: new Date(t.transactionDate),
        //     description: t.description,
        //     amount: t.amount,
        //     createdAt: new Date().toISOString(),
        //     updatedAt: new Date().toISOString()
        //     // Ne pas inclure l'id ici, il sera généré automatiquement
        //     // Ajoutez d'autres champs si nécessaire
        // }));

        // Convert the parsed transactions into Transaction objects (entities)
        const transactions: Transaction[] = parsedTransactions.map(t => {
            const transaction = new Transaction();
            transaction.transactionDate = t.transactionDate;
            transaction.description = t.description;
            transaction.amount = t.amount;
            transaction.createdAt = new Date().toISOString();
            transaction.updatedAt = new Date().toISOString();
            return transaction;
        });
        console.log(transactions);

        
        // Sauvegarder les transactions dans la base de données
        await saveTransactionsToDatabase(transactions);

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