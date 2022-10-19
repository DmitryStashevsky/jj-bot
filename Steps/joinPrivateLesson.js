const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class JoinPrivateLesson extends Step {
    message = i18n.__('joinPrivateLessonDesc');
    command = i18n.__('joinPrivateLessonCommand');
    isNeedMessageToJj = true;

    getPrivateMessage(msg) {
        return `Dancer ${msg.from.username} wants to attend you private class`;
    }
}
module.exports = JoinPrivateLesson;