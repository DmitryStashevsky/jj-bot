const i18n = require('./i18n.config.js');
const{ metaData }  = require('./cache.config.js');

const MessagesTree = require('./Steps/messagesTree.js');
const notificationService = require('./notificationService.js');
const Repository = require('./repositories/repository.js');

class MessageHandler {
    constructor(bot) {
    }

    async onMessage(bot, chatId, language, text, from, msg) {
            i18n.init(language);

            notificationService.init(bot);
            await notificationService.log(msg);

            const messagesTree = new MessagesTree(metaData);
            const currentStep = messagesTree.findCurrentStep(text, from.username);

            if (currentStep) {
                try {
                    const context = { chatId: chatId, from: from, message: msg, text: text };
                    await currentStep.handleStep(context);
                
                    await bot.sendMessage(chatId, currentStep.message, currentStep.buttons);

                    if (currentStep.additionalMessage) {
                        await bot.sendMessage(chatId, currentStep.additionalMessage);
                    }

                    if (currentStep.metaField) {
                        metaData.setMetadata(from.username, null, currentStep.metaField, currentStep.metaData);
                    }

                    await notificationService.notifyOwner(currentStep.privateMessage);

                } catch (e){
                    await notificationService.error(msg, e);
                    await bot.sendMessage(chatId, i18n.__('wrongCommand'));
                }
            } else {
                await bot.sendMessage(chatId, i18n.__('wrongCommand'));
            }
    }
}

module.exports = MessageHandler;