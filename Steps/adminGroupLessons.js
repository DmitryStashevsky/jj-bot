const Step = require('./step.js');

class AdminGroupLessons extends Step {
    constructor(message, command, getGroupsLessonsParticipationsFunc) {
        super(message, command);
        this.getGroupsLessonsParticipationsFunc = getGroupsLessonsParticipationsFunc;
        this.isDynamicStep = true;
    }

    async init () {
        const data = this.context.text.match(/(?<=\[).+?(?=\])/g)[0];
        const lessonTypes = data.split(',');
        this.groups = await this.getGroupsLessonsParticipationsFunc(lessonTypes);
    } 

    async setButtons() {
        if (this.groups.length) {
            const options = [];
            for (let i = 0; i < this.groups.length; i++) {
                const groupLesson = this.groups[i];
                options.push([{
                    text: `${i+1} - ${groupLesson.username} - ${groupLesson.status} - ${groupLesson.className}`,
                    callback_data: `${this.nextSteps[0].command} ${groupLesson.id} [${groupLesson.type}]`,
                }]);
            }
            this.buttons =  {
                "reply_markup": {
                    "inline_keyboard": options
                }
            }
        }
    }
}

module.exports = AdminGroupLessons;