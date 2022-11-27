const { google } = require('googleapis');

const { getAuthClient } = require('./google.config.js');

class Repository {
    
    getApiClient = async () => {
        const authClient = await getAuthClient();
        const { spreadsheets: apiClient } = google.sheets( {
            version : 'v4',
            auth    : authClient,
        } );
     
        return apiClient;
     };

    getValuesData = async ( apiClient, range ) => {
        const { data } = await apiClient.get( {
            spreadsheetId : '1xUq6Ac3ypomJBxH6pZl-AADuZYnxVcq1U1-BBzsHd8o',
            ranges: range,
            fields: 'sheets',
            includeGridData : true,
        } );
     
        return data.sheets[0].data[0].rowData;
     };


    async getLessons() {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, 'BachataClasses!A1:B3');
        console.log(values.values[0]);
        return values.map(x => x.values[0].formattedValue);
    }

    getFreeSlots() {
        //TODO add db
        return [
            'Вторник 18 00 - 19 00',
            'Среда 21 00 - 22 00',
            'Суббота 14 00 - 15 00'
        ];
    }
}

module.exports = Repository;