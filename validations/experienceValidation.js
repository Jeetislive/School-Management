import Joi from 'joi';

const createExperienceSchema = Joi.object({
  organization_name: Joi.string().max(255).required().messages({
    'any.required': 'Organization name is required',
    'string.empty': 'Organization name cannot be empty',
  }),
  position: Joi.string().max(255).required().messages({
    'any.required': 'Position is required',
    'string.empty': 'Position cannot be empty',
  }),
  startDate: Joi.date().iso().required().messages({
    'any.required': 'Start date is required',
    'date.format': 'Start date must be in YYYY-MM-DD format',
  }),
  endDate: Joi.date().iso().optional().allow(null),
  userId: Joi.string().uuid().required().messages({
    'any.required': 'User ID is required',
    'string.guid': 'User ID must be a valid UUID',
  }),
  schoolId: Joi.string().uuid().required().messages({
    'any.required': 'School ID is required',
    'string.guid': 'School ID must be a valid UUID',
  }),
});

const getExperiencesBySchoolIdSchema = Joi.object({
  schoolId: Joi.string().uuid().required().messages({
    'any.required': 'School ID is required',
    'string.guid': 'School ID must be a valid UUID',
  }),
});

const getExperienceByIdSchema = Joi.object({
    schoolId: Joi.string().uuid().required().messages({
        'any.required': 'School ID is required',
        'string.guid': 'School ID must be a valid UUID',
    }),
    id: Joi.string().uuid().required().messages({
    'any.required': 'Experience ID is required',
    'string.guid': 'Experience ID must be a valid UUID',
  }),
});

const updateExperienceParamsSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'any.required': 'Experience ID is required',
    'string.guid': 'Experience ID must be a valid UUID',
  }),
});

const updateExperienceBodySchema = Joi.object({
  organization_name: Joi.string().max(255).optional(),
  position: Joi.string().max(255).optional(),
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().optional().allow(null),
  userId: Joi.string().uuid().optional(),
  schoolId: Joi.string().uuid().optional(),
}).min(1).messages({
  'object.min': 'At least one field is required to update',
});

const deleteExperienceSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'any.required': 'Experience ID is required',
    'string.guid': 'Experience ID must be a valid UUID',
  }),
});

export default {
  createExperienceSchema,
  getExperiencesBySchoolIdSchema,
  getExperienceByIdSchema,
  updateExperienceParamsSchema,
  updateExperienceBodySchema,
  deleteExperienceSchema,
};