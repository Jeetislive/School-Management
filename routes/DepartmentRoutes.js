
import DepartmentController from "../controllers/DepartmentController.js";
import jwtTokens from "../utils/jwtTokens.js";
import departmentValidation from "../validations/departmentValidation.js";



const prefix = "/department";

const departmentRoute = [
  {
    method: 'POST',
    path: `${prefix}`,
    handler: DepartmentController.createDepartment,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
      validate: {
        payload: departmentValidation.createDepartmentSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}`,
    handler: DepartmentController.getAllDepartments,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
        validate: {
            params: departmentValidation.getDepartmentsBySchoolIdSchema,
            failAction: (request, h, err) => { throw err; }
        }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}/{id}`,
    handler: DepartmentController.getDepartmentById,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: departmentValidation.getDepartmentByIdSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'PUT',
    path: `${prefix}/{id}`,
    handler: DepartmentController.updateDepartment,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: departmentValidation.updateDepartmentParamsSchema,
        payload: departmentValidation.updateDepartmentBodySchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'DELETE',
    path: `${prefix}/{id}`,
    handler: DepartmentController.deleteDepartment,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: departmentValidation.deleteDepartmentSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  
];

export default departmentRoute;
