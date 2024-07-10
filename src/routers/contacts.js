import { Router } from 'express';
import {
  getContactsControllers,
  getContactByIdControllers,
  addContactControllers,
  updateContactControllers,
  patcContactController,
  deleteContactController,
} from '../conrollers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import isValidId from '../middlewares/isValidId.js';
import validateBody from '../middlewares/validateBody.js';
import {
  contactAddSchem,
  contactUpdateSchem,
} from '../validation/contact-schems.js';

const ContactsRouter = Router();

ContactsRouter.get('/', ctrlWrapper(getContactsControllers));

ContactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdControllers),
);

ContactsRouter.post(
  '/',
  validateBody(contactAddSchem),
  ctrlWrapper(addContactControllers),
);

ContactsRouter.put(
  '/:contactId',
  isValidId,
  validateBody(contactAddSchem),
  ctrlWrapper(updateContactControllers),
);

ContactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(contactUpdateSchem),
  ctrlWrapper(patcContactController),
);

ContactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default ContactsRouter;
