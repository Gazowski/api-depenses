// src/utils/csvParser.ts

import fs from 'fs';
import { parse } from 'csv-parse';

interface Transaction {
    transactionDate: string;
    description: string;
    amount: number;
    // categoryId: string;
    createdAt: string;
    updatedAt: string;
}

export async function parseCSV(filePath: string): Promise<Transaction[]> {
  return new Promise((resolve, reject) => {
    const transactions: Transaction[] = [];

    fs.createReadStream(filePath)
        .pipe(parse({
            delimiter: ',',
            skip_empty_lines: true
        }))
        .on('data', (row: any) => {
            const transaction = {} as Transaction;

            // i have 2 bank accounts. First one (PC) has 6 columns with no column identifier
            // second one (Manuvie) has 4 columns with column identifier
            // columns for PC bank is: description, type, owner, date, time, amount
            // columns for Manuvie bank is: account, date, amount, description

            if(row[0] === 'Description') {
                return;
            }

            if (row.length === 6) {
                transaction.description = row[0];
                transaction.transactionDate = row[3];
                transaction.amount = parseFloat(row[5].replace(',', '.'));
            } else {
                transaction.description = row[3];
                transaction.transactionDate = row[1];
                transaction.amount = parseFloat(row[2].replace(',', '.'));
            }
            transaction.createdAt = new Date().toISOString();
            transaction.updatedAt = new Date().toISOString();
            transactions.push(transaction);

        })
        .on('end', () => {
            resolve(transactions);
        })
        .on('error', (error) => {
            reject(error);
        });
  });
}