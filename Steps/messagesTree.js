const { Meta, metaData } = require('../cache.config.js');
const notificationService = require('../notificationService.js');
const classRep = require('../repositories/classRepository.js');
const eventRep = require('../repositories/eventRepository.js');
const plRep = require('../repositories/privateLessonRepository.js');

const config = require('config');
const adminWhiteList = config.get('AdminWhiteList');
const { Status } = require('../enums.js');

const Dances = require('./dances.js');
const Dance = require('./dance.js');
const Topic = require('./topic.js');
const GroupLessons = require('./groupLessons.js');
const GroupLesson = require('./groupLesson.js');
const JoinGroupLesson = require('./joinGroupLesson.js');
const PrivateLessons = require('./privateLessons.js');
const PrivateLesson = require('./privateLesson.js');
const JoinPrivateLesson = require('./joinPrivateLesson.js');
const Events = require('./events.js');
const Event = require('./event.js');
const JoinEvent = require('./joinEvent.js');

const Admin = require('./admin.js');
const AdminGroupLessonsType = require('./adminGroupLessonsType.js');
const AdminGroupLessons = require('./adminGroupLessons.js');
const AdminGroupLesson = require('./adminGroupLesson.js');
const AdminGroupLessonAction = require('./adminGroupLessonAction.js');
const AdminPrivateLessons = require('./adminPrivateLessons.js');
const AdminPrivateLesson = require('./adminPrivateLesson.js');
const AdminPrivateLessonAction = require('./adminPrivateLessonAction.js');
const AdminEvents = require('./adminEvents.js');
const AdminEvent = require('./adminEvent.js');
const AdminEventAction = require('./adminEventAction.js');

class MessagesTree {
    constructor() {

        // #region Main
        const events = new Events('eventsDesc', 'eventsCommand');
        
        const masterClasses = new Event('masterClassesDesc', 'masterClassesCommand', Meta.MasterClass, async () => await eventRep.getEvents(Meta.MasterClass));
        const festivalsClasses = new Event('festivalsDesc', 'festivalsCommand', Meta.Festival, async () => await eventRep.getEvents(Meta.Festival));
        const showsClasses = new Event('showsDesc', 'showsCommand', Meta.Show, async () => await eventRep.getEvents(Meta.Show));
        
        const joinEvent = new JoinEvent('joinEventDesc', 'joinEventCommand', (username, field) => metaData.getMetadata(username, field), 
            async (eventType) => await eventRep.getEvents(eventType), 
            async (eventType) => await eventRep.getEventsParticipants(eventType), 
            async (eventType, rowNumber, eventId, eventName, username, chatId, status, type) => await eventRep.participateEvent(eventType, rowNumber, eventId, eventName, username, chatId, status, type));

        const dances = new Dances('dancesDesc', 'dancesCommand');
        const salsaDance = new Dance('salsaDesc', 'salsaCommand');
        const bachataDance = new Dance('bachataDesc', 'bachataCommand');
        const afroHouseDance = new Dance('afroHouseDesc', 'afroHouseCommand');
        const latinoGrooveDance = new Dance('latinoGrooveDesc', 'latinoGrooveCommand');

        const salsaSoloTopic = new Topic('salsaSoloTopicDesc', 'salsaSoloTopicCommand');
        const salsaPartnerTopic = new Topic('salsaPartnerTopicDesc', 'salsaPartnerTopicCommand');
        const salsaMixTopic = new Topic('salsaMixTopicDesc', 'salsaMixTopicCommand');

        const salsaSoloClasses = new GroupLessons('salsaSoloClassesDesc', 'salsaSoloClassesCommand', Meta.SalsaSolo, async (type) => await classRep.getClasses(type));
        const salsaPartnerClasses = new GroupLessons('salsaPartnerClassesDesc', 'salsaPartnerClassesCommand', Meta.SalsaPartner, async (type) => await classRep.getClasses(type));
        const salsaMixClasses = new GroupLessons('salsaMixClassesDesc', 'salsaMixClassesCommand', Meta.SalsaMix, async (type) => await classRep.getClasses(type));

        const joinPrivateSalsaSoloClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.SalsaSolo, async () => await plRep.getPrivateLessons());
        const joinPrivateSalsaPartnerClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.SalsaPartner, async () => await plRep.getPrivateLessons());
        const joinPrivateSalsaMixClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.SalsaMix, async () => await plRep.getPrivateLessons());

        const bachataSoloTopic = new Topic('bachataSoloTopicDesc', 'bachataSoloTopicCommand');
        const bachataPartnerTopic = new Topic('bachataPartnerTopicDesc', 'bachataPartnerTopicCommand');
        const bachataMixTopic = new Topic('bachataMixTopicDesc', 'bachataMixTopicCommand');

        const bachataSoloClasses = new GroupLessons('bachataSoloClassesDesc', 'bachataSoloClassesCommand', Meta.BachataSolo, async (type) => await classRep.getClasses(type));
        const bachataPartnerClasses = new GroupLessons('bachataPartnerClassesDesc', 'bachataPartnerClassesCommand', Meta.BachataPartner, async (type) => await classRep.getClasses(type));
        const bachataMixClasses = new GroupLessons('bachataMixClassesDesc', 'bachataMixClassesCommand', Meta.BachataMix, async (type) => await classRep.getClasses(type));

        const joinPrivateBachataSoloClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.BachataSolo, async () => await plRep.getPrivateLessons());
        const joinPrivateBachataPartnerClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.BachataPartner, async () => await plRep.getPrivateLessons());
        const joinPrivateBachataMixClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.BachataMix, async () => await plRep.getPrivateLessons());
    
        const afroHouseSoloTopic = new Topic('afroHouseSoloTopicDesc', 'afroHouseSoloTopicCommand');
        const afroHousePartnerTopic = new Topic('afroHousePartnerTopicDesc', 'afroHousePartnerTopicCommand');
        const afroHouseMixTopic = new Topic('afroHouseMixTopicDesc', 'afroHouseMixTopicCommand');

        const afroHouseSoloClasses = new GroupLessons('afroHouseSoloClassesDesc', 'afroHouseSoloClassesCommand', Meta.AfroHouseSolo, async (type) => await classRep.getClasses(type));
        const afroHousePartnerClasses = new GroupLessons('afroHousePartnerClassesDesc', 'afroHousePartnerClassesCommand', Meta.AfroHousePartner,  async (type) => await classRep.getClasses(type));
        const afroHouseMixClasses = new GroupLessons('afroHouseMixClassesDesc', 'afroHouseMixClassesCommand', Meta.AfroHouseMix, async (type) => await classRep.getClasses(type));

        const joinPrivateAfroHouseSoloClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.AfroHouseSolo, async () => await plRep.getPrivateLessons());
        const joinPrivateAfroHousePartnerClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.AfroHousePartner, async () => await plRep.getPrivateLessons());
        const joinPrivateAfroHouseMixClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.AfroHouseMix, async () => await plRep.getPrivateLessons());

        const latinoGrooveSoloTopic = new Topic('latinoGrooveSoloTopicDesc', 'latinoGrooveSoloTopicCommand');
        const latinoGroovePartnerTopic = new Topic('latinoGroovePartnerTopicDesc', 'latinoGroovePartnerTopicCommand');
        const latinoGrooveMixTopic = new Topic('latinoGrooveMixTopicDesc', 'latinoGrooveMixTopicCommand');

        const latinoGrooveSoloClasses = new GroupLessons('latinoGrooveSoloClassesDesc', 'latinoGrooveSoloClassesCommand', Meta.LatinoGrooveSolo, async (type) => await classRep.getClasses(type));
        const latinoGroovePartnerClasses = new GroupLessons('latinoGroovePartnerClassesDesc', 'latinoGroovePartnerClassesCommand', Meta.LatinoGroovePartner, async () => await classRep.getClasses(type));
        const latinoGrooveMixClasses = new GroupLessons('latinoGrooveMixClassesDesc', 'latinoGrooveMixClassesCommand', Meta.LatinoGrooveMix, async (type) => await classRep.getClasses(type));

        const joinPrivateLatinoGrooveSoloClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.LatinoGrooveSolo, async () => await plRep.getPrivateLessons());
        const joinPrivateLatinoGroovePartnerClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.LatinoGroovePartner, async () => await plRep.getPrivateLessons());
        const joinPrivateLatinoGrooveMixClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.LatinoGrooveMix, async () => await plRep.getPrivateLessons());

        const groupClass = new GroupLesson('groupLessonDesc', 'groupLessonommand',
            async (id, type) => await classRep.getClass(id ,type));

        const joinGroupClass = new JoinGroupLesson('joinGroupLessonDesc', 'joinGroupLessonCommand',
            async (id, type) => await classRep.getClass(id ,type),
            async (type) => await classRep.getClassesParticipants(type), 
            async (type, rowNumber, classId, className, username, chatId, status) => await classRep.participateClass(type, rowNumber, classId, className, username, chatId, status));

        const privateClass = new PrivateLesson('privateLessonDesc', 'privateLessonCommand', async (id) => await plRep.getFreeSlot(id));

        const joinPrivateClasses = new JoinPrivateLesson('joinPrivateLessonDesc', 'JPL', (username, field) => metaData.getMetadata(username, field),  async (id) => await plRep.getFreeSlot(id),
            async (lessonId, dance, username, chatId, status) => await plRep.participatePrivateLesson(lessonId, dance, username, chatId, status));
        
        events.nextSteps = [masterClasses, festivalsClasses, showsClasses];

        masterClasses.nextSteps = [joinEvent];
        festivalsClasses.nextSteps = [joinEvent];
        showsClasses.nextSteps = [joinEvent];

        dances.nextSteps = [salsaDance, bachataDance, afroHouseDance, latinoGrooveDance];

        salsaDance.nextSteps = [salsaSoloTopic, salsaPartnerTopic, salsaMixTopic];
        salsaSoloTopic.nextSteps = [salsaSoloClasses, joinPrivateSalsaSoloClasses, events];
        salsaPartnerTopic.nextSteps = [salsaPartnerClasses, joinPrivateSalsaPartnerClasses, events];
        salsaMixTopic.nextSteps = [salsaMixClasses, joinPrivateSalsaMixClasses, events];
        
        salsaSoloClasses.nextSteps =[groupClass];
        salsaPartnerClasses.nextSteps =[groupClass];
        salsaMixClasses.nextSteps =[groupClass];

        joinPrivateSalsaSoloClasses.nextSteps = [privateClass];
        joinPrivateSalsaPartnerClasses.nextSteps = [privateClass];
        joinPrivateSalsaMixClasses.nextSteps = [privateClass];

        bachataDance.nextSteps = [bachataSoloTopic, bachataPartnerTopic, bachataMixTopic];
        bachataSoloTopic.nextSteps = [bachataSoloClasses, joinPrivateBachataSoloClasses, events];
        bachataPartnerTopic.nextSteps = [bachataPartnerClasses, joinPrivateBachataPartnerClasses, events];
        bachataMixTopic.nextSteps = [bachataMixClasses, joinPrivateBachataMixClasses, events];

        bachataSoloClasses.nextSteps =[groupClass];
        bachataPartnerClasses.nextSteps =[groupClass];
        bachataMixClasses.nextSteps =[groupClass];

        joinPrivateBachataSoloClasses.nextSteps = [privateClass];
        joinPrivateBachataPartnerClasses.nextSteps = [privateClass];
        joinPrivateBachataMixClasses.nextSteps = [privateClass];

        afroHouseDance.nextSteps = [afroHouseSoloTopic, afroHousePartnerTopic, afroHouseMixTopic];
        afroHouseSoloTopic.nextSteps = [afroHouseSoloClasses, joinPrivateAfroHouseSoloClasses, events];
        afroHousePartnerTopic.nextSteps = [afroHousePartnerClasses, joinPrivateAfroHousePartnerClasses, events];
        afroHouseMixTopic.nextSteps = [afroHouseMixClasses, joinPrivateAfroHouseMixClasses, events];
        
        afroHouseSoloClasses.nextSteps =[groupClass];
        afroHousePartnerClasses.nextSteps =[groupClass];
        afroHouseMixClasses.nextSteps =[groupClass];

        joinPrivateAfroHouseSoloClasses.nextSteps = [privateClass];
        joinPrivateAfroHousePartnerClasses.nextSteps = [privateClass];
        joinPrivateAfroHouseMixClasses.nextSteps = [privateClass];

        latinoGrooveDance.nextSteps = [latinoGrooveSoloTopic, latinoGroovePartnerTopic, latinoGrooveMixTopic];
        latinoGrooveSoloTopic.nextSteps = [latinoGrooveSoloClasses, joinPrivateLatinoGrooveSoloClasses, events];
        latinoGroovePartnerTopic.nextSteps = [latinoGroovePartnerClasses, joinPrivateLatinoGroovePartnerClasses, events];
        latinoGrooveMixTopic.nextSteps = [latinoGrooveMixClasses, joinPrivateLatinoGrooveMixClasses, events];
        
        latinoGrooveSoloClasses.nextSteps =[groupClass];
        latinoGroovePartnerClasses.nextSteps =[groupClass];
        latinoGrooveMixClasses.nextSteps =[groupClass];

        groupClass.nextSteps = [joinGroupClass];

        joinPrivateLatinoGrooveSoloClasses.nextSteps = [privateClass];
        joinPrivateLatinoGroovePartnerClasses.nextSteps = [privateClass];
        joinPrivateLatinoGrooveMixClasses.nextSteps = [privateClass];

        privateClass.nextSteps = [joinPrivateClasses];
        //#endregion

        // #region Admin
        const admin = new Admin('adminDesc', 'adminCommand');

        const adminGroupLessonsType = new AdminGroupLessonsType('adminGroupLessonsTypeDesc', 'adminGroupLessonsTypeCommand');
        const adminGroupLessons = new AdminGroupLessons('adminGroupLessonsDesc', 'adminGroupLessonsCommand', async (lessonTypes) => await classRep.getOwnerClassesParticipants(lessonTypes));
        const adminGroupLesson = new AdminGroupLesson('adminGroupLessonDesc', 'adminGroupLessonCommand', async (id, type) => await classRep.getOwnerClassParticipation(id, type));
        const adminGroupLessonApprove = new AdminGroupLessonAction('adminGroupLessonActionApproveDesc', 'adminGroupLessonActionApproveCommand', 'adminGroupLessonActionApproveUserDesc',
            async (id, type) => await classRep.getOwnerClassParticipation(id, type), async (id, type) => await classRep.updateOwnerClassParticipation(id, type, Status.Approved),
            async (chatId, message) => await notificationService.notifyUser(chatId, message));
        const adminGroupLessonDecline = new AdminGroupLessonAction('adminGroupLessonActionDeclineDesc', 'adminGroupLessonActionDeclineCommand', 'adminGroupLessonActionDeclineUserDesc',
            async (id, type) => await classRep.getOwnerClassParticipation(id, type), async (id, type) => await classRep.updateOwnerClassParticipation(id, type, Status.Declined),
            async (chatId, message) => await notificationService.notifyUser(chatId, message));

        const adminPrivateLessons = new AdminPrivateLessons('adminPrivateLessonsDesc', 'adminPrivateLessonsCommand', async () => await plRep.getOwnerPrivateLessons());
        const adminPrivateLesson = new AdminPrivateLesson('adminPrivateLessonDesc', 'adminPrivateLessonCommand', async (id) => await plRep.getPrivateLesson(id));
        const adminPrivateLessonApprove = new AdminPrivateLessonAction('adminPrivateLessonActionApproveDesc', 'adminPrivateLessonActionApproveCommand', 'adminPrivateLessonActionApproveUserDesc',
            Status.Approved, async (id) => await plRep.getPrivateLesson(id), async (id, uid) => await plRep.updatePrivateLesson(id, Status.Approved, uid),
            async (chatId, message) => await notificationService.notifyUser(chatId, message));
        const adminPrivateLessonDecline = new AdminPrivateLessonAction('adminPrivateLessonActionDeclineDesc', 'adminPrivateLessonActionDeclineCommand', 'adminPrivateLessonActionDeclineUserDesc',
            Status.Declined, async (id) => await plRep.getPrivateLesson(id), async (id, uid) => await plRep.updatePrivateLesson(id, Status.Declined, uid), 
            async (chatId, message) => await notificationService.notifyUser(chatId, message));

        const adminEvents = new AdminEvents('adminEventsDesc', 'adminEventsCommand', async () => await eventRep.getOwnerEventsParticipations());
        const adminEvent = new AdminEvent('adminEventDesc', 'adminEventCommand', async (id, type) => await eventRep.getOwnerEventParticipation(id, type));
        const adminEventApprove = new AdminEventAction('adminEventActionApproveDesc', 'adminEventActionApproveCommand', 'adminEventActionApproveUserDesc',
            async (id, type) => await eventRep.getOwnerEventParticipation(id, type), async (id, type) => await eventRep.updateOwnerEventParticipation(id, type, Status.Approved),
            async (chatId, message) => await notificationService.notifyUser(chatId, message));
        const adminEventDecline = new AdminEventAction('adminEventActionDeclineDesc', 'adminEventActionDeclineCommand', 'adminEventActionDeclineUserDesc',
            async (id, type) => await eventRep.getOwnerEventParticipation(id, type), async (id, type) => await eventRep.updateOwnerEventParticipation(id, type, Status.Declined), 
            async (chatId, message) => await notificationService.notifyUser(chatId, message));

        admin.nextSteps = [adminGroupLessonsType, adminEvents, adminPrivateLessons];

        adminGroupLessonsType.nextSteps = [adminGroupLessons];
        adminGroupLessons.nextSteps = [adminGroupLesson];
        adminGroupLesson.nextSteps = [adminGroupLessonApprove, adminGroupLessonDecline];

        adminPrivateLessons.nextSteps = [adminPrivateLesson];
        adminPrivateLesson.nextSteps = [adminPrivateLessonApprove, adminPrivateLessonDecline];

        adminEvents.nextSteps = [adminEvent];
        adminEvent.nextSteps = [adminEventApprove, adminEventDecline];

        //#endregion

        this.adminStep = admin;
        this.initialStep = dances;
    }

    findCurrentStep(message, username) {
    
        const digitData = message.match(/(\d+)/);
        const stringData = message.match(/\[([^)]+)\]/);
        const notEquals = digitData || stringData;
        let found = this.findStep(this.initialStep, message, !notEquals);
        if (!found && adminWhiteList.includes(username)) {
            found = this.findStep(this.adminStep, message, !notEquals);
        } 
                 
        this.currentStep = found || this.initialStep;
        return this.currentStep;
    }

    findStep(top, message, equals) {
        let queue = []
        queue.push(top);
        while(queue.length > 0) {
            let step = queue.shift();
            queue = queue.concat(step.nextSteps);
            if (equals && !step.isDynamicStep) {
                if (message.toLocaleLowerCase() === step.command.toLocaleLowerCase()) {
                    return step;
                }
            }
            else if (!equals && step.isDynamicStep){
                if (message.toLocaleLowerCase().includes(step.command.toLocaleLowerCase())) {
                    return step;
                }
            } else {
                continue;
            }
        } 
        return null;
    }
}

module.exports = MessagesTree;