module.exports = (sequelize, Sequelize) => {
  const Album = sequelize.define("album", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    artist: {
      type: Sequelize.STRING
    },
    fileType: {
      type: Sequelize.STRING,
    },
    fileName: {
      type: Sequelize.STRING,
    },
    data: {
      type: Sequelize.BLOB("long"),
    }
  });
  return Album;
};