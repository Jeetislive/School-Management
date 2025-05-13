
import ClassScheduleController from "../controllers/ClassScheduleController.js";
import jwtTokens from "../utils/jwtTokens.js";
import classScheduleValidation from "../validations/classScheduleValidation.js";



const prefix = "/classSchedule";

const classScheduleRoute = [
  {
    method: 'POST',
    path: `${prefix}`,
    handler: ClassScheduleController.createClassSchedule,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
      validate: {
        payload: classScheduleValidation.createClassScheduleSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}`,
    handler: ClassScheduleController.getAllClassSchedules,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
        validate: {
            params: classScheduleValidation.getAllClassSchedulesSchema,
            failAction: (request, h, err) => { throw err; }
        }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}/{id}`,
    handler: ClassScheduleController.getClassScheduleById,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: classScheduleValidation.classScheduleIdParamSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}/{classId}/schedule`,
    handler: ClassScheduleController.getClassScheduleByClassId,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('teacher')],
    validate: {
        params: classScheduleValidation.classScheduleClassIdParamSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'PUT',
    path: `${prefix}/{id}`,
    handler: ClassScheduleController.updateClassSchedule,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: classScheduleValidation.classScheduleIdParamSchema,
        payload: classScheduleValidation.updateClassScheduleBodySchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'DELETE',
    path: `${prefix}/{id}`,
    handler: ClassScheduleController.deleteClassSchedule,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: classScheduleValidation.classScheduleIdParamSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  
];

export default classScheduleRoute;
