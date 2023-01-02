const Step = require('./step.js');
const { Status } = require('../enums.js');
const i18n = require('../i18n.config.js');

class AdminGroupsLesson extends Step {
    constructor(message, command, getGroupParticipationFunc) {
        super(message, command);
        this.getGroupParticipationFunc = getGroupParticipationFunc;
        this.isDynamicStep = true;
    }

    async init () {
        const id = this.context.text.match(/(\d+)/)[0];
        const type = this.context.text.match(/(?<=\[).+?(?=\])/g)[0];
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
        const options = [[{
            text: i18n.__('decline'),
            callback_data: `aED - ${this.groupParticipation.id} [${this.groupParticipation.type}]`,
        }]];

        if (this.groupParticipation.status == Status.Pending) {
            options.push([{
                text: i18n.__('approve'),
                callback_data: `aEA - ${this.groupParticipation.id} [${this.groupParticipation.type}]`,
            }])
        }
        this.buttons =  {
            "reply_markup": {
                "inline_keyboard": options
            }
        }
    }
}

module.exports = AdminGroupsLesson;