import redisClient from "./redis";
import dbClient from "./db";

const userUtils = {
    async getUserIdAndKey(request) {
        const obj = { userid: null, key: null};
        const xToken = request.header('X-Token');
        if (!xToken) return obj;

        obj.key =  `auth_${xToken}`;

        obj.userid = await redisClient.get(obj.key);

        return obj;
    },
    async getUser(query){
        const user = await dbClient.userCollection.findOne(query);
        return user;
    },
};

export default userUtils;