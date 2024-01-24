const { v4 } = require('uuid');
const joi = require('joi');
const items = require('../models/items');

const getItems = async (req, res) => {
  try {
    const response = await items.findAll();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

const createItem = async (req, res) => {
  const {
    title, description, image, price, ownerId,
  } = req.body;

  const schema = joi.object({
    title: joi.string().min(3).max(30).required()
      .messages({
        'string.min': 'Title must be at least 3 characters long',
        'string.empty': 'Title is required',
        'any.required': 'Title is required',
      }),
    description: joi.string().min(3).max(200).required()
      .messages({
        'string.min': 'Description must be at least 3 characters long',
        'string.empty': 'Description is required',
        'any.required': 'Description is required',
      }),
    image: joi.string().max(200)
      .messages({
        'string.max': 'Image link must be less than 200 characters long',
      }),
    price: joi.number().min(0).required()
      .messages({
        'number.min': 'Price must be at least 0',
        'number.empty': 'Price is required',
        'any.required': 'Price is required',
      }),
    ownerId: joi.string().required()
      .messages({
        'string.empty': 'Owner ID is required',
        'any.required': 'Owner ID is required',
      }),
  });

  const { error } = schema.validate({
    title, description, image, price, ownerId,
  });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const newItem = {
    id: v4(),
    title,
    description,
    image,
    price,
    ownerId,
  };

  try {
    const result = await items.create(newItem);
    if (!result) {
      return res.status(500).json({ error: 'Something went wrong creating the item' });
    }
    res.status(201).json(newItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const searchItem = async (req, res) => {
  const { title } = req.body;

  try {
    const response = await items.findByItem(title);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await items.findById(id);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getItemByOwnerId = async (req, res) => {
  const { ownerId } = req.params;

  try {
    const response = await items.findByOwnerId(ownerId);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const updateItemById = async (req, res) => {
  const { id } = req.params;
  const {
    title, description, image, price, ownerId,
  } = req.body;

  const updatedItem = {
    id,
    title,
    description,
    image,
    price,
    ownerId,
  };

  try {
    const result = await items.updateById(id, updatedItem);
    if (!result) {
      return res.status(500).json({ error: 'Something went wrong updating the item' });
    }
    res.status(201).json(updatedItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const deleteItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await items.deleteById(id);
    if (!result) {
      return res.status(500).json({ error: 'Something went wrong deleting the item' });
    }
    res.status(201).json(id);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {
  getItems,
  createItem,
  searchItem,
  getItemById,
  getItemByOwnerId,
  updateItemById,
  deleteItemById,
};
