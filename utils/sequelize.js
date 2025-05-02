import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
    process.env.db_name || "school_management_schema",
    process.env.db_user || "root",
    process.env.db_password || "jeetpal@123",
    {
        host: "localhost",
        dialect: "mysql",
        logging: false, // Disable logging for cleaner output
    }
);

export default sequelize;