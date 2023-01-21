const config = require('config');
const adminWhiteList = config.get('AdminList');
const banList = config.get('BanList');

hasAccessToBot = (username) => {
    return !banList.includes(username);
}

hasAccessToAdmin = (username) => {
    return adminWhiteList.includes(username);
}

module.exports = {
    hasAccessToBot,
    hasAccessToAdmin
}