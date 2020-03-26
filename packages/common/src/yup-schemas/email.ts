import * as yup from 'yup';

export const emailRules = {
  emailNotLongEnough: 'Email must be at least 3 characters',
  invalidEmail: 'Email must be a valid email',
};

export const emailValidationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailRules.emailNotLongEnough)
    .max(255)
    .email(emailRules.invalidEmail),
});
