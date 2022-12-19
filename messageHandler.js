const i18n = require('./i18n.config.js');
const{ metaData }  = require('./cache.config.js');

const MessagesTree = require('./Steps/messagesTree.js');
const NotificationService = require('./notificationService.js');
const Repository = require('./repository.js');

class MessageHandler {
    constructor(bot) {
        this.notificationService = new NotificationService(bot);
        this.repository = new Repository();
    }

    async onMessage(bot, chatId, language, text, from, msg) {
            i18n.init(language);

            this.notificationService.log(msg);
            const messagesTree = new MessagesTree(this.repository, metaData);
            const currentStep = messagesTree.findCurrentStep(text);

            if (currentStep) {

                try {
                    await currentStep.handleStep(from, msg, text);
                } catch (e){
                    console.log(e);
                }
                
                await bot.sendMessage(chatId, currentStep.message, currentStep.buttons);

                if (currentStep.metaField) {
                    metaData.setMetadata(from.username, null, currentStep.metaField, currentStep.metaData);
                }

                await this.notificationService.notify(currentStep.privateMessage);
            } else {
                bot.sendMessage(chatId, 'Не понимаю сообщение');
            }
    }
}

module.exports = MessageHandler;