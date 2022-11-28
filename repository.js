const { google } = require('googleapis');

const { getAuthClient } = require('./google.config.js');
const { extractSpreedsheetData, extractFreeSlotsForPrivateLessons } = require('./helper.js');

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

     setValuesData = async ( apiClient, range, value) => {
        let values = [
            [
              value
            ]
          ];
          const resource = {
            values,
          };

        await apiClient.values.update( {
            spreadsheetId : '1xUq6Ac3ypomJBxH6pZl-AADuZYnxVcq1U1-BBzsHd8o',
            range: range,
            valueInputOption: 'RAW',
            resource: resource
        } );
     };


    async getLessons(lessonType) {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, lessonType + '!A1:A10');
        return values.map(x => x[0]);
    }

    async getPrivateLessons() {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, 'Private Lessons!A1:C10');
        return extractFreeSlotsForPrivateLessons(values);
    }

    async participatePrivateLesson(lessonId, username) {
        const apiClient = await this.getApiClient();
        await this.setValuesData(apiClient, 'Private Lessons!C' + lessonId, username);
    }
}

module.exports = Repository;