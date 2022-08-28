import bcrypt from "bcryptjs";
import Sequelize, { Model } from "sequelize";
class User extends Model {
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
        password: Sequelize.VIRTUAL(Sequelize.STRING),
      },
      {
        sequelize,
      }
    );
    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasOne(models.Mentor, {
      foreignKey: "user_id",
    });
    this.hasOne(models.Student, {
      foreignKey: "user_id",
    });
  }
}

export default User;
