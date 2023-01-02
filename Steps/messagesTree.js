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
const PrivateLessons = require('./privateLessons.js');
const JoinGroupLesson = require('./joinGroupLesson.js');
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

        const salsaSoloClasses = new GroupLessons('salsaSoloClassesDesc', 'salsaSoloClassesCommand', async () => await classRep.getClasses(Meta.SalsaSolo));
        const salsaPartnerClasses = new GroupLessons('salsaPartnerClassesDesc', 'salsaPartnerClassesCommand', async () => await classRep.getClasses(Meta.SalsaPartner));
        const salsaMixClasses = new GroupLessons('salsaMixClassesDesc', 'salsaMixClassesCommand', async () => await classRep.getClasses(Meta.SalsaMix));

        const joinSalsaSoloClasses = new JoinGroupLesson('joinSalsaSoloClassesDesc', 'joinSalsaSoloClassesCommand',
            async () => await classRep.getClasses(Meta.SalsaSolo),
            async () => await classRep.getClassesParticipants(Meta.SalsaSolo), 
            async (rowNumber, classId, className, username, chatId, status) => await classRep.participateClass(Meta.SalsaSolo, rowNumber, classId, className, username, chatId, status));

        const joinSalsaPartnerClasses = new JoinGroupLesson('joinSalsaPartnerClassesDesc', 'joinSalsaPartnerClassesCommand', async () => await classRep.getClasses(Meta.SalsaPartner),
            async () => await classRep.getClassesParticipants(Meta.SalsaPartner), 
            async (rowNumber, classId, className, username, chatId, status) => await classRep.participateClass(Meta.SalsaPartner, rowNumber, classId, className, username, chatId, status));
        
        const joinSalsaMixClasses = new JoinGroupLesson('joinSalsaMixClassesDesc', 'joinSalsaMixClassesCommand', async () => await classRep.getClasses(Meta.SalsaMix),
            async () => await classRep.getClassesParticipants(Meta.SalsaMix), 
            async (rowNumber, classId, className, username, chatId, status) => await classRep.participateClass(Meta.SalsaMix, rowNumber, classId, className, username, chatId, status));

        const joinPrivateSalsaSoloClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.SalsaSolo, async () => await plRep.getPrivateLessons());
        const joinPrivateSalsaPartnerClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.SalsaPartner, async () => await plRep.getPrivateLessons());
        const joinPrivateSalsaMixClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.SalsaMix, async () => await plRep.getPrivateLessons());

        const bachataSoloTopic = new Topic('bachataSoloTopicDesc', 'bachataSoloTopicCommand');
        const bachataPartnerTopic = new Topic('bachataPartnerTopicDesc', 'bachataPartnerTopicCommand');
        const bachataMixTopic = new Topic('bachataMixTopicDesc', 'bachataMixTopicCommand');

        const bachataSoloClasses = new GroupLessons('bachataSoloClassesDesc', 'bachataSoloClassesCommand', async () => await classRep.getClasses(Meta.BachataSolo));
        const bachataPartnerClasses = new GroupLessons('bachataPartnerClassesDesc', 'bachataPartnerClassesCommand',  async () => await classRep.getClasses(Meta.BachataPartner));
        const bachataMixClasses = new GroupLessons('bachataMixClassesDesc', 'bachataMixClassesCommand', async () => await classRep.getClasses(Meta.BachataMix));

        const joinBachataSoloClasses = new JoinGroupLesson('joinBachataSoloClassesDesc', 'joinBachataSoloClassesCommand', async () => await classRep.getClasses(Meta.BachataSolo),
            async () => await classRep.getClassesParticipants(Meta.BachataSolo), 
            async (rowNumber, classId, className, username, chatId, status) => await classRep.participateClass(Meta.BachataSolo, rowNumber, classId, className, username, chatId, status));
        
        const joinBachataPartnerClasses = new JoinGroupLesson('joinBachataPartnerClassesDesc', 'joinBachataPartnerClassesCommand', async () => await classRep.getClasses(Meta.BachataPartner),
            async () => await classRep.getClassesParticipants(Meta.BachataPartner), 
            async (rowNumber, classId, className, username, chatId, status) => await classRep.participateClass(Meta.BachataPartner, rowNumber, classId, className, username, chatId, status));

        const joinBachataMixClasses = new JoinGroupLesson('joinBachataMixClassesDesc', 'joinBachataMixClassesCommand', async () => await classRep.getClasses(Meta.BachataMix),
            async () => await classRep.getClassesParticipants(Meta.BachataMix), 
            async (rowNumber, classId, className, username, chatId, status) => await classRep.participateClass(Meta.BachataMix, rowNumber, classId, className, username, chatId, status));
        
        const joinPrivateBachataSoloClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.BachataSolo, async () => await plRep.getPrivateLessons());
        const joinPrivateBachataPartnerClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.BachataPartner, async () => await plRep.getPrivateLessons());
        const joinPrivateBachataMixClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.BachataMix, async () => await plRep.getPrivateLessons());
    
        const afroHouseSoloTopic = new Topic('afroHouseSoloTopicDesc', 'afroHouseSoloTopicCommand');
        const afroHousePartnerTopic = new Topic('afroHousePartnerTopicDesc', 'afroHousePartnerTopicCommand');
        const afroHouseMixTopic = new Topic('afroHouseMixTopicDesc', 'afroHouseMixTopicCommand');

        const afroHouseSoloClasses = new GroupLessons('afroHouseSoloClassesDesc', 'afroHouseSoloClassesCommand', async () => await classRep.getClasses(Meta.AfroHouseSolo));
        const afroHousePartnerClasses = new GroupLessons('afroHousePartnerClassesDesc', 'afroHousePartnerClassesCommand',  async () => await classRep.getClasses(Meta.AfroHousePartner));
        const afroHouseMixClasses = new GroupLessons('afroHouseMixClassesDesc', 'afroHouseMixClassesCommand', async () => await classRep.getClasses(Meta.AfroHouseMix));

        const joinAfroHouseSoloClasses = new JoinGroupLesson('joinAfroHouseSoloClassesDesc', 'joinAfroHouseSoloClassesCommand', async () => await classRep.getClasses(Meta.AfroHouseSolo),
            async () => await classRep.getClassesParticipants(Meta.AfroHouseSolo), 
            async (rowNumber, classId, className, username, chatId, status) => await classRep.participateClass(Meta.AfroHouseSolo, rowNumber, classId, className, username, chatId, status));
        
        const joinAfroHousePartnerClasses = new JoinGroupLesson('joinAfroHousePartnerClassesDesc', 'joinAfroHousePartnerClassesCommand', async () => await classRep.getClasses(Meta.AfroHousePartner),
            async () => await classRep.getClassesParticipants(Meta.AfroHousePartner), 
            async (rowNumber, classId, className, username, chatId, status) => await classRep.participateClass(Meta.AfroHousePartner, rowNumber, classId, className, username, chatId, status));

        const joinAfroHouseMixClasses = new JoinGroupLesson('joinAfroHouseMixClassesDesc', 'joinAfroHouseMixClassesCommand', async () => await classRep.getClasses(Meta.AfroHouseMix),
            async () => await classRep.getClassesParticipants(Meta.AfroHouseMix), 
            async (rowNumber, classId, className, username, chatId, status) => await classRep.participateClass(Meta.AfroHouseMix, rowNumber, classId, className, username, chatId, status));
        
        const joinPrivateAfroHouseSoloClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.AfroHouseSolo, async () => await plRep.getPrivateLessons());
        const joinPrivateAfroHousePartnerClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.AfroHousePartner, async () => await plRep.getPrivateLessons());
        const joinPrivateAfroHouseMixClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.AfroHouseMix, async () => await plRep.getPrivateLessons());

        const latinoGrooveSoloTopic = new Topic('latinoGrooveSoloTopicDesc', 'latinoGrooveSoloTopicCommand');
        const latinoGroovePartnerTopic = new Topic('latinoGroovePartnerTopicDesc', 'latinoGroovePartnerTopicCommand');
        const latinoGrooveMixTopic = new Topic('latinoGrooveMixTopicDesc', 'latinoGrooveMixTopicCommand');

        const latinoGrooveSoloClasses = new GroupLessons('latinoGrooveSoloClassesDesc', 'latinoGrooveSoloClassesCommand', async () => await classRep.getClasses(Meta.LatinoGrooveSolo));
        const latinoGroovePartnerClasses = new GroupLessons('latinoGroovePartnerClassesDesc', 'latinoGroovePartnerClassesCommand',  async () => await classRep.getClasses(Meta.LatinoGroovePartner));
        const latinoGrooveMixClasses = new GroupLessons('latinoGrooveMixClassesDesc', 'latinoGrooveMixClassesCommand', async () => await classRep.getClasses(Meta.LatinoGrooveMix));

        const joinLatinoGrooveSoloClasses = new JoinGroupLesson('joinLatinoGrooveSoloClassesDesc', 'joinLatinoGrooveSoloClassesCommand', async () => await classRep.getClasses(Meta.LatinoGrooveSolo),
            async () => await classRep.getClassesParticipants(Meta.LatinoGrooveSolo), 
            async (rowNumber, classId, className, username, chatId, status) => await classRep.participateClass(Meta.LatinoGrooveSolo, rowNumber, classId, className, username, chatId, status));
        
        const joinLatinoGroovePartnerClasses = new JoinGroupLesson('joinLatinoGroovePartnerClassesDesc', 'joinLatinoGroovePartnerClassesCommand', async () => await classRep.getClasses(Meta.LatinoGroovePartner),
            async () => await classRep.getClassesParticipants(Meta.LatinoGroovePartner), 
            async (rowNumber, classId, className, username, chatId, status) => await classRep.participateClass(Meta.LatinoGroovePartner, rowNumber, classId, className, username, chatId, status));

        const joinLatinoGrooveMixClasses = new JoinGroupLesson('joinLatinoGrooveMixClassesDesc', 'joinLatinoGrooveMixClassesCommand', async () => await classRep.getClasses(Meta.LatinoGrooveMix),
            async () => await classRep.getClassesParticipants(Meta.LatinoGrooveMix), 
            async (rowNumber, classId, className, username, chatId, status) => await classRep.participateClass(Meta.LatinoGrooveMix, rowNumber, classId, className, username, chatId, status));
        
        const joinPrivateLatinoGrooveSoloClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.LatinoGrooveSolo, async () => await plRep.getPrivateLessons());
        const joinPrivateLatinoGroovePartnerClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.LatinoGroovePartner, async () => await plRep.getPrivateLessons());
        const joinPrivateLatinoGrooveMixClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.LatinoGrooveMix, async () => await plRep.getPrivateLessons());

        const joinPrivateClasses = new JoinPrivateLesson('joinPrivateLessonDesc', 'JPL', (username, field) => metaData.getMetadata(username, field), async () => await plRep.getPrivateLessons(),
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
        
        salsaSoloClasses.nextSteps =[joinSalsaSoloClasses];
        salsaPartnerClasses.nextSteps =[joinSalsaPartnerClasses];
        salsaMixClasses.nextSteps =[joinSalsaMixClasses];

        joinPrivateSalsaSoloClasses.nextSteps = [joinPrivateClasses];
        joinPrivateSalsaPartnerClasses.nextSteps = [joinPrivateClasses];
        joinPrivateSalsaMixClasses.nextSteps = [joinPrivateClasses];

        bachataDance.nextSteps = [bachataSoloTopic, bachataPartnerTopic, bachataMixTopic];
        bachataSoloTopic.nextSteps = [bachataSoloClasses, joinPrivateBachataSoloClasses, events];
        bachataPartnerTopic.nextSteps = [bachataPartnerClasses, joinPrivateBachataPartnerClasses, events];
        bachataMixTopic.nextSteps = [bachataMixClasses, joinPrivateBachataMixClasses, events];

        bachataSoloClasses.nextSteps =[joinBachataSoloClasses];
        bachataPartnerClasses.nextSteps =[joinBachataPartnerClasses];
        bachataMixClasses.nextSteps =[joinBachataMixClasses];

        joinPrivateBachataSoloClasses.nextSteps = [joinPrivateClasses];
        joinPrivateBachataPartnerClasses.nextSteps = [joinPrivateClasses];
        joinPrivateBachataMixClasses.nextSteps = [joinPrivateClasses];

        afroHouseDance.nextSteps = [afroHouseSoloTopic, afroHousePartnerTopic, afroHouseMixTopic];
        afroHouseSoloTopic.nextSteps = [afroHouseSoloClasses, joinPrivateAfroHouseSoloClasses, events];
        afroHousePartnerTopic.nextSteps = [afroHousePartnerClasses, joinPrivateAfroHousePartnerClasses, events];
        afroHouseMixTopic.nextSteps = [afroHouseMixClasses, joinPrivateAfroHouseMixClasses, events];
        
        afroHouseSoloClasses.nextSteps =[joinAfroHouseSoloClasses];
        afroHousePartnerClasses.nextSteps =[joinAfroHousePartnerClasses];
        afroHouseMixClasses.nextSteps =[joinAfroHouseMixClasses];

        joinPrivateAfroHouseSoloClasses.nextSteps = [joinPrivateClasses];
        joinPrivateAfroHousePartnerClasses.nextSteps = [joinPrivateClasses];
        joinPrivateAfroHouseMixClasses.nextSteps = [joinPrivateClasses];

        latinoGrooveDance.nextSteps = [latinoGrooveSoloTopic, latinoGroovePartnerTopic, latinoGrooveMixTopic];
        latinoGrooveSoloTopic.nextSteps = [latinoGrooveSoloClasses, joinPrivateLatinoGrooveSoloClasses, events];
        latinoGroovePartnerTopic.nextSteps = [latinoGroovePartnerClasses, joinPrivateLatinoGroovePartnerClasses, events];
        latinoGrooveMixTopic.nextSteps = [latinoGrooveMixClasses, joinPrivateLatinoGrooveMixClasses, events];
        
        latinoGrooveSoloClasses.nextSteps =[joinLatinoGrooveSoloClasses];
        latinoGroovePartnerClasses.nextSteps =[joinLatinoGroovePartnerClasses];
        latinoGrooveMixClasses.nextSteps =[joinLatinoGrooveMixClasses];

        joinPrivateLatinoGrooveSoloClasses.nextSteps = [joinPrivateClasses];
        joinPrivateLatinoGroovePartnerClasses.nextSteps = [joinPrivateClasses];
        joinPrivateLatinoGrooveMixClasses.nextSteps = [joinPrivateClasses];

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
            async (id) => await plRep.getPrivateLesson(id), async (id) => await plRep.updatePrivateLesson(id, Status.Approved),
            async (chatId, message) => await notificationService.notifyUser(chatId, message));
        const adminPrivateLessonDecline = new AdminPrivateLessonAction('adminPrivateLessonActionDeclineDesc', 'adminPrivateLessonActionDeclineCommand', 'adminPrivateLessonActionDeclineUserDesc',
            async (id) => await plRep.getPrivateLesson(id), async (id) => await plRep.updatePrivateLesson(id, Status.Declined), 
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