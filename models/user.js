const { Schema, model } = require("mongoose");
const { mongooseError } = require("../helpers");

const Joi = require("joi");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 5,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: "",
      required: [true, "Verify token is required"],
    },
  },

  { versionKey: false, timestamps: true }
);

userSchema.post("save", mongooseError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(5).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    "any.required": ` missing required field email`,
  }),
});

const schemas = {
  registerSchema,
  subscriptionSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
