const Repository = require('./repository.js');
const {extractClasses, extractFreeSlotsClassesParticipants} = require('../helper.js');

class ClassRepository extends Repository {
    
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
        const cell = new Number(rowNumber) + this.countOfHeaders;
        await this.setValuesData(apiClient, `${lessonType}!G${cell}:L${cell}`, [classId, className, username, new Date(Date.now()).toUTCString(), chatId, status]);
    }
}

const classRepository = new ClassRepository();

module.exports = classRepository;