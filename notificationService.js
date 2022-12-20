const config = require('config');
const notificationChatId = config.get('NotificationChatId');
const logChatId = config.get('LogsChatId');
const isFullLogging = config.get('FullLogging');

class NotificationService {

    constructor(bot) {
        this.bot = bot;
    }

    async notifyOwner(message) {
       if (message) {
           await this.bot.sendMessage(notificationChatId, message);
       }
    }

    async log(msg) {
        if (isFullLogging) {
            await this.bot.sendMessage(logChatId, `Log: User - ${msg.from.is_bot ? msg.chat.username : msg.from.username}, Message - ${msg.text}`);
        }
    }

    async error(msg, error) {
        console.log(msg, error);
        await this.bot.sendMessage(logChatId, `Exception: User - ${msg.from.is_bot ? msg.chat.username : msg.from.username}, Message - ${msg.text}, Error - ${error}`);
    }
}

module.exports = NotificationService;