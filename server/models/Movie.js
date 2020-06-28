/* eslint-disable comma-dangle */
const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Model extends Sequelize.Model {}

  Model.init(
    {
      email: {
        name: DataTypes.STRING,
      },
      poster: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Movie',
    }
  )
  return Model
}
