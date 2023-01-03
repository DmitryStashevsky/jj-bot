const i18n = require('./i18n.config.js');
var {Buffer} = require('node:buffer');
const{ metaData }  = require('./cache.config.js');
const {getCalendarFile} = require('./calendar.js');

const MessagesTree = require('./Steps/messagesTree.js');
const notificationService = require('./notificationService.js');

class MessageHandler {

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

                    if (currentStep.fileMessage) {
                        const buff = Buffer.from(currentStep.fileMessage.file, 'utf-8');
                        await bot.sendDocument(chatId, buff, {}, {filename: currentStep.fileMessage.filename, contentType: 'text/calendar'});
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