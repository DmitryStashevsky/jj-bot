const Step = require('./step.js');
const i18n = require('../i18n.config.js');

class GroupLessons extends Step {
    constructor(message, command, type, getLessonsFunc) {
        super(message, command);
        this.type = type;
        this.getLessonsFunc = getLessonsFunc;
    }

    async init () {
        this.lessons = await this.getLessonsFunc(this.type);
    }

    setAdditionalMessage()  {
        if (this.lessons.length == 0) {
            this.additionalMessage = i18n.__('noClassesDesc');
        }
    }

    async setButtons() {
        if (this.nextSteps.length) {
            for (let i = 0; i < this.lessons.length; i++) {
                const lesson = this.lessons[i];
                this.buttons.push([{
                    text: `${i+1} - ${lesson.name} - ${getTimeString(lesson.time, lesson.hours)} - ${lesson.place}`,
                    callback_data: `${this.nextSteps[0].command} ${lesson.id} [${this.type}]`,
                }]);
            }
        }
    }
}

module.exports = GroupLessons;