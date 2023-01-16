const Repository = require('./repository.js');
const {extractEvents, extractEvent, extractEventsParticipants, extractEventParticipant} = require('../helper.js');
const { Status } = require('../enums.js');

class EventRepository extends Repository {
    
    async getEvents(eventType) {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, eventType + '!A2:E11');
        return extractEvents(values);
    }

    async getEvent(id, eventType) {
        const apiClient = await this.getApiClient();
        const cell = new Number(id) + this.countOfHeaders;
        const values = await this.getValuesData(apiClient, `${eventType}!A${cell}:E${cell}`);
        return extractEvent(values);
    }

    async getOwnerEventsParticipations() {
        const apiClient = await this.getApiClient();
        const masterClasses = this.getValuesData(apiClient, 'Master Class!G2:N41');
        const shows = this.getValuesData(apiClient, 'Show!G2:N41');
        const festivals = this.getValuesData(apiClient, 'Festival!G2:N41');
        const result = extractEventsParticipants(await masterClasses).concat(extractEventsParticipants(await shows)).concat(extractEventsParticipants(await festivals));
        result.sort((a) => a.status == Status.Pending ? -1 : 1);
        return result;
    }

    async getOwnerEventParticipation(id, type) {
        const apiClient = await this.getApiClient();
        const cell = new Number(id) + this.countOfHeaders;
        const values = await this.getValuesData(apiClient, `${type}!G${cell}:N${cell}`);
        return extractEventParticipant(values);
    }

    async updateOwnerEventParticipation(id, type, status) {
        const apiClient = await this.getApiClient();
        const cell = new Number(id) + this.countOfHeaders;
        await this.setValuesData(apiClient, `${type}!M${cell}:M${cell}`, [status]);
    }

    async getEventsParticipants(eventType) {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, eventType + '!G2:N41');
        return extractEventsParticipantsList(values);
    }

    async participateEvent(eventType, rowNumber, eventId, eventName, username, chatId, status, type) {
        const apiClient = await this.getApiClient();
        const cell = new Number(rowNumber) + this.countOfHeaders;
        await this.setValuesData(apiClient, `${eventType}!H${cell}:N${cell}`, [eventId, eventName, username, new Date(Date.now()).toUTCString(), chatId, status, type]);
    }
}

const eventRepository = new EventRepository();

module.exports = eventRepository;