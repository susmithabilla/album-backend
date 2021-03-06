module.exports = app => {
  const tracks = require("../controllers/track.controller.js");
  var router = require("express").Router();
  // Create a new track 
  //Retrieve All tracks
  router.post("/:albumId/tracks/", tracks.create);
  
  // Retrieve a single track with id
  router.get("/:albumId/tracks/:id", tracks.findOne);
   // Retrieve all tracks for a album
   router.get("/:albumId/tracks/", tracks.findAll);
 // Delete a track with given id
 router.delete("/:albumId/tracks/:id", tracks.delete);
 // Delete all tracks
 router.delete("/:albumId/tracks/:id", tracks.deleteAll);
 
  // Update a track with id
  router.put("/:albumId/tracks/:id", tracks.update);
  // Retrieve all tracks
  router.get("/0/allTracks", tracks.findAllTracks);
  app.use('/api/albums+', router);
};