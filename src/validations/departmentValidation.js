import Joi from 'joi';

const createDepartmentSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'any.required': 'Department name is required',
    'string.empty': 'Department name cannot be empty',
  }),
  code: Joi.string().trim().optional().allow(null, ''),
  schoolId: Joi.string().uuid().required().messages({
    'any.required': 'School ID is required',
    'string.guid': 'School ID must be a valid UUID',
  }),
});

const getDepartmentsBySchoolIdSchema = Joi.object({
  schoolId: Joi.string().uuid().required().messages({
    'any.required': 'School ID is required',
    'string.guid': 'School ID must be a valid UUID',
  }),
});
const getDepartmentByIdSchema = Joi.object({
    schoolId: Joi.string().uuid().required().messages({
      'any.required': 'School ID is required',
      'string.guid': 'School ID must be a valid UUID',
    }),
  id: Joi.string().uuid().required().messages({
    'any.required': 'Department ID is required',
    'string.guid': 'Department ID must be a valid UUID',
  }),
});

const updateDepartmentParamsSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'any.required': 'Department ID is required',
    'string.guid': 'Department ID must be a valid UUID',
  }),
});

const updateDepartmentBodySchema = Joi.object({
  name: Joi.string().trim().optional(),
  code: Joi.string().trim().optional().allow(null, ''),
  schoolId: Joi.string().uuid().optional().messages({
    'string.guid': 'School ID must be a valid UUID',
  }),
}).min(1).messages({
  'object.min': 'At least one field is required to update',
});

const deleteDepartmentSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'any.required': 'Department ID is required',
    'string.guid': 'Department ID must be a valid UUID',
  }),
});

export default {
  createDepartmentSchema,
  getDepartmentsBySchoolIdSchema,
  getDepartmentByIdSchema,
  updateDepartmentParamsSchema,
  updateDepartmentBodySchema,
  deleteDepartmentSchema,
};
