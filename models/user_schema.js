const { text } = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const user_Schema = Schema(
  {
    UID: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phNo: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
    },
    user_Role: {
      type: String,
      required: true,
    },
    user_Description: {
      type: String,
    },
    myCases: {
      type: [
        {
          case_id: {
            type: String,
          },
        },
      ],
    },
  },
  {
    // Enable partial updates
    setDefaultsOnInsert: true,
  }
);

user_Schema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

module.exports = mongoose.model("user", user_Schema);
