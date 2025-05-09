
import { DataTypes, Sequelize } from "sequelize";
import dotenv from "dotenv";
import School from "../models/School.js";
import Assignment from "../models/Assignment.js";
import Attendance from "../models/Attendance.js";
import User from "../models/User.js";
import Subject from "../models/Subject.js";
import StudentAssignment from "../models/StudentAssignment.js";
import Role from "../models/Role.js";
import Result from "../models/Result.js";
import RefreshToken from "../models/RefreshToken.js";
import Permission from "../models/Permission.js";
import NoticeBoard from "../models/NoticeBoard.js";
import Module from "../models/Module.js";
import Invite from "../models/Invite.js";
import GradingScale from "../models/GradingScale.js";
import Experience from "../models/Experience.js";
import Event from "../models/Event.js";
import Education from "../models/Education.js";
import Department from "../models/Department.js";
import Degree from "../models/Degree.js";
import Complaint from "../models/Complaint.js";
import ClassStudent from "../models/ClassStudent.js";
import ClassSchedule from "../models/ClassShedule.js";
import Class from "../models/Class.js";
import ExamSchedule from "../models/ExamSchedule.js";
import setupAssociations from "../models/relations/associations.js";

dotenv.config();

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: false,
});

const db = {};
db.sequelize = sequelize;

db.Assignment = Assignment(sequelize, DataTypes);
db.Attendance = Attendance(sequelize, DataTypes);
db.Class = Class(sequelize, DataTypes);
db.ClassSchedule = ClassSchedule(sequelize, DataTypes);
db.ClassStudent = ClassStudent(sequelize, DataTypes);
db.Complaint = Complaint(sequelize, DataTypes);
db.Degree = Degree(sequelize, DataTypes);
db.Department = Department(sequelize, DataTypes);
db.Education = Education(sequelize, DataTypes);
db.Event = Event(sequelize, DataTypes);
db.ExamSchedule = ExamSchedule(sequelize, DataTypes);
db.Experience = Experience(sequelize, DataTypes);
db.GradingScale = GradingScale(sequelize, DataTypes);
db.Invite = Invite(sequelize, DataTypes);
db.Module = Module(sequelize, DataTypes);
db.NoticeBoard = NoticeBoard(sequelize, DataTypes);
db.Permission = Permission(sequelize, DataTypes);
db.RefreshToken = RefreshToken(sequelize, DataTypes);
db.Result = Result(sequelize, DataTypes);
db.School = School(sequelize, DataTypes);
db.Role = Role(sequelize, DataTypes);
db.StudentAssignment = StudentAssignment(sequelize, DataTypes);
db.Subject = Subject(sequelize, DataTypes);
db.User = User(sequelize, DataTypes);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    setupAssociations();
    await sequelize.sync({ 
      alter: true
    });

    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { db, connectDB };
