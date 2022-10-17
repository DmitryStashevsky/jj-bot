const Step = require('./step.js');

class JoinPrivateLessons extends Step {
    message = 'Записаться на занятие'
    isNeedMessageToJj = true;

    getPrivateMessage(msg) {
        return `Dancer ${msg.from.username} want to attend you private class`;
    }
}
module.exports = JoinPrivateLessons;