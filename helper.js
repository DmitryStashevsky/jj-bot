
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


module.exports = {
    extractSpreedsheetData
}