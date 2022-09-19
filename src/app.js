require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
import express from "express";
import routes from "./routes.js";
import db from "./database/index";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

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
    this.server.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
      );
      next();
    });
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
