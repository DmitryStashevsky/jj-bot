const i18n = require('../i18n.config.js');

class Step {
    constructor(message, command) {
        this.message = i18n.__(message);
        this.command = i18n.__(command);
        this.additionalMessage = '';
        this.buttons = {};
        this.privateMessage;
        this.userMessage;
        this.fileMessage;
        this.metaDatMessage
        this.nextSteps = [];
        this.messageToJj;
        this.isDynamicStep = false;
    }

    async handleStep(context) {
        this.context = context;
        await this.init();
        await this.setMessage();
        await this.setAdditionalMessage();
        await this.setButtons();
        await this.setMetaMessage();
        await this.setFileMessage();
        await this.setPrivateMessage();
        await this.setUserMessage();
        await this.finish()
    }

    init() {
    }

    setMessage()  {
    }

    setAdditionalMessage()  {
    }

    setButtons() {
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

    setMetaMessage() {
        return this.metaField;
    }

    setPrivateMessage() {
    }

    setUserMessage() {
    }

    setFileMessage() {
    }

    finish() {
    }
}

module.exports = Step;