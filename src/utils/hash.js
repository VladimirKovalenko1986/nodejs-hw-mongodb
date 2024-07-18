import bcrypt from 'bcrypt';

const hashValue = (value) => bcrypt.hash(value, 10);

const compareHash = (value, hash) => bcrypt.compare(value, hash);

export { hashValue, compareHash };
