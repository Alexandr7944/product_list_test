import express from 'express';
import Server from "./Server";
import {configDotenv} from "dotenv";

configDotenv();

const app = express()
new Server(app);

const PORT = process.env.APP_PORT || 3300;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
}).on("error", (err: any) => {
    err.code === "EADDRINUSE"
        ? console.log("Error: address already in use")
        : console.log(err);
});
