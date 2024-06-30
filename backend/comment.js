import sequelize from "./db.js";
import { DataTypes } from "@sequelize/core";
import post from "./post.js";
import user from "./user.js";

const comment = sequelize.define(
  "comment",
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
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

await user.sync();
await post.sync();

post.hasMany(comment, { foreignKey: "post_id" });
user.hasMany(comment, { foreignKey: "created_by_user_id" });

await comment.sync();

export default comment;
