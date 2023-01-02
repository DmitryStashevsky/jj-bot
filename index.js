const TelegramBot = require('node-telegram-bot-api');
const MessageHandler = require('./messageHandler.js');

const config = require('config');
const token = config.get('TelegramToken');

const bot = new TelegramBot(token, {polling: true});
const handler = new MessageHandler();

bot.on('message', (msg) => {
    handler.onMessage(bot, msg.chat.id, msg.from.language_code, msg.text, msg.from, msg);
});
bot.on('callback_query', function onCallbackQuery(callback) {
    handler.onMessage(bot, callback.message.chat.id, callback.from.language_code, callback.data, 
        callback.from, callback.message);
});
bot.on("polling_error", console.log);