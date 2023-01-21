const Step = require('./step.js');
const { Status } = require('../enums.js');
const i18n = require('../i18n.config.js');
const { getCallBackData, createCallBackData } = require('../callback-data.handler.js');

class AdminGroupsLesson extends Step {
    constructor(message, command, getGroupParticipationFunc) {
        super(message, command);
        this.getGroupParticipationFunc = getGroupParticipationFunc;
        this.isDynamicStep = true;
    }

    async init () {
        const {number: id, string: type} = getCallBackData(this.context.text);
        this.groupParticipation = await this.getGroupParticipationFunc(id, type);
    }

    async setMessage() {
        if(this.groupParticipation) {
            this.message += ` ${this.groupParticipation.className} - ${this.groupParticipation.type} - ${this.groupParticipation.username} - ${this.groupParticipation.status}`;
        }
        else {
            return false;
        }
    }

    async setButtons() {
        this.buttons.push([{
            text: i18n.__('decline'),
            callback_data: createCallBackData('aGLD', {number: this.groupParticipation.id, string: this.groupParticipation.type})
        }]);

        if (this.groupParticipation.status == Status.Pending) {
            this.buttons.push([{
                text: i18n.__('approve'),
                callback_data: createCallBackData('aGLA', {number: this.groupParticipation.id, string: this.groupParticipation.type})
            }])
        }
    }
}

module.exports = AdminGroupsLesson;