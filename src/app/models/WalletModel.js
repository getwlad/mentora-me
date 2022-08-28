import Sequelize, { Model } from "sequelize";
class Wallet extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        user_type: Sequelize.ENUM("STUDENT", "MENTOR"),
      },
      {
        sequelize,
      }
    );
  }
}

export default Wallet;
