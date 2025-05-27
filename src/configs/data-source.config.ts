import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "fleet_management",
    synchronize: true,
    logging: true,
    entities: [__dirname + "src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
    subscribers: ["src/subscribers/*.ts"],
});
