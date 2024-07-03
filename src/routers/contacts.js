import { Router } from 'express';
import {
  getContactsControllers,
  getContactByIdControllers,
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

export default ContactsRouter;
