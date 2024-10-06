const express = require("express");
const Museum = require("../models/musuemModel");

const createMuseum = async (req, res) => {
  const museum = new Museum(req.body);
  try {
    await museum.save();
    res.status(201).send(museum);
  } catch (error) {
    res.status(400).send(error);
  }
};

const GetAllMuseums = async (req, res) => {
  const museums = await Museum.find().populate("tags", ["name"]);
  res.send(museums);
};

const GetAllMuseumsByID = async (req, res) => {
  const museum = await Museum.findById(req.params.id);
  if (!museum) return res.status(404).send();
  res.send(museum);
};

const updateMuseum = async (req, res) => {
  try {
    const museum = await Museum.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!museum) return res.status(404).send();
    res.send(museum);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteMuseum = async (req, res) => {
  try {
    const museum = await Museum.findByIdAndDelete(req.params.id);
    if (!museum) return res.status(404).send();
    res.send(museum);
  } catch (error) {
    res.status(500).send(error);
  }
};

const filterByTag = async (req, res) => {
  const tag = req.query.tag;
  try {
    const museums = await Museum.find({ tags: tag });
    res.send(museums);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllCreatedItems = async (req, res) => {
  try {
    const museums = await Museum.find({});
    const activities = await Activity.find({});

    res.send({
      museums,
      activities,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createMuseum,
  GetAllMuseums,
  GetAllMuseumsByID,
  updateMuseum,
  deleteMuseum,
  filterByTag,
  getAllCreatedItems,
};
