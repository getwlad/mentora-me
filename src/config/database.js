require("dotenv/config");

module.exports = {
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamp: true, // cria duas colunas: createdAt e updateAt
    underscored: true, // nomeclatura nao camelcase
    underscoredAll: true,
    freezeTableName: true,
  },
};
