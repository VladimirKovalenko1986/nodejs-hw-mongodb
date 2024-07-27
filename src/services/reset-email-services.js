import User from '../db/User.js';

const requestResetToken = ({ email }) => User.findOne({ email });

const resetPassword = ({ email, _id }) => User.findOne({ email, _id });

export { requestResetToken, resetPassword };
