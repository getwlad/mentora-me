import express from "express";
import routes from "./routes.js";
import db from "./database/index";

class App {
  constructor() {
    this.server = express();
    this.initializeDB();
    this.middlewares();
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
