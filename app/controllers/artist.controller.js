const db = require("../models");
const Artist = db.artists;
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
    // Create a Tutorial
    const artist = {
      name: req.query.name,
      description: req.query.description,
      fileType:req.file != undefined ? req.file.mimetype: null,
      fileName:req.file != undefined ? req.file.originalname: null,
      data:req.file != undefined ? fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename): null
  
    };
    // Save Tutorial in the database
    Artist.create(artist)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Album."
        });
      });
  };
   // Find a single Tutorial with an id
   exports.findOne = (req, res) => {
    const id = req.params.id;
    Artist.findByPk(id)
      .then(data => {
      
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Artist with id=${id}.`
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          message: "Error retrieving Artist with id=" + id
        });
      });
  };
 
   // Delete all Tutorials from the database.
   exports.deleteAll = (req, res) => {
    Artist.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Artists were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all artists."
        });
      });
  };
 
  // Delete a Tutorial with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
    Artist.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Artist was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Artist with id=${id}. Maybe Artist was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Artist with id=" + id
        });
      });
  };
 