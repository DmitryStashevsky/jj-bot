extractString = (text, symbol) => {
    const regexp = new RegExp(`(?<=\\${symbol}).+?(?=\\${symbol})`);
    const result = regexp.exec(text);
    return result ? result.pop() : '';
}

extractStrings = (text, symbol) => {
    const data = extractString(text, symbol);
    return data.split(',');
}

module.exports = {
    extractString,
    extractStrings
}