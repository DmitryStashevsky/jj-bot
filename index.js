const TelegramBot = require('node-telegram-bot-api');
import process from 'node:process';

// replace the value below with the Telegram token you receive from @BotFather
const token = '5624025318:AAEy-wbMfuPT5iF4hO2niyoHGzTo3FA_teA';

// Create a bot that uses 'polling' to fetch new updates
const options = {
  polling: true,
  port: process.env.PORT || 8080
}

const bot = new TelegramBot(token, options);

// Matches "/echo [whatever]"
bot.onText(/Занятия/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = "Понедельник/Среда/Пятница 19 00"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});