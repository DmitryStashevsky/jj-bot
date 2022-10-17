const Step = require('./step.js');

class JoinPrivateLesson extends Step {
    message = 'JJ получил ваше сообщение, скоро с Вами свяжутся';
    command = 'Приватное'
    isNeedMessageToJj = true;

    getPrivateMessage(msg) {
        return `Dancer ${msg.from.username} wants to attend you private class`;
    }
}
module.exports = JoinPrivateLesson;