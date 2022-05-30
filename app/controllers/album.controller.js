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