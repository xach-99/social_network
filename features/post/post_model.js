export default (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: "posts",
        timestamps: true
    });

    return Post;
};