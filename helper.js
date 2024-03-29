const { Status } = require('./enums.js');

extractSpreedsheetData = (data) => {
    const result = []
    for (let row of data.sheets[0].data[0].rowData || []) {
        const rowObject = [];
        for (let column of row.values) {
            rowObject.push(column.formattedValue);
        }
        result.push(rowObject);
    }
    return result;
}

extractClasses = (classes) => {
    return classes.filter(x => x[0]).map(x => ({
        id: x[0],
        name: x[1],
        time: x[2],
        hours: x[3],
        place: x[4],
    }));
}

extractClass = (lessons) => {
    return extractClasses(lessons)[0];
}

extractFreeSlotsClassesParticipants = (classes) => {
    return classes.map(x => ({
        id: x[0],
        classId: x[1],
        className: x[2],
        username: x[3],
        date: x[4],
    }));
}

extractOwnerClassesParticipants = (classes) => {
    return classes.filter(x => x[1] && x[6] == Status.Pending)
    .map(x => ({
        id: x[0],
        classId: x[1],
        className: x[2],
        username: x[3],
        date: x[4],
        chatId: x[5],
        status: x[6],
        type: x[7]
    }));
}

extractOwnerClassParticipant =(classes) => {
    return extractOwnerClassesParticipants(classes)[0];
}

extractFreeSlotsForPrivateLessons = (slots) => {
    return slots.filter(x => !x[4] && x[0]).map(x => ({
        id: x[0],
        time: x[1],
        place: x[2],
        countOfHours: x[3],
        dance: x[4]
    }));
}

extractPrivateLessons = (lessons) => {
    return lessons.filter(x => !x[4]).map(x => ({
        id: x[0],
        time: x[1],
        place: x[2],
        countOfHours: x[3]
    }));
}

extractOwnerPrivateLessons = (lessons) => {
    return lessons.filter(x => x[4] && x[0] && x[8] !== Status.Declined).map(x => ({
        id: x[0],
        time: x[1],
        place: x[2],
        countOfHours: x[3],
        dance: x[4],
        username: x[5],
        date: x[6],
        chatId: x[7],
        status: x[8],
        uid: x[9]
    }));
}

extractPrivateLesson = (lessons) => {
    return extractPrivateLessons(lessons)[0];
}

extractOwnerPrivateLesson = (lessons) => {
    return extractOwnerPrivateLessons(lessons)[0];
}

extractEvents = (events) => {
    return events.filter(x => x[0]).map(x => ({
        id: x[0],
        name: x[1],
        time: x[2],
        hours: x[3],
        place: x[4],
    }));
}

extractEvent =(events) => {
    return extractEvents(events)[0];
}

extractEventsParticipants = (participants) => {
    return participants.filter(x => x[1]).map(x => ({
        id: x[0],
        eventId: x[1],
        name: x[2],
        username: x[3],
        time: x[4],
        chatId: x[5],
        status: x[6],
        type: x[7]
    }));
}

extractEventParticipant = (events) => {
    return extractEventsParticipants(events)[0];
}

extractEventsParticipantsList = (participants) => {
    return participants.map(x => ({
        id: x[0],
        eventId: x[1],
        eventName: x[2],
        dancerName: x[3],
        data: x[4]
    }));
}

module.exports = {
    extractClasses,
    extractClass,
    extractFreeSlotsClassesParticipants,
    extractOwnerClassesParticipants,
    extractOwnerClassParticipant,
    extractOwnerPrivateLessons,
    extractOwnerPrivateLesson,
    extractPrivateLessons,
    extractPrivateLesson,
    extractSpreedsheetData,
    extractFreeSlotsForPrivateLessons,
    extractEvents,
    extractEvent,
    extractEventsParticipants,
    extractEventParticipant
}