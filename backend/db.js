import Sequelize from "@sequelize/core";

import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log("conneting to database mysql");
} catch (err) {
  console.log(err.message);
  process.exit();
}
export default sequelize;
