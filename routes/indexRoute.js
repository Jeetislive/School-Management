import assignmentRoute from "./AssignmentRoutes.js";
import authRoute from "./AuthRoutes.js";
import classRoute from "./ClassRoute.js";
import classScheduleRoute from "./ClassScheduleRoutes.js";
import classStudentRoute from "./ClassStudentRoutes.js";
import degreeRoute from "./DegreeRoutes.js";
import departmentRoute from "./DepartmentRoutes.js";
import educationRoute from "./EducationRoutes.js";
import eventRoute from "./EventRoutes.js";
import experienceRoute from "./ExperienceRoute.js";
import inviteRoute from "./InviteRoutes.js";
import noticeRoute from "./NoticeRoutes.js";
import schoolRoute from "./schoolRoutes.js";
import subjectRoute from "./SubjectRoutes.js";


const indexRoutes = [
  ...noticeRoute,
  ...assignmentRoute,
  ...classStudentRoute,
  ...eventRoute,
  ...educationRoute,
  ...degreeRoute,
  ...classScheduleRoute,
  ...departmentRoute,
  ...experienceRoute,
  ...subjectRoute,
  ...inviteRoute,
  ...authRoute,
  ...schoolRoute,
  ...classRoute
];

export default indexRoutes;
