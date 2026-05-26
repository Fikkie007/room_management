import { ValidationError } from 'yup';

export const formatYupErrors = (error) => {
  const errors = {};
  error.inner.forEach((err) => {
    if (!errors[err.path]) {
      errors[err.path] = err.message;
    }
  });
  return errors;
};