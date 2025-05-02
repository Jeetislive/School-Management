import ExperienceController from "../controllers/ExperienceController.js";
import jwtTokens from "../utils/jwtTokens.js";
import experienceValidation from "../validations/experienceValidation.js";



const prefix = "/experience";

const experienceRoute = [
  {
    method: 'POST',
    path: `${prefix}`,
    handler: ExperienceController.createExperience,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('teacher')],
      validate: {
        payload: experienceValidation.createExperienceSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}`,
    handler: ExperienceController.getAllExperiences,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
        validate: {
            params: experienceValidation.getExperiencesBySchoolIdSchema,
            failAction: (request, h, err) => { throw err; }
        }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}/{id}`,
    handler: ExperienceController.getExperienceById,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('teacher')],
    validate: {
        params: experienceValidation.getExperienceByIdSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'PUT',
    path: `${prefix}/{id}`,
    handler: ExperienceController.updateExperience,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('teacher')],
    validate: {
        params: experienceValidation.updateExperienceParamsSchema,
        payload: experienceValidation.updateExperienceBodySchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'DELETE',
    path: `${prefix}/{id}`,
    handler: ExperienceController.deleteExperience,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: experienceValidation.deleteExperienceSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  
];

export default experienceRoute;
