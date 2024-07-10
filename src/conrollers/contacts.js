import {
  getContacts,
  getContactById,
  addContact,
  upsertContact,
  deleteContact,
} from '../services/contact-services.js';
import createHttpError from 'http-errors';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { contactfieldList } from '../constants/contact-constants.js';
import parseContactFilterParams from '../utils/parseContactFilterParams.js';

const getContactsControllers = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, contactfieldList);
  const filter = parseContactFilterParams(req.query);
  const data = await getContacts({ page, perPage, sortOrder, sortBy, filter });

  res.status(200).json({
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

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};

const addContactControllers = async (req, res) => {
  const data = await addContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

const updateContactControllers = async (req, res) => {
  const { contactId } = req.params;
  const data = await upsertContact({ _id: contactId }, req.body, {
    upsert: true,
  });

  const status = data.isNew ? 201 : 200;
  const message = data.isNew
    ? 'Successfully created a contact!'
    : 'Successfully put a contact!';

  res.status(status).json({
    status: status,
    message: message,
    data: data.value,
  });
};

const patcContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await upsertContact({ _id: contactId }, req.body);

  if (!result) {
    return next(
      createHttpError(404, {
        status: 404,
        message: 'Contact not found',
        data: { message: 'Contact not found' },
      }),
    );
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await deleteContact({ _id: contactId });

  if (!result) {
    return next(
      createHttpError(404, {
        status: 404,
        message: 'Contact not found',
        data: { message: 'Contact not found' },
      }),
    );
  }
  res.status(204).json({
    status: 204,
  });
};

export {
  getContactsControllers,
  getContactByIdControllers,
  addContactControllers,
  updateContactControllers,
  patcContactController,
  deleteContactController,
};
