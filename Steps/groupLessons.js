const Step = require('./step.js');

class GroupLessons extends Step {
    constructor(repository) {
        super();
        this.repository = repository;
    }

    message = 'Групповые занятия, чтобы записаться набери !Группа и номер группы';
    command = 'Группы';

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