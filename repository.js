const { google } = require('googleapis');

const config = require('config');
const spreadsheetId = config.get('GoogleSpreadSheetId');

const { getAuthClient } = require('./google.config.js');
const { extractSpreedsheetData, extractFreeSlotsForPrivateLessons, extractEvents,
    extractEventsParticipants, extractClasses,
    extractFreeSlotsClassesParticipants,} = require('./helper.js');

const countOfHeaders = 1;

class Repository {
    
    getApiClient = async () => {
        const authClient = await getAuthClient();
        const { spreadsheets: apiClient } = google.sheets( {
            version : 'v4',
            auth    : authClient,
        } );
     
        return apiClient;
     };

    getValuesData = async (apiClient, range) => {
        const { data } = await apiClient.get( {
            spreadsheetId : spreadsheetId,
            ranges: range,
            fields: 'sheets',
            includeGridData : true,
        } );
     
        return extractSpreedsheetData(data);
     };

     setValuesData = async (apiClient, range, value) => {
        let values = value instanceof Array ? 
            [value] : [
            [
              value
            ]
          ];
          const resource = {
            values,
          };

        await apiClient.values.update( {
            spreadsheetId : spreadsheetId,
            range: range,
            valueInputOption: 'RAW',
            resource: resource
        } );
     };


    async getClasses(lessonType) {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, lessonType + '!A2:D11');
        return extractClasses(values);
    }

    async getClassesParticipants(lessonType) {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, lessonType + '!F2:G41');
        return extractFreeSlotsClassesParticipants(values);
    }

    async participateClass(lessonType, rowNumber, classId, className, username) {
        const apiClient = await this.getApiClient();
        await this.setValuesData(apiClient, `${lessonType}!G${new Number(rowNumber) + countOfHeaders}:J${new Number(rowNumber) + countOfHeaders}`, [classId, className, username, new Date(Date.now()).toUTCString()]);
    }

    async getEvents(eventType) {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, eventType + '!A2:B11');
        return extractEvents(values);
    }

    async getEventsParticipants(eventType) {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, eventType + '!D2:H41');
        return extractEventsParticipantsList(values);
    }

    async participateEvent(eventType, rowNumber, eventId, eventName, username) {
        const apiClient = await this.getApiClient();
        await this.setValuesData(apiClient, `${eventType}!E${new Number(rowNumber) + countOfHeaders}:H${new Number(rowNumber) + countOfHeaders}`, [eventId, eventName, username, new Date(Date.now()).toUTCString()]);
    }

    async getPrivateLessons() {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, 'Private Lessons!A1:C10');
        return extractFreeSlotsForPrivateLessons(values);
    }

    async participatePrivateLesson(lessonId, dance, username) {
        const apiClient = await this.getApiClient();
        await this.setValuesData(apiClient, `Private Lessons!C${new Number(lessonId) + countOfHeaders}:E${new Number(lessonId) + countOfHeaders}`, [dance, username, new Date(Date.now()).toUTCString()]);
    }
}

module.exports = Repository;