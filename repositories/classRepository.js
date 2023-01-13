const Repository = require('./repository.js');
const {extractClasses, extractFreeSlotsClassesParticipants, extractOwnerClassesParticipants,
    extractOwnerClassParticipant} = require('../helper.js');

class ClassRepository extends Repository {
    
    async getClasses(lessonType) {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, lessonType + '!A2:E11');
        return extractClasses(values);
    }

    async getClass(id, lessonType) {
        const apiClient = await this.getApiClient();
        const cell = new Number(id) + this.countOfHeaders;
        const values = await this.getValuesData(apiClient, `${lessonType}!A${cell}:E${cell}`);
        return extractClass(values);
    }

    async getClassesParticipants(lessonType) {
        const apiClient = await this.getApiClient();
        const values = await this.getValuesData(apiClient, lessonType + '!G2:N41');
        return extractFreeSlotsClassesParticipants(values);
    }

    async getOwnerClassesParticipants(lessonTypes) {
        const apiClient = await this.getApiClient();
        let result = [];
        for (let lessonType of lessonTypes) {
            const values = await this.getValuesData(apiClient, lessonType + '!G2:N41');
            result = result.concat(extractOwnerClassesParticipants(values));
        }
        return result
    }

    async getOwnerClassParticipation(id, type) {
        const apiClient = await this.getApiClient();
        const cell = new Number(id) + this.countOfHeaders;
        const values = await this.getValuesData(apiClient, `${type}!G${cell}:N${cell}`);
        return extractOwnerClassParticipant(values);
    }

    async updateOwnerClassParticipation(id, type, status) {
        const apiClient = await this.getApiClient();
        const cell = new Number(id) + this.countOfHeaders;
        await this.setValuesData(apiClient, `${type}!M${cell}:M${cell}`, [status]);
    }

    async participateClass(lessonType, rowNumber, classId, className, username, chatId, status) {
        const apiClient = await this.getApiClient();
        const cell = new Number(rowNumber) + this.countOfHeaders;
        await this.setValuesData(apiClient, `${lessonType}!H${cell}:N${cell}`, [classId, className, username, new Date(Date.now()).toUTCString(), chatId, status, lessonType]);
    }
}

const classRepository = new ClassRepository();

module.exports = classRepository;