const db = require("../models");
const Track = db.tracks;
const Op = db.Sequelize.Op;
// Create and Save a new track
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a track
  const track = {
    albumId: req.params.albumId,
    title: req.body.title,
    description: req.body.description,
  };
  // Save track in the database
  Track.create(track)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || " error occurred while creating the track."
      });
    });
};

// Find a single track with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Track.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find track with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving track with id=" + id
      });
    });
};
// Retrieve all tracks from the database.
exports.findAll = (req, res) => {
  const albumId = req.params.albumId;
  
  Track.findAll({ where: {albumId : albumId} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || " error occurred while retrieving tracks."
      });
    });
};