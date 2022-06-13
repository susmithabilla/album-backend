const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.albums = require("./Album.model.js")(sequelize, Sequelize);
db.tracks = require("./Track.model.js")(sequelize, Sequelize);
db.artists = require("./Artist.model.js")(sequelize, Sequelize);

db.albums.hasMany(db.tracks, {
  as: 'track',
});
db.tracks.belongsTo(db.albums, {
  foreignKey: 'albumId', as: 'album',
});
db.artists.hasMany(db.albums,{
  foreignKey:'artistId', as:'album',onDelete: 'SET NULL',
});
//db.albums.belongsTo(db.artists, {
 // foreignKey: 'artistId', as: 'artists',artists
//});
module.exports = db;