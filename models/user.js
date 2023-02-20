const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["guest", "admin"],
      default: "guest",
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    passwordResetAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

const userValidator = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    // .message("Name must not be below 3 characters!")
    .required()
    .messages({
      "string.base": `"name" should be a type of 'text'`,
      "string.empty": `"name" cannot be an empty field`,
      "string.min": `"name" should have a minimum length of {#limit}`,
      "any.required": `"name" is a required field`,
    })
    .lowercase(),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.pattern": `"email" should be a type of email`,
      "string.empty": `"email" cannot be an empty field`,
      "string.min": `"email" should have a minimum length of {#limit}`,
      "any.required": `"email" is a required field`,
    })

    // .label("Email space cannot be empty! Please input your email")
    .lowercase(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .required(),
  // .message("Please enter your password"),
  confirmPassword: Joi.ref("password"),
  // .message("Please confirm your password"),
  role: Joi.string().valid("guest", "admin").default("guest"),
});

//PRE-SAVE MIDDLEWARE
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  //password hashed with salt 12
  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

//INSTANCE METHOD DEFINITION;
userSchema.methods.checkCorrectPassword = async function (
  inputtedPassword,
  truePassword
) {
  return await bcrypt.compare(inputtedPassword, truePassword);
};

module.exports = {
  User,
  userValidator,
};
