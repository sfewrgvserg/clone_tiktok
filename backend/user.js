import sequelize from "./db.js";
import { DataTypes } from "@sequelize/core";

const user = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING(155),
      allowNull: false,
    },
    fist_name: {
      type: DataTypes.STRING(155),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    sign_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: new Date(),
    },
    profile_img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

await user.sync();

await sequelize.sync();

export default user;
