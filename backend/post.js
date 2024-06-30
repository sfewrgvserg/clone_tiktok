import sequelize from "./db.js";
import { DataTypes } from "@sequelize/core";
import User from "./user.js";

const post = sequelize.define(
  "post",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    created_by_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { key: "id", model: User },
    },
    created_datetime: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: new Date(),
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "The user has not written anything in the caption",
    },
    media_file: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  { timestamps: false }
);

User.hasMany(post, { foreignKey: "created_by_user_id" });
await post.sync();

export default post;
