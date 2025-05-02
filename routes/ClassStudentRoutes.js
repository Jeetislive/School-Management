
import ClassStudentController from "../controllers/ClassStudentController.js";
import jwtTokens from "../utils/jwtTokens.js";
import classStudentValidation from "../validations/classStudentValidation.js";

const prefix = "/classStudent";

const classStudentRoute = [
  {
    method: 'GET',
    path: `${prefix}/{schoolId}`,
    handler: ClassStudentController.getAllClassStudents,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
        validate: {
            params: classStudentValidation.classStudentSchoolIdParamSchema,
            failAction: (request, h, err) => { throw err; }
        }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}/{id}`,
    handler: ClassStudentController.getClassStudentById,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: classStudentValidation.classStudentBothParamSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'PUT',
    path: `${prefix}/{id}`,
    handler: ClassStudentController.updateClassStudent,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: classStudentValidation.classStudentIdParamSchema,
        payload: classStudentValidation.updateClassStudentBodySchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'DELETE',
    path: `${prefix}/{id}`,
    handler: ClassStudentController.deleteClassStudent,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: classStudentValidation.classStudentIdParamSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  
];

export default classStudentRoute;
