const TelegramBot = require('node-telegram-bot-api');
const MessageHandler = require('./messageHandler.js');

const token = '5624025318:AAEy-wbMfuPT5iF4hO2niyoHGzTo3FA_teA';

const bot = new TelegramBot(token, {polling: true});
const handler = new MessageHandler();

handler.onText(bot);
handler.onMessage(bot);