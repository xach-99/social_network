import { Auth, Follow, FollowRequest } from "../../model/index.js";

class FollowService {
    async getUserFollowers(userId) {
        const followers = await Follow.findAll({
            where: {
                following_id: userId,
            },
            attributes: [],
            include: [{
                model: Auth,
                as: "follower",
                attributes: [
                    "name",
                    "surname",
                    "username",
                    "picture_url"
                ]
            }]
        });

        return followers?.map(item => item.follower);
    }

    async getUserFollowings(userId) {
        const followings = await Follow.findAll({
            where: {
                follower_id: userId,
            },
            attributes: [],
            include: [{
                model: Auth,
                as: "following",
                attributes: [
                    "name",
                    "surname",
                    "username",
                    "picture_url"
                ]
            }]
        });

        return followings?.map(item => item.following);
    }

    userAlreadyFollow(userId, accountId) {
        return Follow.findOne({
            where: {
                follower_id: userId,
                following_id: accountId
            }
        })
    }

    followUser(userId, accountId) {
        return Follow.create({
            follower_id: userId,
            following_id: accountId
        });
    }

    unfollowUser(userId, accountId) {
        return Follow.destroy({
            where: {
                follower_id: userId,
                following_id: accountId
            }
        });
    }

    userAlreadySentRequest(userId, accountId) {
        return FollowRequest.findOne({
            where: {
                sender_id: userId,
                receiver_id: accountId
            }
        })
    }

    sendFollowRequest(userId, accountId) {
        return FollowRequest.create({
            sender_id: userId,
            receiver_id: accountId
        });
    }

    cancelFollowRequest(userId, accountId) {
        return FollowRequest.destroy({
            where: {
                sender_id: userId,
                receiver_id: accountId
            }
        });
    }
}

export default new FollowService();