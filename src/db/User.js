import { Schema, model } from 'mongoose';
import { mongooseSaveError, setUpdateSetting } from './hooks.js';
import { authEmailFormate } from '../constants/auth-constants.js';

const userSchems = new Schema(
  {
    name: { type: String, required: [true, 'name must be'] },
    email: {
      type: String,
      match: [authEmailFormate, 'is invalid'],
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchems.post('save', mongooseSaveError);
userSchems.pre('findOneAndUpdate', setUpdateSetting);
userSchems.post('findOneAndUpdate', mongooseSaveError);

const User = model('user', userSchems);

export default User;
