import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id!: String;

    @Column({unique: true})
    transactionId!: String;

    @Column({ type: "date" })
    transactionDate!: Date;

    @Column()
    description!: String;

    @Column("decimal", { precision: 10, scale: 2 })
    amount!: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    @ManyToOne(() => Category, category => category.transactions)
    category!: Category;
}