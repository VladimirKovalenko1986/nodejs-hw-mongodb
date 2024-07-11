import { contactTypeList } from '../constants/contact-constants.js';

const parseBoolian = (value) => {
  if (typeof value !== 'string') return;

  if (!['true', 'false'].includes(value)) return;
  const parsedValue = Boolean(value);

  return parsedValue;
};

const parseContactFilterParams = ({ contactType, isFavourite }) => {
  const parsedContactType = contactTypeList.includes(contactType)
    ? contactType
    : null;

  const parsedIsFavourite = parseBoolian(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};

export default parseContactFilterParams;
