
import NoticeController from "../controllers/NoticeController.js";
import jwtTokens from "../utils/jwtTokens.js";
import noticeValidation from "../validations/noticeValidation.js";



const prefix = "/notice";

const noticeRoute = [
  {
    method: 'POST',
    path: `${prefix}`,
    handler: NoticeController.createNotice,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
      validate: {
        payload: noticeValidation.createNoticeSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}`,
    handler: NoticeController.getAllNotices,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
        validate: {
            params: noticeValidation.getNoticesBySchoolIdSchema,
            failAction: (request, h, err) => { throw err; }
        }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}/{id}`,
    handler: NoticeController.getNoticeById,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: noticeValidation.getNoticeByIdSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'PUT',
    path: `${prefix}/{id}`,
    handler: NoticeController.updateNotice,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: noticeValidation.updateNoticeParamsSchema,
        payload: noticeValidation.updateNoticeBodySchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'DELETE',
    path: `${prefix}/{id}`,
    handler: NoticeController.deleteNotice,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: noticeValidation.deleteNoticeSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  
];

export default noticeRoute;
