import ClassController from '../controllers/ClassController.js';
import jwtTokens from '../utils/jwtTokens.js';
import ClassValidation from '../validations/ClassValidation.js';

const prefix = '/class';
const classRoute = [
    {
        method: 'POST',
        path: `${prefix}/create`,
        handler: ClassController.createClass,
        options: {
          pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
          validate: {
            payload: ClassValidation.createClassSchema,
            failAction: (request, h, err) => { throw err; }
          }
        }
      },
    {
        method: 'GET',
        path: `${prefix}/{schoolId}`,
        handler: ClassController.getAllClassesBySchoolId,
        options: {
          pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
            validate: {
                params: ClassValidation.getAllClassesSchema,
                failAction: (request, h, err) => { throw err; }
            }
        }
      },
];
export default classRoute;
