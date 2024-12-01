// Category.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Transaction } from "./Transaction";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    title: string;

    @Column()
    color: string;

    @Column()
    groupe: string;

    @Column("simple-array")
    keywords: string[];

    @OneToMany(() => Transaction, transaction => transaction.category)
    transactions: Transaction[];
}