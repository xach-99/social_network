export default (sequelize, DataTypes) => {
    const PostLike = sequelize.define("post_like", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    }, {
        tableName: "post_likes",
        timestamps: true
    });

    return PostLike;
};