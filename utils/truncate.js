import models from "./../src/app/models/models";

const truncate = async () => {
  models.map(async (model) => {
    model.destroy({
      where: {},
    });
  });
};
module.exports = truncate;
