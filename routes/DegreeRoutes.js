
import DegreeController from "../controllers/DegreeController.js";
import jwtTokens from "../utils/jwtTokens.js";
import degreeValidation from "../validations/degreeValidation.js";



const prefix = "/degree";

const degreeRoute = [
  {
    method: 'POST',
    path: `${prefix}`,
    handler: DegreeController.createDegree,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
      validate: {
        payload: degreeValidation.createDegreeSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}`,
    handler: DegreeController.getAllDegrees,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
        validate: {
            params: degreeValidation.getBySchoolIdSchema,
            failAction: (request, h, err) => { throw err; }
        }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}/{id}`,
    handler: DegreeController.getDegreeById,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: degreeValidation.getBySchoolAndDegreeIdSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'PUT',
    path: `${prefix}/{id}`,
    handler: DegreeController.updateDegree,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: degreeValidation.updateDegreeParamsSchema,
        payload: degreeValidation.updateDegreeBodySchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'DELETE',
    path: `${prefix}/{id}`,
    handler: DegreeController.deleteDegree,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: degreeValidation.getBySchoolAndDegreeIdSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  
];

export default degreeRoute;
