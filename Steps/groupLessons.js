const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class GroupLessons extends Step {
    constructor(repository) {
        super();
        this.repository = repository;
    }

    message = i18n.__('groupDesc');
    command = i18n.__('groupCommand');

    getMessage() {
        let message = this.message;
        const lessons = this.repository.getLessons();
        for (let i = 0; i < lessons.length; i++) {
            message += `\n${i+1} - ${lessons[i]}`;
        }
        return message;
    }
}

module.exports = GroupLessons;