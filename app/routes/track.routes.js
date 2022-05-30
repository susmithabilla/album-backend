module.exports = app => {
  const tracks = require("../controllers/track.controller.js");
  var router = require("express").Router();
  // Create a new track 
  router.post("/:albumId/tracks/", tracks.create);
 
 
  app.use('/api/albums', router);
};