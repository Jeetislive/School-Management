// validations/education.validation.js

import Joi from "joi";

// Create Education
const createEducationSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.base": `"title" must be a string`,
    "string.empty": `"title" cannot be empty`,
    "any.required": `"title" is required`,
  }),
  institute: Joi.string().trim().required().messages({
    "string.base": `"institute" must be a string`,
    "string.empty": `"institute" cannot be empty`,
    "any.required": `"institute" is required`,
  }),
  startDate: Joi.date().required().messages({
    "date.base": `"startDate" must be a valid date`,
    "any.required": `"startDate" is required`,
  }),
  endDate: Joi.date().optional().messages({
    "date.base": `"endDate" must be a valid date`,
  }),
  certificate: Joi.string().uri().optional().messages({
    "string.uri": `"certificate" must be a valid URL`,
  }),
  userId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": `"userId" must be a valid UUID`,
      "any.required": `"userId" is required`,
    }),
});



// Get Education by User ID and Education ID
const getByUserAndEducationIdSchema = Joi.object({
  userId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": `"userId" must be a valid UUID`,
      "any.required": `"userId" is required`,
    }),
  id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": `"educationId" must be a valid UUID`,
      "any.required": `"educationId" is required`,
    }),
});

// Update Education Params (Education ID)
const updateEducationParamsSchema = Joi.object({
  id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": `"educationId" must be a valid UUID`,
      "any.required": `"educationId" is required`,
    }),
});

// Update Education Body
const updateEducationBodySchema = Joi.object({
  title: Joi.string().trim().optional().messages({
    "string.base": `"title" must be a string`,
    "string.empty": `"title" cannot be empty`,
  }),
  institute: Joi.string().trim().optional().messages({
    "string.base": `"institute" must be a string`,
    "string.empty": `"institute" cannot be empty`,
  }),
  startDate: Joi.date().optional().messages({
    "date.base": `"startDate" must be a valid date`,
  }),
  endDate: Joi.date().optional().messages({
    "date.base": `"endDate" must be a valid date`,
  }),
  certificate: Joi.string().uri().optional().messages({
    "string.uri": `"certificate" must be a valid URL`,
  }),
});

// Delete Education
const deleteEducationSchema = Joi.object({
  id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": `"educationId" must be a valid UUID`,
      "any.required": `"educationId" is required`,
    }),
});

export default {
    createEducationSchema,
    
    getByUserAndEducationIdSchema,
    updateEducationParamsSchema,
    updateEducationBodySchema,
    deleteEducationSchema,
};
