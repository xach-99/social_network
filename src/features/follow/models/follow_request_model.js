export default (sequelize, DataTypes) => {
    const FollowRequest = sequelize.define("Follow_request", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    }, {
        tableName: "follow_requests",
        timestamps: true,
    });

    return FollowRequest;
};