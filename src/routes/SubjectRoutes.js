
import SubjectController from "../controllers/SubjectController.js";
import jwtTokens from "../utils/jwtTokens.js";
import subjectValidation from "../validations/subjectValidation.js";



const prefix = "/subject";

const subjectRoute = [
  {
    method: 'POST',
    path: `${prefix}`,
    handler: SubjectController.createSubject,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
      validate: {
        payload: subjectValidation.createSubjectSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}`,
    handler: SubjectController.getAllSubjects,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
        validate: {
            params: subjectValidation.getSubjectsBySchoolIdSchema,
            failAction: (request, h, err) => { throw err; }
        }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}/{id}`,
    handler: SubjectController.getSubjectById,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: subjectValidation.getSubjectByIdSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'PUT',
    path: `${prefix}/{id}`,
    handler: SubjectController.updateSubject,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: subjectValidation.updateSubjectParamsSchema,
        payload: subjectValidation.updateSubjectBodySchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'DELETE',
    path: `${prefix}/{id}`,
    handler: SubjectController.deleteSubject,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: subjectValidation.deleteSubjectSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  
];

export default subjectRoute;
