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
import authenticate from '../middlewares/authenticate.js';
import {
  contactAddSchem,
  contactUpdateSchem,
} from '../validation/contact-schems.js';

const contactsRouter = Router();
contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsControllers));

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdControllers),
);

contactsRouter.post(
  '/',
  validateBody(contactAddSchem),
  ctrlWrapper(addContactControllers),
);

contactsRouter.put(
  '/:contactId',
  isValidId,
  validateBody(contactAddSchem),
  ctrlWrapper(updateContactControllers),
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(contactUpdateSchem),
  ctrlWrapper(patcContactController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;
