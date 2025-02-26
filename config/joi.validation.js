import joi from 'joi';

// Sign Up Validation Schema
const signUpJoiSchema = joi.object({
  userName: joi
    .string()
    .min(3)
    .max(30)
    .required()
    .pattern(/^[a-zA-Z0-9_ ]+$/)
    .messages({
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username cannot exceed 30 characters',
      'string.pattern.base':
        'Username can only contain letters, numbers, and underscores',
      'any.required': 'Username is required',
    }),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email':
        'Please enter a valid email address (e.g., user@example.com)',
      'any.required': 'Email is required',
    }),
  password: joi
    .string()
    .min(6)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    )
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)',
      'any.required': 'Password is required',
    }),
  confirmedPassword: joi
    .string()
    .valid(joi.ref('password'))
    .required()
    .messages({
      'any.required': 'Confirm Password is required',
      'any.only': 'Passwords do not match',
    }),

});

// sign In validations schema
const signInJoiSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email':
        'Please enter a valid email address (e.g., user@example.com)',
      'any.required': 'Email is required',
    }),
  password: joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required',
  }),
});

export { signUpJoiSchema, signInJoiSchema };
