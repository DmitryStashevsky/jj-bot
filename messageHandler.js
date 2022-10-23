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

    onMessage(bot, chatId, language, text, from, msg) {

            i18n.setLocale(language === 'ru' || language === 'en'
                ? language
                : 'en'
            );

            this.notificationService.log(msg);
            const messagesTree = new MessagesTree(this.repository);
            const currentStep = messagesTree.findCurrentStep(text);
            
            if (currentStep) {
                bot.sendMessage(chatId, currentStep.getMessage(from, msg, text), currentStep.getButtons() || {});

                const nextStep = currentStep.next(text);
                this.notificationService.notify(from, msg, text, nextStep);
            } else {
                bot.sendMessage(chatId, 'Не понимаю сообщение');
            }
    }
}

module.exports = MessageHandler;