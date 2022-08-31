import bcrypt from "bcryptjs";
import Sequelize, { Model } from "sequelize";
import databaseConfig from "../../config/database";
import Mentor from "./MentorModel";
import Student from "./StudentModel";
import Wallet from "./WalletModel";
const sequelize = new Sequelize(databaseConfig);
class User extends Model {
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

User.init(
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
    modelName: "User",
  }
);

User.addHook("beforeSave", async (user) => {
  if (user.password) {
    user.password_hash = await bcrypt.hash(user.password, 8);
  }
});

User.hasOne(Wallet, {
  foreignKey: "user_id",
});
User.hasOne(Mentor, {
  foreignKey: "user_id",
});
User.hasOne(Student, {
  foreignKey: "user_id",
});

export default User;
