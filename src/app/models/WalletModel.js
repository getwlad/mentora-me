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
        balance: {
          type: Sequelize.DECIMAL(10, 2),
        },
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", targetKey: "id" });
  }
}

export default Wallet;
