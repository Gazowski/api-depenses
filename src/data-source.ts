import "reflect-metadata"
import { DataSource } from "typeorm"
import { Transaction } from "./entity/Transaction"
import { Category } from "./entity/Category"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "gael",
    password: process.env.DB_PASSWORD || "postgres123",
    database: process.env.DB_NAME || "releves-bancaires",
    synchronize: true,
    logging: false,
    entities: [Transaction, Category],
    migrations: [],
    subscribers: [],
})
