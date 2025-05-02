
import EventController from "../controllers/EventController.js";
import jwtTokens from "../utils/jwtTokens.js";
import eventValidation from "../validations/eventValidation.js";



const prefix = "/event";

const eventRoute = [
  {
    method: 'POST',
    path: `${prefix}`,
    handler: EventController.createEvent,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
      validate: {
        payload: eventValidation.createEventSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}`,
    handler: EventController.getAllEvents,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
        validate: {
            params: eventValidation.getBySchoolIdSchema,
            failAction: (request, h, err) => { throw err; }
        }
    }
  },
  {
    method: 'GET',
    path: `${prefix}/{schoolId}/{id}`,
    handler: EventController.getEventById,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: eventValidation.getBySchoolAndEventIdSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'PUT',
    path: `${prefix}/{id}`,
    handler: EventController.updateEvent,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: eventValidation.eventIdParamSchema,
        payload: eventValidation.updateEventBodySchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  {
    method: 'DELETE',
    path: `${prefix}/{id}`,
    handler: EventController.deleteEvent,
    options: {
      pre: [jwtTokens.verifyToken, jwtTokens.verifyRole('admin')],
    validate: {
        params: eventValidation.eventIdParamSchema,
        failAction: (request, h, err) => { throw err; }
      }
    }
  },
  
];

export default eventRoute;
