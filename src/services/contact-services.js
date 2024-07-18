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

  if (filter.userId) {
    databaseQuery.where('userId').equals(filter.userId);
  }

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

  const totalItems = await Contact.find().countDocuments();
  console.log('totalItems', totalItems);

  const { totalPages, hasNextPage, hasPreviousPage } = calcPaginationData({
    total: totalItems,
    page,
    perPage,
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

// const getContactById = (id) => Contact.findById(id);
const getContact = (id) => {
  return Contact.findOne({ _id: id });
};

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

export { getContacts, getContact, addContact, upsertContact, deleteContact };
