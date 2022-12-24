const Step = require('./step.js');
const i18n = require('../i18n.config.js');

class GroupLessons extends Step {
    constructor(message, command, getLessonsFunc) {
        super(message, command);
        this.getLessonsFunc = getLessonsFunc;
    }

    async init () {
        this.lessons = await this.getLessonsFunc();
    }

    setAdditionalMessage()  {
        if (this.lessons.length == 0) {
            this.additionalMessage = i18n.__('noClassesCommand');
        }
    }

    async setButtons() {
        if (this.nextSteps.length) {
            const options = [];
            for (let i = 0; i < this.lessons.length; i++) {
                const lesson = this.lessons[i];
                options.push([{
                    text: `${i+1} - ${lesson.name} - ${lesson.time} -${lesson.place}`,
                    callback_data: `${this.nextSteps[0].command} ${lesson.id}`,
                }]);
            }
            this.buttons = {
                "reply_markup": {
                    "inline_keyboard": options
                }
            }
        }

        return null;
    }
}

module.exports = GroupLessons;