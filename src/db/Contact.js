import { Schema, model } from 'mongoose';
import {
  emailFormate,
  contactTypeList,
} from '../constants/contact-constants.js';
import { mongooseSaveError, setUpdateSetting } from './hooks.js';

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, 'name must be'] },
    phoneNumber: { type: String, required: [true, 'phoneNumber must be'] },
    email: {
      type: String,
      match: [emailFormate, 'is invalid'],
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: contactTypeList,
      default: 'personal',
    },
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    photo: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

contactSchema.post('save', mongooseSaveError);
contactSchema.pre('findOneAndUpdate', setUpdateSetting);
contactSchema.post('findOneAndUpdate', mongooseSaveError);

const Contact = model('contact', contactSchema);

export default Contact;
