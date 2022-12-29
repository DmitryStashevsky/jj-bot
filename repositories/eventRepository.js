const Repository = require('./repository.js');
const {extractEvents, extractEventsParticipants, extractEventParticipant} = require('../helper.js');
const { Status } = require('../enums.js');

class EventRepository extends Repository {
    
    async getEvents(eventType) {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, eventType + '!A2:D11');
        return extractEvents(values);
    }

    async getOwnerEventsParticipations() {
        const apiClient = await this.getApiClient();
        const masterClasses = this.getValuesData(apiClient, 'Master Class!F2:M41');
        const shows = this.getValuesData(apiClient, 'Show!F2:M41');
        const festivals = this.getValuesData(apiClient, 'Festival!F2:M41');
        const result = extractEventsParticipants(await masterClasses).concat(extractEventsParticipants(await shows)).concat(extractEventsParticipants(await festivals));
        result.sort((a) => a.status == Status.Pending ? -1 : 1);
        return result;
    }

    async getOwnerEventParticipation(id, type) {
        const apiClient = await this.getApiClient();
        const cell = new Number(id) + this.countOfHeaders;
        const values = await this.getValuesData(apiClient, `${type}!F${cell}:M${cell}`);
        return extractEventParticipant(values);
    }

    async updateOwnerEventParticipation(id, type, status) {
        const apiClient = await this.getApiClient();
        const cell = new Number(id) + this.countOfHeaders;
        await this.setValuesData(apiClient, `${type}!L${cell}:L${cell}`, [status]);
    }

    async getEventsParticipants(eventType) {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, eventType + '!F2:L41');
        return extractEventsParticipantsList(values);
    }

    async participateEvent(eventType, rowNumber, eventId, eventName, username, chatId, status, type) {
        const apiClient = await this.getApiClient();
        const cell = new Number(rowNumber) + this.countOfHeaders;
        await this.setValuesData(apiClient, `${eventType}!G${cell}:M${cell}`, [eventId, eventName, username, new Date(Date.now()).toUTCString(), chatId, status, type]);
    }
}

const eventRepository = new EventRepository();

module.exports = eventRepository;