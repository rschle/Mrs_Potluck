module.exports = (sequelize, DataTypes) => {
  const PotluckItem = sequelize.define("PotluckItem", {
    item: DataTypes.STRING,
    category: DataTypes.STRING,
    person: DataTypes.STRING
  });

  PotluckItem.associate = function(models) {
    models.PotluckItem.belongsTo(models.Potluck, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return PotluckItem;
};
