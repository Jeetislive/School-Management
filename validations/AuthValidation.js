import Joi from 'joi';

// ✅ Common fields reused in multiple schemas
const uuid = Joi.string().guid({ version: 'uuidv4' });
const email = Joi.string().email().max(100);
const password = Joi.string().min(6).max(100);
const tempPassword = Joi.string().max(50);
const phone = Joi.string().length(10).pattern(/^[0-9]+$/);
const url = Joi.string().uri().max(500);
const gender = Joi.string().valid('male', 'female', 'other');
const date = Joi.date().iso(); // Format: YYYY-MM-DD

const signupSchema = Joi.object({
  username: Joi.string().max(50).optional(),
  firstName: Joi.string().max(100).required(),
  lastName: Joi.string().max(100).optional().allow(''),
  email: email.required(),
  password: password.required(),
  tempPassword: tempPassword.optional().allow(null, ''),
  schoolId: uuid.optional().allow(null),
  address: Joi.string().optional().allow(null, ''),
  phone: phone.optional().allow(null, ''),
  specialization: Joi.string().max(100).optional().allow(null, ''),
  rollNumber: Joi.string().max(5).optional().allow(null, ''),
  role: Joi.string().valid('superadmin', 'admin', 'teacher', 'student').required(),
  parentEmail: email.optional().allow(null, ''),
  isActive: Joi.boolean().optional(),
  isTempPassword: Joi.boolean().optional(),
  system_defined: Joi.boolean().optional(),
  departmentId: uuid.optional().allow(null),
  profilePicture: url.optional().allow(null, ''),
  gender: gender.optional().allow(null),
  dateOfBirth: date.optional().allow(null),
  classId : uuid.optional().allow(null)
});

// ✅ Login Schema
const loginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});
// 🔐 Logout: expects a refresh token to be sent
const logoutSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
// 🔁 Reset Password: could be used for both admin-triggered or user-forgot flows
const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().min(6).max(100).required(),
  confirmPassword: Joi.any()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({ 'any.only': 'Passwords do not match' }),
});

export default {
    signupSchema,
    loginSchema,
    logoutSchema,
    resetPasswordSchema,
}
