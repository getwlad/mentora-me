import Sequelize from "sequelize";

import config from "../config/database";
import Mentor from "../app/models/MentorModel";
import Student from "../app/models/StudentModel";
import User from "../app/models/UserModel";
import Wallet from "../app/models/WalletModel";
import "dotenv/config";

const models = [Mentor, Student, User, Wallet];

class Database {
  constructor() {
    this.connection = new Sequelize(config);
    this.init();
    this.associate();
  }

  init() {
    models.forEach((model) => model.init(this.connection));
  }

  associate() {
    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
