import { getContacts, getContactById } from '../services/contact-services.js';
import createHttpError from 'http-errors';

const getContactsControllers = async (req, res) => {
  const data = await getContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

const getContactByIdControllers = async (req, res, next) => {
  const { contactId } = req.params;

  const data = await getContactById(contactId);

  if (!data) {
    return next(
      createHttpError(404, {
        status: 404,
        message: 'Contact not found',
        data: { message: 'Contact not found' },
      }),
    );
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};

export { getContactsControllers, getContactByIdControllers };
