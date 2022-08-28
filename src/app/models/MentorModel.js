import Sequelize, { Model } from "sequelize";
class Mentor extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        name: Sequelize.STRING,
        phone: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        publicEmail: Sequelize.STRING,
        chavePix: Sequelize.STRING,
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

export default Mentor;
