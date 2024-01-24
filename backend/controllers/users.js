const { v4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const joi = require('joi');
require('dotenv').config({ path: 'process.env' });

const users = require('../models/users');

const getUsers = async (req, res) => {
  console.log(process.env.JWT_KEY);
  try {
    const response = await users.findAll();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await users.findById(id);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  const schema = joi.object({
    name: joi.string().min(3).max(30).required()
      .messages({
        'string.min': 'Name must be at least 3 characters long',
        'string.empty': 'Name is required',
        'any.required': 'Name is required',
      }),
    email: joi.string().email().required().messages({
      'string.email': 'Email must be a valid email',
      'string.empty': 'Email is required',
      'any.required': 'Email is required',
    }),
    password: joi.string().min(6).max(30).required()
      .messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.empty': 'Password is required',
        'any.required': 'Password is required',
      }),
  });

  const { error } = schema.validate({ name, email, password });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const exist = await users.findByEmail(email);
  if (exist.length > 0) {
    return res.status(422).json({ error: 'Could not create user, user exist' });
  }

  let hashedPassword;
  try {
    // Parameters, the string to hash, salt length to generate or salt to use
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).json({ error: 'Could not create user, try again' });
  }

  const newUser = {
    id: v4(),
    name,
    email,
    password: hashedPassword,
  };

  try {
    const result = await users.create(newUser);
    if (!result) {
      return res.status(500).json({ error: 'Something went wrong creating the user' });
    }

    const token = jwt.sign(
      {
        id: newUser.id, // payload, anything that make sense and
        email: newUser.email, // what you might need on the frontend
      },
      process.env.JWT_KEY, // secret key
      { expiresIn: '1h' }, // options like an experation time
    );

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      token,
    });
  } catch (err) {
    console.log(err);
    console.log(process.env.JWT_KEY);
    return res.status(500).json({ error: 'Signup failed, please try again' });
  }
};

const loginUser = async (req, res) => {
  // TODO: MISSING VALIDATION
  const { email, password } = req.body;
  let identifiedUser;
  try {
    const result = await users.findByEmail(email);
    if (!result[0]) {
      return res.status(401).json({ error: 'Could not identify user, credetials might be wrong' });
    }

    identifiedUser = result[0];
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong with login in the user' });
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Could not log you in , check your credetials' });
  }
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Could not identify user, credetials might be wrong' });
  }
  let token;
  try {
    token = jwt.sign(
      {
        id: identifiedUser.id, // payload, anything that make sense and
        email: identifiedUser.email, // what you might need on the frontend
        name: identifiedUser.name,
      },
      process.env.JWT_KEY, // secret key
      { expiresIn: '1h' }, // options like an experation time
    );
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong with login in the user' });
  }
  res.status(201).json({
    id: identifiedUser.id,
    email: identifiedUser.email,
    name: identifiedUser.name,
    token,
  });
};

module.exports = {
  getUsers,
  getUserById,
  signUpUser,
  loginUser,
};
