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
  },

  { versionKey: false, timestamps: true }
);

userSchema.post("save", mongooseError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(5).required(),
});

const schemas = {
  registerSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};

// const favoriteJoiSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });
