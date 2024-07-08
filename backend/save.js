import sequelize from "./db.js";
import { DataTypes } from "@sequelize/core";
import user from "./user.js";
import post from "./post.js";

const save = sequelize.define(
  "save",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { key: "id", table: "users" },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { key: "id", table: "posts" },
    },
    created_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  { timestamps: false }
);

await user.sync();
await post.sync();

user.hasMany(save, { as: "savedPosts", foreignKey: "user_id" });
post.hasMany(save, { foreignKey: "post_id" });
await save.sync();

export default save;
