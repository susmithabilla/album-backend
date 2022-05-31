module.exports = app => {
  const albums = require("../controllers/album.controller.js");
  const upload = require("../middleware/upload");
  var router = require("express").Router();
  // Create a new album
  router.post("/",upload.single("file"), albums.create);
  // Retrieve all albums
  router.get("/", albums.findAll);
   // Update album with id
   router.put("/:id", albums.update);
   router.delete("/:id", albums.delete);
  // Delete all albums
  router.delete("/", albums.deleteAll);
 
   // Retrieve a single album with id
   router.get("/:id", albums.findOne);
   app.use('/api/albums+', router);
};