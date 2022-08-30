import Sequelize, { Model } from "sequelize";
import databaseConfig from "../../config/database";
const sequelize = new Sequelize(databaseConfig);
class Wallet extends Model {}

Wallet.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    balance: {
      type: Sequelize.DECIMAL(10, 2),
    },
  },
  {
    sequelize,
    modelName: "Wallet",
  }
);

export default Wallet;
