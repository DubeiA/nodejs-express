const { Schema, model } = require("mongoose");
const { mongooseError } = require("../helpers");

const Joi = require("joi");

const contactRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

const addJoiSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().pattern(contactRegex).required(),
  favorite: Joi.boolean(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactSchema = new Schema(
  {
    name: {
      type: String,

      trim: true,
      minlength: 2,
      maxlength: 50,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,

      lowercase: true,
      validate: {
        validator: function (email) {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return emailRegex.test(email);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },

    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (phone) {
          const phoneRegex = contactRegex;
          return phoneRegex.test(phone);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },

    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", mongooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact, addJoiSchema, favoriteJoiSchema };
