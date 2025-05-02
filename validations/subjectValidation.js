import Joi from 'joi';

const createSubjectSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'any.required': 'Subject name is required',
    'string.empty': 'Subject name cannot be empty',
  }),
  code: Joi.string().trim().optional().allow(null, ''),
  schoolId: Joi.string().uuid().required().messages({
    'any.required': 'School ID is required',
    'string.guid': 'School ID must be a valid UUID',
  }),
});

const getSubjectsBySchoolIdSchema = Joi.object({
  schoolId: Joi.string().uuid().required().messages({
    'any.required': 'School ID is required',
    'string.guid': 'School ID must be a valid UUID',
  }),
});
const getSubjectByIdSchema = Joi.object({
    schoolId: Joi.string().uuid().required().messages({
      'any.required': 'School ID is required',
      'string.guid': 'School ID must be a valid UUID',
    }),
  id: Joi.string().uuid().required().messages({
    'any.required': 'Subject ID is required',
    'string.guid': 'Subject ID must be a valid UUID',
  }),
});

const updateSubjectParamsSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'any.required': 'Subject ID is required',
    'string.guid': 'Subject ID must be a valid UUID',
  }),
});

const updateSubjectBodySchema = Joi.object({
  name: Joi.string().trim().optional(),
  code: Joi.string().trim().optional().allow(null, ''),
  schoolId: Joi.string().uuid().optional().messages({
    'string.guid': 'School ID must be a valid UUID',
  }),
}).min(1).messages({
  'object.min': 'At least one field is required to update',
});

const deleteSubjectSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'any.required': 'Subject ID is required',
    'string.guid': 'Subject ID must be a valid UUID',
  }),
});

export default {
  createSubjectSchema,
  getSubjectsBySchoolIdSchema,
  getSubjectByIdSchema,
  updateSubjectParamsSchema,
  updateSubjectBodySchema,
  deleteSubjectSchema,
};
