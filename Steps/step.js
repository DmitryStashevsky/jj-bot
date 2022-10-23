class Step {
    message = '';
    command = '';
    nextSteps = [];
    messageToJj;

    getMessage(from, message, text)  {
        return this.message;
    }

    getButtons() {
        if (this.nextSteps.length) {
            const buttons = [];
            for (let step of this.nextSteps) {
                buttons.push([{
                    text: step.command,
                    callback_data: step.command,
                    }]
                );
            }
            return {
                reply_markup: {
                    inline_keyboard: buttons
                }
            }
        }

        return null;
    }

    getPrivateMessage(from, message, text) {}

    returnToRoot(){};

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