import { Auth, Follow } from "../../model/index.js";

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
}

export default new FollowService();