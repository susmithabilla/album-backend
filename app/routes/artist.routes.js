module.exports = app => {
    const artists = require("../controllers/artist.controller.js");
   
    var router = require("express").Router();
    const upload = require("../middleware/upload");
    // Create a new artist
    router.post("/",upload.single("file"), artists.create);
    // Retrieve a single artist with id
    router.get("/:id", artists.findOne);
    // Delete a artist with id
    router.delete("/:id", artists.delete);
    // Delete all artists
    router.delete("/", artists.deleteAll);
    app.use('/api/artists+', router);
  };