import SchoolController from "../controllers/SchoolController.js";
import jwtTokens from "../utils/jwtTokens.js";
import schoolValidation from "../validations/schoolValidation.js";


const prefix = "/school";

const schoolRoute = [
  {
    method: 'POST',
    path: `${prefix}`,
    handler: SchoolController.createSchool,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('superadmin')],
      validate: {
        payload: schoolValidation.createSchoolSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'GET',
    path: `${prefix}`,
    handler: SchoolController.getAllSchools,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('superadmin')],
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{id}`,
    handler: SchoolController.getSchoolById,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('superadmin')],
    }
  }
];

export default schoolRoute;
