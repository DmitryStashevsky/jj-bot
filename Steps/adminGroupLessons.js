const Step = require('./step.js');
const { getCallBackData, createCallBackData } = require('../callback-data.handler.js');

class AdminGroupLessons extends Step {
    constructor(message, command, getGroupsLessonsParticipationsFunc) {
        super(message, command);
        this.getGroupsLessonsParticipationsFunc = getGroupsLessonsParticipationsFunc;
        this.isDynamicStep = true;
    }

    async init () {
        const {array: lessonTypes} = getCallBackData(this.context.text);
        this.groups = await this.getGroupsLessonsParticipationsFunc(lessonTypes);
    } 

    async setButtons() {
        if (this.groups.length) {
            for (let i = 0; i < this.groups.length; i++) {
                const groupLesson = this.groups[i];
                this.buttons.push([{
                    text: `${i+1} - ${groupLesson.username} - ${groupLesson.status} - ${groupLesson.className}`,
                    callback_data: createCallBackData(this.nextSteps[0].command, {number: groupLesson.id, string: groupLesson.type})
                }]);
            }
        }
    }
}

module.exports = AdminGroupLessons;