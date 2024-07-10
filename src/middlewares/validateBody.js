import createHttpError from 'http-errors';

const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      const rersponseError = createHttpError(400, {
        message: error.message,
        errors: error.details,
      });
      next(rersponseError);
    }
  };
};

export default validateBody;
