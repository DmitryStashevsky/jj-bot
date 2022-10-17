const TelegramBot = require('node-telegram-bot-api');
const MessageHandler = require('./messageHandler.js');

const TOKEN = process.env.TELEGRAM_TOKEN || '5624025318:AAEy-wbMfuPT5iF4hO2niyoHGzTo3FA_teA';

const options = {
  webHook: {
    port: process.env.PORT
  }
};

const url = process.env.APP_URL || 'https://jj-dance-bot.herokuapp.com:443';
const bot = new TelegramBot(TOKEN, options);
const handler = new MessageHandler();

bot.setWebHook(`${url}/bot${TOKEN}`);

handler.onText(bot);
handler.onMessage(bot);