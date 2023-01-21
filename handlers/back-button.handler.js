const{ metaData }  = require('../cache.config.js');
const previosMessagesKey = 'previosMessages';

handleBackButton = (username, stepName, stepCommand) => {
    let previosMessages = metaData.getMetadata(username, previosMessagesKey) || [];

    // circle steps
    const circleSteps = previosMessages.filter(x => x.stepName == stepName);
    if (circleSteps && circleSteps.length > 0) {
        const circleStep = circleSteps[0];
        const indexOfCircleStep = previosMessages.indexOf(circleStep);
        previosMessages = previosMessages.slice(0, indexOfCircleStep);
    }

    let previosMessage = previosMessages.length !== 0 ? previosMessages[previosMessages.length - 1] : null;

    previosMessages.push({stepName, stepCommand});
    metaData.setMetadata(username, null, previosMessagesKey, previosMessages);

    return previosMessage ? previosMessage.stepCommand : 'Back' + Math.random(5); // need random for changing markup
}

module.exports = {
    handleBackButton
}