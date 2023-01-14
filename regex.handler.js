extractNumber = (command) => {
    return command.match(/(\d+)/)[0];
}

extractString = (command) => {
    return command.match(/(?<=\[).+?(?=\])/g)[0];
}

extractStrings = (command) => {
    const data = extractString(command);
    return data.split(',');
}

module.exports = {
    extractNumber,
    extractString,
    extractStrings
}