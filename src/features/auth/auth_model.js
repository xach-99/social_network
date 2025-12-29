export default (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        picture_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        privacy: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: "users",
        timestamps: true
    });

    return User;
}
