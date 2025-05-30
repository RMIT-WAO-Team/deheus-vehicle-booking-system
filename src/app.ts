import dotenv from "dotenv";
dotenv.config();

import express from "express";
import "reflect-metadata";
import "es6-shim";
import {useContainer, useExpressServer} from "routing-controllers";
import AppDataSource from "./configs/data-source.config";
import {Container} from "typedi";

const app = express();
const port = 3000;

app.use(express.json());
useContainer(Container);

useExpressServer(app, {
    routePrefix: "/api",
    controllers: [__dirname + "/controllers/*.ts"],
});

AppDataSource.initialize()
    .then(() => {
        console.log("PostgreSQL Database connected successfully!");
        app.listen(port, () => {
            console.log(`Express is listening at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

// app.listen(port, () => {
//     return console.log(`Express is listening at http://localhost:${port}`);
// });
