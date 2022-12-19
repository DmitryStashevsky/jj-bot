const i18n = require('../i18n.config.js');

class Step {
    constructor(message, command) {
        this.message = i18n.__(message);
        this.command = i18n.__(command);
        this.buttons = {};
        this.privateMessage;
        this.metaDatMessage
        this.nextSteps = [];
        this.messageToJj;
    }

    async handleStep(from, message, text) {
        await this.init(from, message, text);
        await this.setMessage(from, message, text);
        await this.setButtons(from, message, text);
        await this.setMetaMessage(from, message, text);
        await this.setPrivateMessage(from, message, text);
        await this.finish(from, message, text)
    }

    init(from, message, text) {
    }

    setMessage(from, message, text)  {
    }

    setButtons(from, message, text) {
        if (this.nextSteps.length) {
            const options = [];
            for (let step of this.nextSteps) {
                options.push([{
                    text: step.command,
                    callback_data: step.command,
                    }]
                );
            }
            this.buttons = {
                reply_markup: {
                    inline_keyboard: options
                }
            }
        }

        return null;
    }

    setMetaMessage(from, message, text) {
        return this.metaField;
    }

    setPrivateMessage(from, message, text) {}

    finish(from, message, text) {};

    next(message){
        const found = this.nextSteps.filter(e => e.message.toLocaleLowerCase() 
            === message.toLocaleLowerCase());
        if (found.length > 0) {
            return found[0];
        } else {
            return this;
        }
    };
    previos(){};
}

module.exports = Step;