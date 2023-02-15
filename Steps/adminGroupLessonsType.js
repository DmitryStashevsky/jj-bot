const Step = require('./baseSteps/step.js');
const i18n = require('../i18n.config.js');
const { Meta } = require('../cache.config.js');
const { addMessageContext } = require('../handlers/context.handler.js');

class AdminGroupLessonsType extends Step {
    constructor(message, command) {
        super(message, command);
    }

    async setButtons() {
        this.buttons = [[{
                text: i18n.__('salsaDesc'),
                callback_data: addMessageContext('AGList', {array: [Meta.SalsaSolo, Meta.SalsaPartner, Meta.SalsaMix]})
            }],
            [{
                text: i18n.__('bachataDesc'),
                callback_data: addMessageContext('AGList', {array: [Meta.BachataSolo, Meta.BachataPartner, Meta.BachataMix]})
            }],
            [{
                text: i18n.__('latinoGrooveDesc'),
                callback_data: addMessageContext('AGList', {array: [Meta.LatinoGrooveSolo, Meta.LatinoGroovePartner, Meta.LatinoGrooveMix]})
            }],
            [{
                text: i18n.__('afroHouseDesc'),
                callback_data: addMessageContext('AGList', {array: [Meta.AfroHouseSolo, Meta.AfroHousePartner, Meta.AfroHouseMix]})
            }]
        ];
    }
}

module.exports = AdminGroupLessonsType;