// validation/class.validation.js
import Joi from 'joi';

const uuid = Joi.string().guid({ version: 'uuidv4' });

const createClassSchema = Joi.object({
  name: Joi.string().max(155).required(),
  schoolId: uuid.required(),
  departmentId: uuid.optional().allow(null),
});
const getAllClassesSchema = Joi.object({
  schoolId: uuid.required(),
});

export default {
    createClassSchema,
    getAllClassesSchema,
    // Add other validation schemas as needed
}