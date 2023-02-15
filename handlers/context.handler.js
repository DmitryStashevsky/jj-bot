const { extractString, extractStrings } = require('../regex.handler.js');

const numberSeparator = '%';
const stringSeparator = '$';
const arraySeparator = '#';

hasData = (command) => {
    return command ? command.includes(numberSeparator) || command.includes(stringSeparator) || command.includes(arraySeparator) : false;
}

addMessageContext = (command, params) => {
    let numberRepresentation = '';
    let stringRepresentation = '';
    let arrayOfStringsRepresentation = '';
    if (params.number) {
        numberRepresentation = `${numberSeparator}${params.number}${numberSeparator}`;
    }
    if (params.string) {
        stringRepresentation = `${stringSeparator}${params.string}${stringSeparator}`;
    }
    if (params.array) {
        arrayOfStringsRepresentation = `${arraySeparator}${params.array.join()}${arraySeparator}`;
    }
    return command
        .concat(numberRepresentation)
        .concat(stringRepresentation)
        .concat(arrayOfStringsRepresentation);
}

getMessageContext = (chatId, from, message, text) => {
    return {
        id: extractString(text, numberSeparator),
        type: extractString(text, stringSeparator),
        types: extractStrings(text, arraySeparator),
        chatId: chatId,
        from: from,
        message: message
    }
}

module.exports = {
    hasData,
    addMessageContext,
    getMessageContext
}