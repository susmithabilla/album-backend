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
          err.message || "Some error occurred while creating the Lesson."
      });
    });
};
