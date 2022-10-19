const i18n = require('./i18n.config.js');

const MessagesTree = require('./Steps/messagesTree.js');
const NotificationService = require('./notificationService.js');
const Repository = require('./repository.js');

class MessageHandler {
    notificationService;

    constructor(bot) {
        this.notificationService = new NotificationService(bot);
        this.repository = new Repository();
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

            i18n.setLocale(msg.from.language_code === 'ru' || msg.from.language_code === 'en'
                ? msg.from.language_code
                : 'en'
            );

            this.notificationService.log(msg);
            const chatId = msg.chat.id;
            const messagesTree = new MessagesTree(this.repository);
            const currentStep = messagesTree.findCurrentStep(msg.text);
            
            const message = currentStep.getMessage(msg);
            if (message) {
                bot.sendMessage(chatId, message);

                const nextStep = currentStep.next(msg.text);
                this.notificationService.notify(msg, nextStep);
            } else {
                bot.sendMessage(chatId, 'Не понимаю сообщение');
            }
          });
    }
}

module.exports = MessageHandler;