import dotenv from "dotenv";
import express, { Response, Request } from "express";

import http from "http";
import morgan from "morgan";
import cors from "cors";
import logger from "./helper/logger";
import bodyParser from "body-parser";

import errorHandler from "./middleware/errorhandler.middleware";
import auth_route from "./route/auth.route";
import { initSocket } from "./helper/socket";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(morgan("dev"));

// middleware
app.use(errorHandler);
app.use("/api/user" ,auth_route);

app.get("/", (req: Request, res: Response) => {
  res.json("Hello World");
});

const start_server = async () => {
  server.listen(5001, () => {
    initSocket(server);    
    logger.info('Server active on Port 5001')
  })
};

start_server();
