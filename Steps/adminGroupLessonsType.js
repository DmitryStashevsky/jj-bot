const Step = require('./step.js');
const i18n = require('../i18n.config.js');
const { Meta } = require('../cache.config.js');

class AdminGroupLessonsType extends Step {
    constructor(message, command) {
        super(message, command);
    }

    async setButtons() {
        const options = [[{
            text: i18n.__('salsaDesc'),
            callback_data: `AGList 1 [${Meta.SalsaSolo},${Meta.SalsaPartner},${Meta.SalsaMix}]`,
        }],
        [{
            text: i18n.__('bachataDesc'),
            callback_data: `AGList 2 [${Meta.BachataSolo},${Meta.BachataPartner},${Meta.BachataMix}]`,
        }],
        [{
            text: i18n.__('latinoGrooveDesc'),
            callback_data: `AGList 3 [${Meta.LatinoGrooveSolo},${Meta.LatinoGroovePartner},${Meta.LatinoGrooveMix}]`,
        }],
        [{
            text: i18n.__('afroHouseDesc'),
            callback_data: `AGList 4 [${Meta.AfroHouseSolo},${Meta.AfroHousePartner},${Meta.AfroHouseMix}]`,
        }]
        ];
        
        this.buttons =  {
            "reply_markup": {
                "inline_keyboard": options
            }
        }
    }
}

module.exports = AdminGroupLessonsType;