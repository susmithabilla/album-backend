module.exports = app => {
  const tracks = require("../controllers/track.controller.js");
  var router = require("express").Router();
  // Create a new track 
  //Retrieve All tracks
  router.post("/:albumId/tracks/", tracks.create);
  // Retrieve a single track with id
  router.get("/:albumId/tracks/:id", tracks.findOne);
 
  app.use('/api/albums', router);
};