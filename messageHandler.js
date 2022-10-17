const MessagesTree = require('./Steps/messagesTree.js');
const NotificationService = require('./notificationService.js');

class MessageHandler {
    notificationService;

    constructor(bot) {
        this.notificationService = new NotificationService(bot);
    }

    onText(bot) {
        // bot.onText(/Занятия/, (msg, match) => {          
        //     const chatId = msg.chat.id;
        //     const resp = "Понедельник/Среда/Пятница 19 00";
        //     bot.sendMessage(chatId, resp);
        //   });
    }

    onMessage(bot) {
        bot.on('message', (msg) => {
            console.log(msg);
            const chatId = msg.chat.id;
            const messagesTree = new MessagesTree();
            const currentStep = messagesTree.findCurrentStep(msg.text);
            this.notificationService.log(msg);
            bot.sendMessage(chatId, currentStep.getMessage());

            const nextStep = currentStep.next(msg.text);
            this.notificationService.notify(msg, nextStep);
          });
    }
}

module.exports = MessageHandler;