class NotificationService {
    bot;

    constructor(bot) {
        this.bot = bot;
    }

    async notify(message) {
       if (message) {
           this.bot.sendMessage(-748502854, message);
       }
    }

    log(msg) {
        this.bot.sendMessage(-600304726, `User - ${msg.from.username}, say - ${msg.text}`);
     }
}

module.exports = NotificationService;