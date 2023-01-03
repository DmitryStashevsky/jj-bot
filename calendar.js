var Readable = require('stream').Readable
const { ICalendar } = require('datebook');

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

getTimeString = (startDate, countOfHours) => {
    const startTime = new Date(startDate);
    const endTime = new Date(startDate);
    endTime.setHours(endTime.getHours() + parseInt(countOfHours));
    return `${startTime.toLocaleString()} - ${endTime.toLocaleString()}`;
}

getTime = (time, countOfHours) => {
    const startDate = new Date(time);
    const endDate = new Date(time);
    endDate.setHours(endDate.getHours() + parseInt(countOfHours));
    return {startDate, endDate};
}

module.exports = {
    getCalendarEvent,
    getCalendarFile,
    getTimeString,
    getTime
}