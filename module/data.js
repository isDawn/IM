
/**
 * 数据存储
*/

class MessageData {
    constructor() {
        this.instance = null;
        this.userInfo = {};
        this.messageList = [];
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new MessageData();
        }
        return this.instance;
    }

    addUser(userInfo) {
        const { teamId, userId } = userInfo;
        if (!this.userInfo[teamId]) {
            this.userInfo[teamId] = [];
        }
        if (userId) {
            this.userInfo[teamId].push(userId);
        }
    }

    rmUser(teamId, userId) {
        const users = this.userInfo[teamId];
        this.userInfo[teamId] = users.filter((item)=> item !== userId );
    }

    getUser(teamId) {
        return this.userInfo[teamId];
    }

    getMessageData() {
        return this.preState;
    }

    setMessageData() {
        return this.preState;
    }
}

module.exports = MessageData;