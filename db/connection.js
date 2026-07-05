import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

let sequelize = new Sequelize(
  String(process.env.DB_NAME),
  String(process.env.DB_USERNAME),
  String(process.env.DB_PASSWORD),
  {
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    logging: false,
    dialect:
      "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  },
);

const initSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default {
  sequelize,
  initSequelize,
};
