// src/utils/csvParser.ts

import fs from 'fs';
import { parse } from 'csv-parse';
import iconv from 'iconv-lite';

interface Transaction {
    transactionId: string;
    transactionDate: Date;
    description: string;
    amount: number;
    // categoryId: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function parseCSV(filePath: string): Promise<Transaction[]> {
  return new Promise((resolve, reject) => {
    const transactions: Transaction[] = [];

    fs.createReadStream(filePath)
        .pipe(iconv.decodeStream('ISO-8859-1'))
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
                transaction.transactionDate = new Date(row[3]);
                transaction.amount = parseFloat(row[5].replace(',', '.'));
                transaction.transactionId = row[3].split('/').join('')
                 + transaction.amount.toString()
                    .replace('.', '')
                    .replace('-', '')
                 + row[0];
            } else if (row.length === 4) {
                transaction.description = row[3];
                transaction.transactionDate = new Date(row[1]);
                transaction.amount = parseFloat(row[2].replace(',', '.'));
                transaction.transactionId = row[1].split('/').join('')
                    + transaction.amount.toString()
                        .replace('.', '')
                        .replace('-', '')
                    + row[3];
            } else {
                console.warn(`Skipping row with unexpected number of columns: ${row}`);
                return;
            }
            transaction.transactionId = transaction.transactionId
                        .replace(/^\s+|\s+$/g, '')
                        // remove white space
                        .replace(/\s/g,'')                        
                        .toLowerCase()
                        // take only the first 30 characters
                        .substring(0, 30)
            transaction.createdAt = new Date();
            transaction.updatedAt = new Date();

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