import hapi from "@hapi/hapi";
import dotenv from "dotenv";
import sequelize from "./utils/sequelize.js";
import indexRoutes from "./routes/indexRoute.js";

// Import models and sync associations
// import { User, School, Role, Department, Assignment, Class, Invite, RefreshToken, ClassSchedule, Permission, Experience, Degree, Result, Attendance, Complaint, NoticeBoard, Subject, Event, ExamSchedule } from "./models/index.js"; 

dotenv.config();

const init = async () => {
  const server = hapi.server({
    port: process.env.PORT || 8000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"], // Allow all origins
        credentials: true, // Allow credentials
        additionalHeaders: ["accessToken", "refreshToken"], // Allow additional headers
      },
    },
  });

  // Database Connection and Model Sync
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Sync the models and associations
    await sequelize.sync({ alter: true }); // You can pass { alter: true } for development
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit if DB fails
  }

  // Register routes
  server.route(indexRoutes);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init().catch((err) => {
  console.error(err);
  process.exit(1);
});
