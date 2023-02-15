const i18n = require('./i18n.config.js');
var {Buffer} = require('node:buffer');
const{ metaData }  = require('./cache.config.js');
const {calendar} = require('./calendar.js');
const {handleBackButton} = require('./handlers/back-button.handler.js');
const {hasAccessToBot} = require('./handlers/access.handler.js');
const {getMessageContext} = require('./handlers/context.handler.js');
const MessagesTree = require('./Steps/messagesTree.js');
const notificationService = require('./notificationService.js');

class MessageHandler {

    async onMessage(bot, chatId, language, text, from, msg) {
        if (hasAccessToBot(from.username)) {
            i18n.init(language);
            calendar.init(language);
            notificationService.init(bot);
            await notificationService.log(msg);

            const messagesTree = new MessagesTree(metaData);
            const currentStep = messagesTree.findCurrentStep(text, from.username);

            if (currentStep) {
                try {
                    const context = getMessageContext(chatId, from, msg, text);
                    await currentStep.handleStep(context);
                    
                    if(currentStep.isBackAvailable) {
                        currentStep.buttons.push([{
                            text: i18n.__('back'),
                            callback_data: handleBackButton(from.username, currentStep.constructor.name, text)
                        }]);
                    }

                    if (msg.from.is_bot) {
                        await bot.editMessageText(currentStep.message, {
                            chat_id: chatId,
                            message_id: msg.message_id,
                            reply_markup:  {inline_keyboard: currentStep.buttons},
                        });
                    } else {
                        await bot.sendMessage(chatId, currentStep.message, {reply_markup: {inline_keyboard: currentStep.buttons}});
                    }

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
}

module.exports = MessageHandler;