const Readable = require('stream').Readable
const moment = require('moment');
require('moment/locale/en-gb.js'); 
require('moment/locale/ru.js');
const { ICalendar } = require('datebook');

const calendar = {
    init: (locale) => moment.locale(locale)
}

getCalendarEvent = (title, location, startDate, endDate, uid) => {

    title = uid ? `Declined - ${title}`: title;

    const config = {
        title: title,
        location: location,
        start: startDate,
        end: endDate
    }

    const calendar = new ICalendar(config);

    if (uid) {
        calendar
            .setMeta('UID', uid)
            .addProperty('METHOD', 'CANCEL')
            .addProperty('STATUS', 'CANCELLED');
    } else {
        const stringUID = calendar.getMeta()[0]
        const match = /UID:(.*)/.exec(stringUID);
        uid = match[1];
    }

    return {
        uid: uid,
        filename: `${title}_${startDate.toDateString()}.ics`,
        event: calendar.render()
    }
}

getCalendarFile = (content) => {
    const readable = Readable.from(content, {encoding: 'utf-8'});
    return readable;   
}

getTimeString = (time, countOfHours) => {
    const startDate = moment.parseZone(time);
    const endDate = moment.parseZone(time);
    endDate.add(countOfHours, 'hours');
    return `${startDate.format('LLL')} - ${endDate.format('LLL')}`;
}

getTime = (time, countOfHours) => {
    const startDate = moment.parseZone(time);
    const endDate = moment.parseZone(time);
    endDate.add(countOfHours, 'hours');
    return {startDate: startDate.toDate(), endDate: endDate.toDate()};
}

module.exports = {
    getCalendarEvent,
    getCalendarFile,
    getTimeString,
    getTime,
    calendar
}