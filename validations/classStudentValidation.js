// validations/classStudent.validation.js

import Joi from "joi";

const classStudentBothParamSchema = Joi.object({
    id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": `"id" must be a valid UUID`,
      "any.required": `"id" is required`,
    }),
    classId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": `"classId" must be a valid UUID`,
      "any.required": `"classId" is required`,
    }),
});


// ✅ Optional: Param validation (e.g., for /class-student/:id routes)
const classStudentIdParamSchema = Joi.object({
  id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": `"id" must be a valid UUID`,
      "any.required": `"id" is required`,
    }),
});
// ✅ Update ClassStudent Validation
const updateClassStudentBodySchema = Joi.object({
    classId: Joi.string()
      .guid({ version: ["uuidv4"] })
      .optional()
      .messages({
        "string.guid": `"classId" must be a valid UUID`,
      }),
  
    studentId: Joi.string()
      .guid({ version: ["uuidv4"] })
      .optional()
      .messages({
        "string.guid": `"studentId" must be a valid UUID`,
      }),
  }).min(1).messages({
    "object.min": "At least one of classId or studentId must be provided",
  });
  

export default {
    classStudentBothParamSchema,
    classStudentIdParamSchema,
    updateClassStudentBodySchema
};
