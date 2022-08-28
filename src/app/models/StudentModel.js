import Sequelize, { Model } from "sequelize";
class Student extends Model {
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
        cpf: Sequelize.STRING,
        points: Sequelize.STRING,
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

export default Student;
