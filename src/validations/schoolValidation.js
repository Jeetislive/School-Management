import Joi from 'joi';


const email = Joi.string().email().max(255);
const boolean = Joi.boolean();

const createSchoolSchema = Joi.object({
  name: Joi.string().max(255).required(),
  address: Joi.string().required(),
  contactEmail: email.required(),
  isActive: boolean.optional(),
});

const updateSchoolSchema = Joi.object({
  name: Joi.string().max(255).optional(),
  address: Joi.string().optional(),
  contactEmail: email.optional(),
  isActive: boolean.optional(),
}).min(1); // Ensure at least one field is provided for update

export default {
    createSchoolSchema,
    updateSchoolSchema,
};