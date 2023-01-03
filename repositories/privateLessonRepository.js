const Repository = require('./repository.js');
const {extractFreeSlotsForPrivateLessons, extractOwnerPrivateLessons} = require('../helper.js');

class PrivateLessonRepository extends Repository {
    
    async getPrivateLessons() {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, 'Private Lessons!A2:I21');
        return extractFreeSlotsForPrivateLessons(values);
    }

    async getOwnerPrivateLessons() {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, 'Private Lessons!A2:I21');
        return extractOwnerPrivateLessons(values);
    }

    async getPrivateLesson(id) {
        const apiClient = await this.getApiClient();
        const cell = new Number(id) + this.countOfHeaders;
        const values = await this.getValuesData(apiClient, `Private Lessons!A${cell}:I${cell}`);
        return extractOwnerPrivateLesson(values);
    }

    async participatePrivateLesson(lessonId, dance, username, chatId, status) {
        const apiClient = await this.getApiClient();
        const cell = new Number(lessonId) + this.countOfHeaders;
        await this.setValuesData(apiClient, `Private Lessons!D${cell}:H${cell}`, [dance, username, new Date(Date.now()).toUTCString(), chatId, status]);
    }

    async updatePrivateLesson(lessonId, status, uid) {
        const apiClient = await this.getApiClient();
        const cell = new Number(lessonId) + this.countOfHeaders;
        await this.setValuesData(apiClient, `Private Lessons!H${cell}:I${cell}`, [status, uid]);
    }
}

const privateLessonRepository = new PrivateLessonRepository();

module.exports = privateLessonRepository;