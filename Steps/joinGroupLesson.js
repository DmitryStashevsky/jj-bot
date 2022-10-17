const Step = require('./step.js');

class JoinGroupLesson extends Step {
    constructor(repository) {
        super();
        this.repository = repository;
    }

    message = 'JJ получил ваше сообщение, скоро с Вами свяжутся';
    command = 'Группа'
    isNeedMessageToJj = true;

    getMessage(msg) {
        const lesson = this.getLesson(msg);
        if(lesson) {
            return this.message + `- ${lesson}`;
        }
        else {
            return false;
        }
    }

    getPrivateMessage(msg) {
        const lesson = this.getLesson(msg);
        return `Dancer ${msg.from.username} wants to attend you group class - ${lesson}`;
    }

    getLesson(msg) {
        const matches = msg.text.match(/(\d+)/);
        const lessons = this.repository.getLessons();
        console.log(matches);
        if (!matches) {
            return false;
        }
        const lesson = lessons[matches[0]-1];
        return lesson;
    }
}
module.exports = JoinGroupLesson;