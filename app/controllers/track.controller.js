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
    duration:req.body.duration
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
// Retrieve all tracks with album id from the database.
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
// Delete a track with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Track.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "track deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete track with id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete track with id=" + id
      });
    });
};
// Delete all tracks 
exports.deleteAll = (req, res) => {
  Track.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} tracks deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || " error occurred while removing all tracks."
      });
    });
};
// Update a track by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Track.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "track updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update track with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating track with id=" + id
      });
    });
};
// Retrieve all Albums from the database.
exports.findAllTracks = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Track.findAll({ where: condition })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error occurred while getting tracks."
      });
    });
};