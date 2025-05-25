import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: false,
    logging: true,
    entities: [__dirname + "/../entities/*.ts"],
    subscribers: [],
    migrations: [],
});
