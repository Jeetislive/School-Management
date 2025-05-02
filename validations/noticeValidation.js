import Joi from 'joi';

const createNoticeSchema = Joi.object({
  notice: Joi.string().trim().required().messages({
    'any.required': 'Notice content is required',
    'string.empty': 'Notice content cannot be empty',
  }),
  userId: Joi.string().uuid().required().messages({
    'any.required': 'User ID is required',
    'string.guid': 'User ID must be a valid UUID',
  }),
  schoolId: Joi.string().uuid().required().messages({
    'any.required': 'School ID is required',
    'string.guid': 'School ID must be a valid UUID',
  }),
  classId: Joi.string().uuid().optional().allow(null).messages({
    'string.guid': 'Class ID must be a valid UUID',
  }),
  departmentId: Joi.string().uuid().optional().allow(null).messages({
    'string.guid': 'Department ID must be a valid UUID',
  }),
  status: Joi.string().valid('Draft', 'Published', 'Completed').required().messages({
    'any.only': 'Status must be one of: Draft, Published, Completed',
    'any.required': 'Status is required',
  }),
  publishedAt: Joi.date().optional().messages({
    'date.base': 'Published date must be a valid date',
  }),
  file: Joi.string().uri().max(500).optional().allow(null, '').messages({
    'string.uri': 'File must be a valid URL',
    'string.max': 'File URL must be up to 500 characters',
  }),
});

const getNoticesBySchoolIdSchema = Joi.object({
  schoolId: Joi.string().uuid().required().messages({
    'any.required': 'School ID is required',
    'string.guid': 'School ID must be a valid UUID',
  }),
});

const getNoticeByIdSchema = Joi.object({
  schoolId: Joi.string().uuid().required().messages({
    'any.required': 'School ID is required',
    'string.guid': 'School ID must be a valid UUID',
  }),
  id: Joi.string().uuid().required().messages({
    'any.required': 'Notice ID is required',
    'string.guid': 'Notice ID must be a valid UUID',
  }),
});

const updateNoticeParamsSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'any.required': 'Notice ID is required',
    'string.guid': 'Notice ID must be a valid UUID',
  }),
});

const updateNoticeBodySchema = Joi.object({
  notice: Joi.string().trim().optional(),
  userId: Joi.string().uuid().optional().messages({
    'string.guid': 'User ID must be a valid UUID',
  }),
  schoolId: Joi.string().uuid().optional().messages({
    'string.guid': 'School ID must be a valid UUID',
  }),
  classId: Joi.string().uuid().optional().allow(null).messages({
    'string.guid': 'Class ID must be a valid UUID',
  }),
  departmentId: Joi.string().uuid().optional().allow(null).messages({
    'string.guid': 'Department ID must be a valid UUID',
  }),
  status: Joi.string().valid('Draft', 'Published', 'Completed').optional().messages({
    'any.only': 'Status must be one of: Draft, Published, Completed',
  }),
  publishedAt: Joi.date().optional().messages({
    'date.base': 'Published date must be a valid date',
  }),
  file: Joi.string().uri().max(500).optional().allow(null, '').messages({
    'string.uri': 'File must be a valid URL',
    'string.max': 'File URL must be up to 500 characters',
  }),
}).min(1).messages({
  'object.min': 'At least one field is required to update',
});

const deleteNoticeSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'any.required': 'Notice ID is required',
    'string.guid': 'Notice ID must be a valid UUID',
  }),
});

export default {
  createNoticeSchema,
  getNoticesBySchoolIdSchema,
  getNoticeByIdSchema,
  updateNoticeParamsSchema,
  updateNoticeBodySchema,
  deleteNoticeSchema,
};
