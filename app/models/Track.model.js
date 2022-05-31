module.exports = (sequelize, Sequelize) => {
  const Track = sequelize.define("track", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    duration: {
      type: Sequelize.STRING
    }
  });
  return Track;
};