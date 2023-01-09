const Repository = require('./repository.js');
const {extractFreeSlotsForPrivateLessons, extractOwnerPrivateLessons, extractOwnerPrivateLesson, extractPrivateLesson} = require('../helper.js');

class PrivateLessonRepository extends Repository {
    
    async getPrivateLessons() {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, 'Private Lessons!A2:J21');
        return extractFreeSlotsForPrivateLessons(values);
    }

    async getOwnerPrivateLessons() {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, 'Private Lessons!A2:J21');
        return extractOwnerPrivateLessons(values);
    }

    async getPrivateLesson(id) {
        const apiClient = await this.getApiClient();
        const cell = new Number(id) + this.countOfHeaders;
        const values = await this.getValuesData(apiClient, `Private Lessons!A${cell}:J${cell}`);
        return extractOwnerPrivateLesson(values);
    }

    async getFreeSlot(id) {
        const apiClient = await this.getApiClient();
        const cell = new Number(id) + this.countOfHeaders;
        const values = await this.getValuesData(apiClient, `Private Lessons!A${cell}:J${cell}`);
        return extractPrivateLesson(values);
    }

    async participatePrivateLesson(lessonId, dance, username, chatId, status) {
        const apiClient = await this.getApiClient();
        const cell = new Number(lessonId) + this.countOfHeaders;
        await this.setValuesData(apiClient, `Private Lessons!E${cell}:I${cell}`, [dance, username, new Date(Date.now()).toUTCString(), chatId, status]);
    }

    async updatePrivateLesson(lessonId, status, uid) {
        const apiClient = await this.getApiClient();
        const cell = new Number(lessonId) + this.countOfHeaders;
        await this.setValuesData(apiClient, `Private Lessons!I${cell}:J${cell}`, [status, uid]);
    }
}

const privateLessonRepository = new PrivateLessonRepository();

module.exports = privateLessonRepository;