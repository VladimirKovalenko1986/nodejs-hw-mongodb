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

const ContactsRouter = Router();

ContactsRouter.get('/', ctrlWrapper(getContactsControllers));

ContactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdControllers),
);

ContactsRouter.post('/', ctrlWrapper(addContactControllers));

ContactsRouter.put(
  '/:contactId',
  isValidId,
  ctrlWrapper(updateContactControllers),
);

ContactsRouter.patch(
  '/:contactId',
  isValidId,
  ctrlWrapper(patcContactController),
);

ContactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default ContactsRouter;
