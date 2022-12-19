const TelegramBot = require('node-telegram-bot-api');
const MessageHandler = require('./messageHandler.js');

const config = require('config');
const token = config.get('TelegramToken');

const options = {
  webHook: {
    port: process.env.PORT
  }
};

const url = process.env.APP_URL || 'https://jj-dance-bot.herokuapp.com:443';
const bot = new TelegramBot(token, options);
const handler = new MessageHandler(bot);

bot.setWebHook(`${url}/bot${token}`);

bot.on('message', (msg) => {
  handler.onMessage(bot, msg.chat.id, msg.from.language_code, msg.text, msg.from, msg);
});
bot.on('callback_query', function onCallbackQuery(callback) {
  handler.onMessage(bot, callback.message.chat.id, callback.from.language_code, callback.data, 
      callback.from, callback.message);
});
bot.on("polling_error", console.log);