const Step = require('./step.js');
const i18n = require('../i18n.config.js');
const {getCalendarEvent, getTime, getTimeString} = require('../calendar.js');
const { Status } = require('../enums.js');
const {extractNumber} = require('../regex.handler.js');

class AdminPrivateLessonAction extends Step {
    constructor(message, command, userMessage, newStatus, getPrivateLessonFunc, updatePrivateLessonFunc, notifyUserFunc) {
        super(message, command);
        this.userMessage = i18n.__(userMessage);
        this.newStatus = newStatus;
        this.getPrivateLessonFunc = getPrivateLessonFunc;
        this.updatePrivateLessonFunc = updatePrivateLessonFunc;
        this.notifyUserFunc = notifyUserFunc;
        this.isDynamicStep = true;
        this.isBackAvailable = false;
    }

    async init () {
        const id = extractNumber(this.context.text);
        this.privateLesson = await this.getPrivateLessonFunc(id);
    }

    setUserMessage() {
        this.userMessage += ` - ${getTimeString(this.privateLesson.time, this.privateLesson.countOfHours)} - ${this.privateLesson.dance}`;
    }

    setFileMessage() {
        if (this.privateLesson.status == Status.Pending && this.newStatus == Status.Declined){
            //Do nothing
        } else {
            const {startDate, endDate} = getTime(this.privateLesson.time, this.privateLesson.countOfHours);
            const {uid, event, filename} = getCalendarEvent(`Private lesson - ${this.context.from.username}`, 'D43', startDate, endDate, this.privateLesson.uid);
            this.privateLesson.uid = uid;
            this.fileMessage = {filename, file: event};
        }
    }

    async finish() {
        await this.updatePrivateLessonFunc(this.privateLesson.id,  this.privateLesson.uid);
        await this.notifyUserFunc(this.privateLesson.chatId, this.userMessage)
    }
}

module.exports = AdminPrivateLessonAction;