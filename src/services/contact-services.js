import Contact from '../db/Contact.js';
import calcPaginationData from '../utils/calcPaginationData.js';

const getContacts = async ({
  filter,
  page,
  perPage,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const skip = (page - 1) * perPage;
  const databaseQuery = Contact.find();
  if (filter.contactType) {
    databaseQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite) {
    databaseQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const data = await databaseQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await Contact.find().merge(databaseQuery).countDocuments();

  const { totalPages, hasNextPage, hasPreviousPage } = calcPaginationData({
    total: totalItems,
    page: page,
    perPage: perPage,
  });

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

const getContactById = (id) => Contact.findById(id);

const addContact = (data) => Contact.create(data);

const upsertContact = async (filter, data, options = {}) => {
  const result = await Contact.findOneAndUpdate(filter, data, {
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
