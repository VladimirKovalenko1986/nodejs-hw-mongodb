import { HttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    const { status, message } = error;
    res.status(status).json({
      status,
      message,
      data: error.data,
    });
    return;
  }

  const { status = 500, message = 'Something went wrong' } = error;
  res.status(status).json({
    status,
    message,
    data: error.message,
  });

  next(error);
};
