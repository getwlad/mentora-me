import Sequelize, { INET, Model } from "sequelize";
import databaseConfig from "../../config/database";
import InterestArea from "./InterestAreaModel";
import Mentorship from "./MentorshipModel";
import Particulars from "./ParticularsModel";
const sequelize = new Sequelize(databaseConfig);

class Mentor extends Model {}

Mentor.init(
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
    modelName: "Mentor",
  }
);
Mentor.hasMany(Mentorship, {
  sourceKey: "id",
  foreignKey: "mentor_id",
});

Mentorship.belongsTo(Mentor, {
  foreignKey: "mentor_id",
});

Mentor.hasOne(Particulars, {
  foreignKey: "mentor_id",
});
Particulars.belongsTo(Mentor, {
  foreignKey: "mentor_id",
});

InterestArea.hasMany(Mentor, {
  sourceKey: "id",
  foreignKey: "interest_area_id",
  as: "interests",
});
Mentor.belongsTo(InterestArea, {
  foreignKey: "interest_area_id",
});

export default Mentor;
