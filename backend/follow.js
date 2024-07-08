import sequelize from "./db.js";
import { DataTypes } from "@sequelize/core";
import user from "./user.js";

const follow = sequelize.define(
  "follow",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    following_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { key: "id", table: "users" },
    },
    followed_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { key: "id", table: "users" },
    },
    created_datetime: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  { timestamps: false }
);
await follow.sync();

user.hasMany(follow, {
  foreignKey: {
    name: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  as: "userFollows",
});

user.hasMany(follow, {
  foreignKey: {
    name: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  as: "userFollowedBy",
});

export default follow;
