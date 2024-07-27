import { Router } from 'express';
import {
  getContactsControllers,
  getContactByIdControllers,
  addContactControllers,
  updateContactControllers,
  patchContactController,
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
import upload from '../middlewares/upload.js';

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
  // upload.array('photo', 8) - якщо декілька файлів 8 - кількість файлів
  // upload.filds([{'name': 'photo', 'maxCount': 1}]) - якщо декілька полів з декількамі кількістю файлів
  upload.single('photo'),
  validateBody(contactAddSchem),
  ctrlWrapper(addContactControllers),
);

contactsRouter.put(
  '/:contactId',
  upload.single('photo'),
  isValidId,
  validateBody(contactAddSchem),
  ctrlWrapper(updateContactControllers),
);

contactsRouter.patch(
  '/:contactId',
  upload.single('photo'),
  isValidId,
  validateBody(contactUpdateSchem),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;
