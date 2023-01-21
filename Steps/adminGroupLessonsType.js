const Step = require('./step.js');
const i18n = require('../i18n.config.js');
const { Meta } = require('../cache.config.js');
const { createCallBackData } = require('../callback-data.handler.js');

class AdminGroupLessonsType extends Step {
    constructor(message, command) {
        super(message, command);
    }

    async setButtons() {
        this.buttons = [[{
                text: i18n.__('salsaDesc'),
                callback_data: createCallBackData('AGList', {array: [Meta.SalsaSolo, Meta.SalsaPartner, Meta.SalsaMix]})
            }],
            [{
                text: i18n.__('bachataDesc'),
                callback_data: createCallBackData('AGList', {array: [Meta.BachataSolo, Meta.BachataPartner, Meta.BachataMix]})
            }],
            [{
                text: i18n.__('latinoGrooveDesc'),
                callback_data: createCallBackData('AGList', {array: [Meta.LatinoGrooveSolo, Meta.LatinoGroovePartner, Meta.LatinoGrooveMix]})
            }],
            [{
                text: i18n.__('afroHouseDesc'),
                callback_data: createCallBackData('AGList', {array: [Meta.AfroHouseSolo, Meta.AfroHousePartner, Meta.AfroHouseMix]})
            }]
        ];
    }
}

module.exports = AdminGroupLessonsType;