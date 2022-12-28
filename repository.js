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

    async participateClass(lessonType, rowNumber, classId, className, username, chatId, status) {
        const apiClient = await this.getApiClient();
        const cell = new Number(rowNumber) + countOfHeaders;
        await this.setValuesData(apiClient, `${lessonType}!G${cell}:L${cell}`, [classId, className, username, new Date(Date.now()).toUTCString(), chatId, status]);
    }

    async getEvents(eventType) {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, eventType + '!A2:D11');
        return extractEvents(values);
    }

    async getEventsParticipants(eventType) {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, eventType + '!F2:L41');
        return extractEventsParticipantsList(values);
    }

    async participateEvent(eventType, rowNumber, eventId, eventName, username, chatId, status) {
        const apiClient = await this.getApiClient();
        const cell = new Number(rowNumber) + countOfHeaders;
        await this.setValuesData(apiClient, `${eventType}!G${cell}:L${cell}`, [eventId, eventName, username, new Date(Date.now()).toUTCString(), chatId, status]);
    }

    async getPrivateLessons() {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, 'Private Lessons!A2:C11');
        return extractFreeSlotsForPrivateLessons(values);
    }

    async getOwnerPrivateLessons() {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, 'Private Lessons!A2:G11');
        return extractOwnerPrivateLessons(values);
    }

    async getPrivateLesson(id) {
        const apiClient = await this.getApiClient();
        const cell = new Number(id) + countOfHeaders;
        const values = await this.getValuesData(apiClient, `Private Lessons!A${cell}:G${cell}`);
        return extractOwnerPrivateLesson(values);
    }

    async participatePrivateLesson(lessonId, dance, username, chatId, status) {
        const apiClient = await this.getApiClient();
        const cell = new Number(lessonId) + countOfHeaders;
        await this.setValuesData(apiClient, `Private Lessons!C${cell}:G${cell}`, [dance, username, new Date(Date.now()).toUTCString(), chatId, status]);
    }

    async updatePrivateLesson(lessonId, status) {
        const apiClient = await this.getApiClient();
        const cell = new Number(lessonId) + countOfHeaders;
        await this.setValuesData(apiClient, `Private Lessons!G${cell}:G${cell}`, [status]);
    }
}

module.exports = Repository;