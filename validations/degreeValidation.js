// validations/degree.validation.js

import Joi from "joi";

// Create Degree
const createDegreeSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be empty`,
    "any.required": `"name" is required`,
  }),
  schoolId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": `"schoolId" must be a valid UUID`,
      "any.required": `"schoolId" is required`,
    }),
});

// Get Degrees by School ID
const getBySchoolIdSchema = Joi.object({
  schoolId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": `"schoolId" must be a valid UUID`,
      "any.required": `"schoolId" is required`,
    }),
});

// Get Degree by School ID and Degree ID
const getBySchoolAndDegreeIdSchema = Joi.object({
  schoolId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": `"schoolId" must be a valid UUID`,
      "any.required": `"schoolId" is required`,
    }),
  id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": `"degreeId" must be a valid UUID`,
      "any.required": `"degreeId" is required`,
    }),
});
const updateDegreeParamsSchema = Joi.object({
  id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": `"id" must be a valid UUID`,
      "any.required": `"id" is required`,
    }),
});

// Update Degree
const updateDegreeBodySchema = Joi.object({
  name: Joi.string().trim().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be empty`,
  }),
  schoolId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .messages({
      "string.guid": `"schoolId" must be a valid UUID`,
    }),
});



export default {
  createDegreeSchema,
  getBySchoolIdSchema,
  getBySchoolAndDegreeIdSchema,
  updateDegreeParamsSchema,
  updateDegreeBodySchema,
};