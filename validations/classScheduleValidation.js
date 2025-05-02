import Joi from 'joi';

const createClassScheduleSchema = Joi.object({
  classId: Joi.string().uuid().required().messages({
    'any.required': 'Class ID is required',
    'string.guid': 'Class ID must be a valid UUID',
  }),
  teacherId: Joi.string().uuid().required().messages({
    'any.required': 'Teacher ID is required',
    'string.guid': 'Teacher ID must be a valid UUID',
  }),
  schoolId: Joi.string().uuid().required().messages({
    'any.required': 'School ID is required',
    'string.guid': 'School ID must be a valid UUID',
  }),
  subjectId: Joi.string().uuid().required().messages({
    'any.required': 'Subject ID is required',
    'string.guid': 'Subject ID must be a valid UUID',
  }),
  date: Joi.date().iso().required().messages({
    'any.required': 'Date is required',
    'date.format': 'Date must be in YYYY-MM-DD format',
  }),
  startTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      'string.pattern.base': 'Start time must be in HH:mm format',
      'any.required': 'Start time is required',
    }),
  endTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .custom((value, helpers) => {
      const { startTime } = helpers.state.ancestors[0];
      if (startTime && value <= startTime) {
        return helpers.error('time.endBeforeStart');
      }
      return value;
    })
    .messages({
      'string.pattern.base': 'End time must be in HH:mm format',
      'any.required': 'End time is required',
      'time.endBeforeStart': 'End time must be later than start time',
    }),
});
const getAllClassSchedulesSchema = Joi.object({
    schoolId: Joi.string().uuid().required().messages({
        'any.required': 'School ID is required',
        'string.guid': 'School ID must be a valid UUID',
    }),
    });
const classScheduleIdParamSchema = Joi.object({
    schoolId: Joi.string().uuid().required().messages({
      'any.required': 'School ID is required',
      'string.guid': 'School ID must be a valid UUID',
    }),
    id: Joi.string().uuid().required().messages({
      'any.required': 'ClassSchedule ID is required',
      'string.guid': 'ClassSchedule ID must be a valid UUID',
    }),
  });
const classScheduleClassIdParamSchema = Joi.object({
    schoolId: Joi.string().uuid().required().messages({
      'any.required': 'School ID is required',
      'string.guid': 'School ID must be a valid UUID',
    }),
    classId: Joi.string().uuid().required().messages({
      'any.required': 'Class ID is required',
      'string.guid': 'Class ID must be a valid UUID',
    }),
  });
  
const updateClassScheduleBodySchema = createClassScheduleSchema.fork(
    ['classId', 'teacherId', 'schoolId', 'subjectId', 'date', 'startTime', 'endTime'],
    (schema) => schema.optional()
  ).min(1).messages({
    'object.min': 'At least one field is required to update',
  });
const deleteClassScheduleSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'any.required': 'ClassSchedule ID is required',
    'string.guid': 'ClassSchedule ID must be a valid UUID',
  }),
});

export default {
  createClassScheduleSchema,
  getAllClassSchedulesSchema,
  classScheduleClassIdParamSchema,
  classScheduleIdParamSchema,
  updateClassScheduleBodySchema,
  deleteClassScheduleSchema,
};
  