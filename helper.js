
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

extractFreeSlotsForPrivateLessons = (slots) => {
    return slots.filter(x => !x[2]).map(x => ({
        id: x[0],
        time: x[1]
    }));
}

extractEvents = (events) => {
    return events.filter(x => x[0]).map(x => ({
        id: x[0],
        name: x[1]
    }));
}

extractEventsParticipants = (participants) => {
    return participants.map(x => ({
        id: x[0],
        eventId: x[1],
        eventName: x[2],
        dancerName: x[3],
        data: x[4]
    }));
}

extractEventsParticipantsList = (participants) => {
    return participants.filter(x => x[0]).map(x => ({
        id: x[0],
        eventId: x[1],
        eventName: x[2],
        dancerName: x[3],
        data: x[4]
    }));
}

module.exports = {
    extractSpreedsheetData,
    extractFreeSlotsForPrivateLessons,
    extractEvents,
    extractEventsParticipants
}