const i18n = require('./i18n.config.js');
const{ metaData }  = require('./cache.config.js');

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

    async onMessage(bot, chatId, language, text, from, msg) {

            i18n.setLocale(language === 'ru' || language === 'en'
                ? language
                : 'ru'
            );

            this.notificationService.log(msg);
            const messagesTree = new MessagesTree(this.repository, metaData);
            const currentStep = messagesTree.findCurrentStep(text);

            if (currentStep) {
                bot.sendMessage(chatId, await currentStep.getMessage(from, msg, text), await currentStep.getButtons() || {});

                const metaField = currentStep.getMetaField();
                if (metaField) {
                    metaData.setMetadata(from.username, null, metaField, currentStep.getMetaData());
                }

                const nextStep = currentStep.next(text);
                await this.notificationService.notify(from, msg, text, nextStep);
            } else {
                bot.sendMessage(chatId, 'Не понимаю сообщение');
            }
    }
}

module.exports = MessageHandler;