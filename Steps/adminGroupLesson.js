const Step = require('./step.js');
const { Status } = require('../enums.js');
const i18n = require('../i18n.config.js');
const {extractNumber, extractString} = require('../regex.handler.js');

class AdminGroupsLesson extends Step {
    constructor(message, command, getGroupParticipationFunc) {
        super(message, command);
        this.getGroupParticipationFunc = getGroupParticipationFunc;
        this.isDynamicStep = true;
    }

    async init () {
        const id = extractNumber(this.context.text);
        const type = extractString(this.context.text);
        this.groupParticipation = await this.getGroupParticipationFunc(id, type);
    }

    async setMessage() {
        if(this.groupParticipation) {
            this.message = this.message + ` ${this.groupParticipation.className} - ${this.groupParticipation.type} - ${this.groupParticipation.username} - ${this.groupParticipation.status}`;
        }
        else {
            return false;
        }
    }

    async setButtons() {
        this.buttons.push([{
            text: i18n.__('decline'),
            callback_data: `aGLD - ${this.groupParticipation.id} [${this.groupParticipation.type}]`,
        }]);

        if (this.groupParticipation.status == Status.Pending) {
            this.buttons.push([{
                text: i18n.__('approve'),
                callback_data: `aGLA - ${this.groupParticipation.id} [${this.groupParticipation.type}]`,
            }])
        }
    }
}

module.exports = AdminGroupsLesson;