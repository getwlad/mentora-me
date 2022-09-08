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
