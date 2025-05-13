import Joi from "joi";

const createAssignmentSchema = Joi.object({
  title: Joi.string().max(150).required(),
  description: Joi.string().optional().allow(null, ''),
  dueDate: Joi.date().optional().allow(null),
  teacherId: Joi.string().guid({ version: ["uuidv4"] }).required(),
  classId: Joi.string().guid({ version: ["uuidv4"] }).required(),
  schoolId: Joi.string().guid({ version: ["uuidv4"] }).required(),
  fileURL: Joi.string().uri().max(500).optional().allow(null, ''),
  subjectId: Joi.string().guid({ version: ["uuidv4"] }).required(),
  status: Joi.string().valid("draft", "published").required(),
  maxPoints: Joi.number().positive().required()
});
const getAllAssignmentsSchema = Joi.object({
    schoolId: Joi.string().guid({ version: ["uuidv4"] }).required().messages({
        "string.guid": `"school id" must be a valid UUID`,
        "any.required": `"school id" is required`,
    }),
});
const getAssignmentBySchoolIdIdSchema = Joi.object({
    id: Joi.string().guid({ version: ["uuidv4"] }).required().messages({
        "string.guid": `"id" must be a valid UUID`,
        "any.required": `"id" is required`,
    }),
    schoolId: Joi.string().guid({ version: ["uuidv4"] }).required().messages({
        "string.guid": `"school id" must be a valid UUID`,
        "any.required": `"school id" is required`,
    }),
});
const updateAssignmentSchema = Joi.object({
    title: Joi.string().max(150).optional(),
    description: Joi.string().optional().allow(null, ''),
    dueDate: Joi.date().optional().allow(null),
    teacherId: Joi.string().guid({ version: ["uuidv4"] }).optional(),
    classId: Joi.string().guid({ version: ["uuidv4"] }).optional(),
    schoolId: Joi.string().guid({ version: ["uuidv4"] }).optional(),
    fileURL: Joi.string().uri().max(500).optional().allow(null, ''),
    subjectId: Joi.string().guid({ version: ["uuidv4"] }).optional(),
    status: Joi.string().valid("draft", "published").optional(),
    maxPoints: Joi.number().positive().optional()
  }).min(1).messages({
    "object.min": "At least one field must be updated"
  });
const assignmentIdParamSchema = Joi.object({
    id: Joi.string().guid({ version: ["uuidv4"] }).required().messages({
        "string.guid": `"id" must be a valid UUID`,
        "any.required": `"id" is required`,
    }),
});
const getAssignmentByClassIdSchema = Joi.object({
    classId: Joi.string().guid({ version: ["uuidv4"] }).required().messages({
        "string.guid": `"class id" must be a valid UUID`,
        "any.required": `"class id" is required`,
    }),
    schoolId: Joi.string().guid({ version: ["uuidv4"] }).required().messages({
    "string.guid": `"school id" must be a valid UUID`,
    "any.required": `"school id" is required`,
    }),
});
const getAssignmentByTeacherIdSchema = Joi.object({
    id: Joi.string().guid({ version: ["uuidv4"] }).required().messages({
        "string.guid": `"id" must be a valid UUID`,
        "any.required": `"id" is required`,
    }),
    teacherId: Joi.string().guid({ version: ["uuidv4"] }).required().messages({
        "string.guid": `"teacher id" must be a valid UUID`,
        "any.required": `"teacher id" is required`,
    }),
    schoolId: Joi.string().guid({ version: ["uuidv4"] }).required().messages({
    "string.guid": `"school id" must be a valid UUID`,
    "any.required": `"school id" is required`,
    }),
});

export default {
    createAssignmentSchema,
    updateAssignmentSchema,
    getAssignmentBySchoolIdIdSchema,
    assignmentIdParamSchema,
    getAllAssignmentsSchema,
    getAssignmentByClassIdSchema,
    getAssignmentByTeacherIdSchema
}
    