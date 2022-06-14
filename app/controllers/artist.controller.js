const db = require("../models");
const Artist = db.artists;
const Op = db.Sequelize.Op;
const fs = require("fs");
// Create and Save a new artist
exports.create = (req, res) => {
    // Validate request
    if (!req.query.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a artist
    const artist = {
      name: req.query.name,
      description: req.query.description,
      fileType:req.file != undefined ? req.file.mimetype: null,
      fileName:req.file != undefined ? req.file.originalname: null,
      data:req.file != undefined ? fs.readFileSync(
        __basedir + "/resources/images/" + req.file.filename): null
  
    };
    // Save artist in the database
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
   // Find a single artist with an id
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
 
   // Delete all artists from the database.
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
 
  // Delete a artist with the specified id in the request
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
  exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    Artist.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || " error occurred while retrieving albums."
        });
      });
  };
 
  // Update a artist by the id in the request
  exports.update = (req, res) => {
    const id = req.params.id;
    Artist.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Artist was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Artist with id=${id}. Maybe Artist was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Artist with id=" + id
        });
      });
  };