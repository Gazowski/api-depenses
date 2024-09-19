// src/models/Transaction.ts

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { AppDataSource } from "../data-source";
@Entity()
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: String;

    @Column({ type: "date" })
    transactionDate!: string;

    @Column()
    description!: string;

    @Column("decimal", { precision: 10, scale: 2 })
    amount!: number;

    //@Column({ nullable: true })
    // category!: string | null;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: String;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt!: String;

    // Ajoutez d'autres champs selon vos besoins
}

export async function saveTransactionsToDatabase(transactions: Partial<Transaction>[]): Promise<void> {
    await AppDataSource.manager.save(transactions);
}