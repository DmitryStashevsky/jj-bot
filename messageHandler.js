class MessageHandler {
    bot1;

    onText(bot) {
        this.bot1 = bot;
        bot.onText(/Занятия/, (msg, match) => {          
            const chatId = msg.chat.id;
            const resp = "Понедельник/Среда/Пятница 19 00";
            bot.sendMessage(chatId, resp);
          });
    }

    onMessage(bot) {
        bot.on('message', (msg) => {
            const chatId = msg.chat.id;
          
            bot.sendMessage(chatId, 'Received your message');
          });
    }
}

module.exports = MessageHandler;