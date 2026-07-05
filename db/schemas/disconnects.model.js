import { DataTypes } from "sequelize";
import { schemaNames } from "../../constants/schemasname.js";
import connection from "../connection.js";

export const disconnectModel = connection.sequelize.define(
  schemaNames.disconnect,
  {
    userId: {
      type: DataTypes.STRING,
      unique: true,
    },
    disconnect_timestamp: {
      type: DataTypes.TIME,
    },
  },
  { timestamps: true, createdAt: true },
);
