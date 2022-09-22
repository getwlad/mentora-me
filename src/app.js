require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
import express from "express";
import routes from "./routes.js";
import db from "./database/index";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
const cors = require("cors");

class App {
  constructor() {
    this.server = express();
    this.initializeDB();
    this.middlewares();
    this.document();
    this.routes();
  }
  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }
  routes() {
    this.server.use(routes);
  }
  document() {
    this.server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
  async initializeDB() {
    try {
      await db.authenticate();
      console.log("Conexão com o banco de dados realizada com sucesso");
    } catch (err) {
      console.log("Não foi possível conectar ao banco de dados: ", err.message);
    }
  }
}

export default new App().server;
