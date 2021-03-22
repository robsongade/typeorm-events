import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import RouterEvents from "./routers/RouterEvents";
const dotenv = require("dotenv")

dotenv.config()

createConnection().then(async connection => {

    // create express app
    const app = express();
    const cors = require('cors');
    app.use(cors())
    app.use(bodyParser.json());
    app.use(RouterEvents)

   
    const port = process.env.PORT || 3000
    app.listen(port);

    console.log(`Express server has started on port ${port}. Open http://localhost:${port}/status/channel to see results`);

}).catch(error => console.log(error));
