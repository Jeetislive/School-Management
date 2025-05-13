
import AuthController from '../controllers/AuthController.js';
import AuthValidation from '../validations/AuthValidation.js';

const prefix = "/auth";
const authRoute = [
  {
    method: 'POST',
    path: `${prefix}/signup-superadmin`,
    handler: AuthController.signupSuperAdmin,
    options: {
      validate: {
        payload: AuthValidation.signupSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'POST',
    path: `${prefix}/login`,
    handler: AuthController.login,
    options: {
      validate: {
        payload: AuthValidation.loginSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
//   {
//     method: 'POST',
//     path: `${prefix}/refresh-token`,
//     handler: AuthController.refreshToken,
//   },
  {
    method: 'POST',
    path: `${prefix}/logout`,
    handler: AuthController.logout,
    
  },
  {
    method: 'PUT',
    path: `${prefix}/reset-password`,
    handler: AuthController.resetPassword,
    options: {
      validate: {
        payload: AuthValidation.resetPasswordSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  }
];

export default authRoute;
