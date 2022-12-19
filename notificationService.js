const config = require('config');
const notificationChatId = config.get('NotificationChatId');
const logChatId = config.get('LogsChatId');

class NotificationService {

    constructor(bot) {
        this.bot = bot;
    }

    async notify(message) {
       if (message) {
           this.bot.sendMessage(notificationChatId, message);
       }
    }

    log(msg) {
        this.bot.sendMessage(logChatId, `User - ${msg.from.username}, say - ${msg.text}`);
     }
}

module.exports = NotificationService;