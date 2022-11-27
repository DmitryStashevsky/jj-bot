const { google } = require('googleapis');

const { getAuthClient } = require('./google.config.js');
const { extractSpreedsheetData } = require('./helper.js');

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
     
        return extractSpreedsheetData(data);
     };


    async getLessons(lessonType) {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, lessonType + '!A1:A10');
        return values.map(x => x[0]);
    }

    async getFreeSlots() {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, 'Private Lessons!A1:B10');
        return values.filter(x => !x[1]).map(x => x[0]);
    }
}

module.exports = Repository;