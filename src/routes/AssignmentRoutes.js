
import AssignmentController from "../controllers/AssignmentController.js";
import jwtTokens from "../utils/jwtTokens.js";
import assignmentValidation from "../validations/assignmentValidation.js";



const prefix = "/assignment";

const assignmentRoute = [
  {
    method: 'POST',
    path: `${prefix}`,
    handler: AssignmentController.createAssignment,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('teacher')],
      validate: {
        payload: assignmentValidation.createAssignmentSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}`,
    handler: AssignmentController.getAllAssignments,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
        validate: {
            params: assignmentValidation.getAllAssignmentsSchema,
            failAction: (request, h, err) => { throw err; }
        }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}/{id}`,
    handler: AssignmentController.getAssignmentById,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('teacher')],
    validate: {
        params: assignmentValidation.getAssignmentBySchoolIdIdSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}/{classId}/classAssignment`,
    handler: AssignmentController.getAssignmentByClassId,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('teacher')],
    validate: {
        params: assignmentValidation.getAssignmentByClassIdSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}/{teacherId}/teacherAssignment`,
    handler: AssignmentController.getAssignmentByTeacherId,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('student')],
    validate: {
        params: assignmentValidation.getAssignmentByTeacherIdSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'PUT',
    path: `${prefix}/{id}`,
    handler: AssignmentController.updateAssignment,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('teacher')],
    validate: {
        params: assignmentValidation.assignmentIdParamSchema,
        payload: assignmentValidation.updateAssignmentSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'DELETE',
    path: `${prefix}/{id}`,
    handler: AssignmentController.deleteAssignment,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('teacher')],
    validate: {
        params: assignmentValidation.assignmentIdParamSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  
];

export default assignmentRoute;
