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

            await this.notificationService.log(msg);

            const messagesTree = new MessagesTree(this.repository, metaData);
            const currentStep = messagesTree.findCurrentStep(text, from.username);

            if (currentStep) {
                try {
                    const context = { from: from, message: msg, text: text };
                    await currentStep.handleStep(context);
                
                    await bot.sendMessage(chatId, currentStep.message, currentStep.buttons);

                    if (currentStep.additionalMessage) {
                        await bot.sendMessage(chatId, currentStep.additionalMessage);
                    }

                    if (currentStep.metaField) {
                        metaData.setMetadata(from.username, null, currentStep.metaField, currentStep.metaData);
                    }

                    await this.notificationService.notifyOwner(currentStep.privateMessage);

                } catch (e){
                    await this.notificationService.error(msg, e);
                    await bot.sendMessage(chatId, i18n.__('wrongCommand'));
                }
            } else {
                await bot.sendMessage(chatId, i18n.__('wrongCommand'));
            }
    }
}

module.exports = MessageHandler;