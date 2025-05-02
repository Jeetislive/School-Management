
import EducationController from "../controllers/EducationController.js";
import jwtTokens from "../utils/jwtTokens.js";
import educationValidation from "../validations/educationValidation.js";



const prefix = "/education";

const educationRoute = [
  {
    method: 'POST',
    path: `${prefix}`,
    handler: EducationController.createEducation,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('teacher')],
      validate: {
        payload: educationValidation.createEducationSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'GET',
    path: `${prefix}`,
    handler: EducationController.getAllEducations,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')]
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{userId}/{id}`,
    handler: EducationController.getEducationById,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('teacher')],
    validate: {
        params: educationValidation.getByUserAndEducationIdSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'PUT',
    path: `${prefix}/{id}`,
    handler: EducationController.updateEducation,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('teacher')],
    validate: {
        params: educationValidation.updateEducationParamsSchema,
        payload: educationValidation.updateEducationBodySchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'DELETE',
    path: `${prefix}/{id}`,
    handler: EducationController.deleteEducation,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('teacher')],
    validate: {
        params: educationValidation.deleteEducationSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  
];

export default educationRoute;
