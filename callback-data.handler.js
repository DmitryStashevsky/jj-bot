const { extractString, extractStrings } = require('./regex.handler.js');

const numberSeparator = '%';
const stringSeparator = '$';
const arraySeparator = '#';

hasData = (command) => {
    return command.includes(numberSeparator) || command.includes(stringSeparator) || command.includes(arraySeparator);
}

createCallBackData = (command, params) => {
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

getCallBackData = (callback) => {
    return {
        number: extractString(callback, numberSeparator),
        string: extractString(callback, stringSeparator),
        array: extractStrings(callback, arraySeparator)
    }
}

module.exports = {
    hasData,
    createCallBackData,
    getCallBackData
}