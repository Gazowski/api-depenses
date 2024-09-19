import { DataSource } from 'typeorm';
import { Transaction } from './models/Transaction';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "gael",
    password: "postgres123",
    database: "releves-bancaires",
    synchronize: true,
    logging: true,
    entities: [Transaction],
    subscribers: [],
    migrations: [],
})