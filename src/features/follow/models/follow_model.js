export default (sequelize, DataTypes) => {
    const Follow = sequelize.define("Follow", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    }, {
        tableName: "follows",
        timestamps: true,
    });

    return Follow;
};
