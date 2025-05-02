// validations/event.validation.js

import Joi from "joi";

// Create Event
const createEventSchema = Joi.object({
  title: Joi.string().max(255).trim().required().messages({
    "string.base": `"title" must be a string`,
    "string.empty": `"title" cannot be empty`,
    "string.max": `"title" should have a maximum length of 255 characters`,
    "any.required": `"title" is required`,
  }),
  description: Joi.string().allow(null, "").optional().messages({
    "string.base": `"description" must be a string`,
  }),
  date: Joi.date().iso().required().messages({
    "date.base": `"date" must be a valid date`,
    "any.required": `"date" is required`,
  }),
  startTime: Joi.string()
    .pattern(/^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
    .required()
    .messages({
      "string.pattern.base": `"startTime" must be in HH:MM or HH:MM:SS format`,
      "any.required": `"startTime" is required`,
    }),
  classId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": `"classId" must be a valid UUID`,
      "any.required": `"classId" is required`,
    }),
  schoolId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": `"schoolId" must be a valid UUID`,
      "any.required": `"schoolId" is required`,
    }),
});
const getBySchoolAndEventIdSchema = Joi.object({
    id: Joi.string()
        .guid({ version: ["uuidv4"] })
        .required()
        .messages({
        "string.guid": `"eventId" must be a valid UUID`,
        "any.required": `"eventId" is required`,
        }),
    schoolId: Joi.string()
        .guid({ version: ["uuidv4"] })
        .required()
        .messages({
        "string.guid": `"schoolId" must be a valid UUID`,
        "any.required": `"schoolId" is required`,
        }),
    });

// Optional: Update Event (for PATCH or PUT)
const updateEventBodySchema = Joi.object({
  title: Joi.string().max(255).trim().optional(),
  description: Joi.string().allow(null, "").optional(),
  date: Joi.date().iso().optional(),
  startTime: Joi.string()
    .pattern(/^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
    .optional(),
  classId: Joi.string().guid({ version: ["uuidv4"] }).optional(),
  schoolId: Joi.string().guid({ version: ["uuidv4"] }).optional(),
});

// Event ID Param Validation (e.g., in routes like /events/:eventId)
const eventIdParamSchema = Joi.object({
  id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": `"eventId" must be a valid UUID`,
      "any.required": `"eventId" is required`,
    }),
});

// Get Events by School ID
const getBySchoolIdSchema = Joi.object({
    schoolId: Joi.string()
      .guid({ version: ["uuidv4"] })
      .required()
      .messages({
        "string.guid": `"schoolId" must be a valid UUID`,
        "any.required": `"schoolId" is required`,
      }),
  });
  

export default {
  createEventSchema,
  updateEventBodySchema,
  eventIdParamSchema,
  getBySchoolIdSchema,
  getBySchoolAndEventIdSchema,
};
