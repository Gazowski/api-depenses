// src/models/Transaction.ts

import { Transaction } from "../entity/Transaction";
import { Category } from "../entity/Category";
import { AppDataSource } from "../data-source";

export class TransactionService {
    private transactionRepository = AppDataSource.getRepository(Transaction);

    async saveTransactionsToDatabase(transactions: Partial<Transaction>[]): Promise<void> {
        const transactionRepository = AppDataSource.getRepository(Transaction);
        // await transactionRepository.save(transactions);
        
        // use query builder to insert transactions
        await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(Transaction)
            .values(transactions)
            .orIgnore()
            .execute();
    
        const savedTransactions = await transactionRepository.find();
    }

    async getAll(): Promise<Transaction[]> {
        return this.transactionRepository.find();
    }

    async getTransactionsByYear(year: string): Promise<Transaction[]> {
        const nextYear = parseInt(year) + 1;

        return this.transactionRepository
            .createQueryBuilder('transaction')
            .leftJoinAndSelect('transaction.category', 'category')
            .select([
                'transaction',
                'category.id',
              ])
              .where('EXTRACT(YEAR FROM transaction.transactionDate) = :year', { year })
              .orderBy("DATE_TRUNC('month', transaction.transactionDate)", 'ASC')
              .getMany(); // cache the result

            
    }

    async aggregateTransactionsByCategory(year: string): Promise<any> {
        return this.transactionRepository
            .createQueryBuilder("transaction")
            .leftJoinAndSelect("transaction.category", "category")
            .select("EXTRACT(MONTH FROM transaction.transactionDate)", "month")
            .addSelect("category.name", "name")
            .addSelect("category.title", "title")
            .addSelect("category.color", "color")
            .addSelect("category.groupe", "group")
            .addSelect("SUM(transaction.amount)", "total")
            .where("EXTRACT(YEAR FROM transaction.transactionDate) = :year", { year })
            .groupBy("month")
            .addGroupBy("category.name")
            .addGroupBy("category.title")
            .addGroupBy("category.color")
            .addGroupBy("category.groupe")
            .orderBy("month")
            .addOrderBy("name")
            .getRawMany();
    }

    /**
     * get transactions for a category for a given month
     * @param year
     * @param month
     * @param categoryName
     * @returns array of transactions
     */

    async getTransactionsByCategoryAndMonth(year: string, month: string, categoryName: string): Promise<Transaction[]> {
        return this.transactionRepository
            .createQueryBuilder("transaction")
            .leftJoinAndSelect("transaction.category", "category")
            .select([
                'transaction',
                'category.id',
              ])
            .where("EXTRACT(YEAR FROM transaction.transactionDate) = :year", { year })
            .andWhere("EXTRACT(MONTH FROM transaction.transactionDate) = :month", { month })
            .andWhere("category.name = :categoryName", { categoryName })
            .getMany();
    }

    /**
     * update transaction category
     */
    async updateTransactionCategory(id: number, categoryId: number): Promise<void> {
        await this.transactionRepository
        .createQueryBuilder()
        .update(Transaction)
        .set({ category : {id: categoryId }})
        .where("id = :id", { id })
        .execute();
    }

        

    
}