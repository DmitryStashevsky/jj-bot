
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


module.exports = {
    extractSpreedsheetData,
    extractFreeSlotsForPrivateLessons
}