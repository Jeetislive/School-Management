import InviteController from "../controllers/InviteController.js";
import jwtTokens from "../utils/jwtTokens.js";
import AuthValidation from "../validations/AuthValidation.js";

const prefix = "/invite";

const inviteRoute = [
  {
    method: 'POST',
    path: `${prefix}/admin`,
    handler: InviteController.invite,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('superadmin')],
      validate: {
        payload: AuthValidation.signupSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'POST',
    path: `${prefix}/teacher`,
    handler: InviteController.invite,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
      validate: {
        payload: AuthValidation.signupSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'POST',
    path: `${prefix}/student`,
    handler: InviteController.invite,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
      validate: {
        payload: AuthValidation.signupSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },

];
export default inviteRoute;
