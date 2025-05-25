import express from "express";
import "reflect-metadata";
import "es6-shim";
import { useExpressServer } from "routing-controllers";
import { AppDataSource } from "./configs/data-source.config";

const app = express();
const port = 3000;

useExpressServer(app, {
    controllers: [__dirname + "/controllers/*.ts"],
});

// AppDataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!");
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization:", err);
//     });

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
