import sequelize from "../utils/sequelize.js";

// Import all models
import { User } from "./User.js";
import { School } from "./School.js";
import { Role } from "./Role.js";
import { Department } from "./Department.js";
import { Assignment } from "./Assignment.js";
import { Class } from "./Class.js";
import { Invite } from "./Invite.js";
import { RefreshToken } from "./RefreshToken.js";
import { ClassSchedule } from "./ClassShedule.js";
import { Permission } from "./Permission.js";
import { Experience } from "./Experience.js";
import { Degree } from "./Degree.js";
import { Result } from "./Result.js";
import { Attendance } from "./Attendance.js";
import { Complaint } from "./Complaint.js";
import { NoticeBoard } from "./NoticeBoard.js";
import { Subject } from "./Subject.js";
import { Event } from "./Event.js";
import { ExamSchedule } from "./ExamSchedule.js";

// Group all models
const models = {
  sequelize,
  User,
  School,
  Role,
  Department,
  Assignment,
  Class,
  Invite,
  RefreshToken,
  ClassSchedule,
  Permission,
  Experience,
  Degree,
  Result,
  Attendance,
  Complaint,
  NoticeBoard,
  Subject,
  ExamSchedule,
  Event,
};

// Setup associations if defined
for (const model of Object.values(models)) {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
}

export default models;
