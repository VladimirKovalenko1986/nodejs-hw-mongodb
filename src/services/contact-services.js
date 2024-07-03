import Contact from '../db/Contact.js';

const getContacts = () => Contact.find();

const getContactById = (id) => Contact.findById(id);

const addContact = (data) => Contact.create(data);

const upsertContact = async (filter, data, options = {}) => {
  const result = await Contact.findByIdAndUpdate(filter, data, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
  if (!result || !result.value) return null;

  const isNew = Boolean(result?.lastErrorObject?.upserted);

  return {
    data: result.value,
    isNew,
  };
};

const deleteContact = (filter) => Contact.findByIdAndDelete(filter);

export {
  getContacts,
  getContactById,
  addContact,
  upsertContact,
  deleteContact,
};
