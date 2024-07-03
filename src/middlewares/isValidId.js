import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(
      createHttpError(404, {
        status: 404,
        message: 'Contact not found',
        data: { message: 'Contact not found' },
      }),
    );
  }
  next();
};
export default isValidId;
