class Step {
    message = '';
    command = '';
    nextSteps = [];
    messageToJj;

    getMessage() {
        let message = this.message;
        for (let childMessage of this.nextSteps) {
            console.log(childMessage);
            message += `\n${childMessage.command}`
        }
        return message;
    }

    getPrivateMessage(msg) {};

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