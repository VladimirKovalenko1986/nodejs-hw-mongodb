import { Schema, model } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: {
      type: String,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
  },
);

const Contact = model('Contact', contactsSchema);

export default Contact;
