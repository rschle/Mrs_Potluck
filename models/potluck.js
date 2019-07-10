module.exports = (sequelize, DataTypes) => {
  const Potluck = sequelize.define("Potluck", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING
    }
  });

  Potluck.associate = function(models) {
    models.Potluck.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Potluck.belongsToMany(models.User, { through: "UserPotluck" });
  };

  Potluck.associate = function(models) {
    models.Potluck.hasMany(models.PotluckItem);
  };
  return Potluck;
};
