
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
        place: x[3],
    }));
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

extractFreeSlotsForPrivateLessons = (slots) => {
    return slots.filter(x => !x[2] && x[0]).map(x => ({
        id: x[0],
        time: x[1],
    }));
}

extractOwnerPrivateLessons = (lessons) => {
    return lessons.filter(x => x[2] && x[0]).map(x => ({
        id: x[0],
        time: x[1],
        dance: x[2],
        username: x[3]
    }));
}

extractOwnerPrivateLesson = (lessons) => {
    return extractOwnerPrivateLessons(lessons)[0];
}

extractEvents = (events) => {
    return events.filter(x => x[0]).map(x => ({
        id: x[0],
        name: x[1]
    }));
}

extractEventsParticipants = (participants) => {
    return participants.filter(x => x[1]).map(x => ({
        id: x[0],
        eventId: x[1],
        eventName: x[2],
        dancerName: x[3],
        date: x[4]
    }));
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
    extractFreeSlotsClassesParticipants,
    extractSpreedsheetData,
    extractFreeSlotsForPrivateLessons,
    extractEvents,
    extractEventsParticipants
}