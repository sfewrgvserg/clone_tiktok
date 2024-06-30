import sequelize from "./db.js";
import { DataTypes } from "@sequelize/core";
import user from "./user.js";
import post from "./post.js";

const like = sequelize.define(
  "like",
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
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  { timestamps: false }
);

await user.sync();
await post.sync();

user.hasMany(like, { as: "likedPosts", foreignKey: "user_id" });
post.hasMany(like, { foreignKey: "post_id" });
await like.sync();

export default like;
