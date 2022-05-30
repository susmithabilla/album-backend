const db = require("../models");
const Album = db.albums;
const Op = db.Sequelize.Op;
const fs = require("fs");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.query.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Album
  const request = {
    name: req.query.name,
    artist: req.query.artist,
    description: req.query.description,
    data:req.file != undefined ? fs.readFileSync(
      __basedir + "/resources/images/" + req.file.filename): null,
    fileType:req.file != undefined ? req.file.mimetype: null,
    fileName:req.file != undefined ? req.file.originalname: null

  };
  // Save Album in the database
  Album.create(request)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "error occurred in creating the Album."
      });
    });
};
// Retrieve all Albums from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Album.findAll({ where: condition })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error occurred while getting albums."
      });
    });
};
// Update a Album by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Album.update(req.body, {
    where: { id: id }
  })
    .then(result => {
      if (result == 1) {
        res.send({
          message: "Album record updated successfully."
        });
      } else {
        res.send({
          message: `Error occured while updating the Album with id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error occured while updating Album with id=" + id
      });
    });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Album.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Album was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Album with id=${id}. Maybe Album was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Album with id=" + id
      });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Album.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Albums were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all albums."
      });
    });
};

// Find a single Album with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Album.findByPk(id)
    .then(result => {
    
      if (result) {
        res.send(result);
      } else {
        res.status(404).send({
          message: `Error occured while finding Album with id=${id}.`
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message: "Error occured while retrieving Album with id=" + id
      });
    });
};
