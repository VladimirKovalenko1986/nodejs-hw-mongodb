const emailFormate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactTypeList = ['work', 'home', 'personal'];
const contactfieldList = [
  '_id',
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
  'createdAt',
  'updatedAt',
];

export { emailFormate, contactTypeList, contactfieldList };
