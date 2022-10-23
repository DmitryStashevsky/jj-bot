class NotificationService {
    bot;

    constructor(bot) {
        this.bot = bot;
    }

    notify(from, message, text, currentStep) {
       if (currentStep.isNeedMessageToJj) {
           this.bot.sendMessage(-748502854, currentStep.getPrivateMessage(from, message, text));
       }
    }

    log(msg) {
        this.bot.sendMessage(-600304726, `User - ${msg.from.username}, say - ${msg.text}`);
     }
}

module.exports = NotificationService;