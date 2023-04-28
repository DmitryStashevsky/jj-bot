const { Meta, metaData } = require('../cache.config.js');
const notificationService = require('../notificationService.js');
const { hasData } = require('../handlers/context.handler.js');
const classRep = require('../repositories/classRepository.js');
const eventRep = require('../repositories/eventRepository.js');
const plRep = require('../repositories/privateLessonRepository.js');

const {hasAccessToAdmin} = require('../handlers/access.handler.js');
const { Status } = require('../enums.js');

const Dances = require('./dances.js');
const Dance = require('./dance.js');
const Topic = require('./topic.js');
const GroupLessons = require('./groupLessons.js');
const GroupLesson = require('./groupLesson.js');
const GroupLessonAction = require('./groupLessonAction.js');
const PrivateLessons = require('./privateLessons.js');
const PrivateLesson = require('./privateLesson.js');
const PrivateLessonAction = require('./privateLessonAction.js');

const Events = require('./events.js');
const Event = require('./event.js');
const EventAction = require('./eventAction.js');

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
const Step = require('./baseSteps/step.js');

class MessagesTree {
    constructor() {

        // #region Main
        const events = new Topic('eventsDesc', 'eventsCommand');
        
        const masterClasses = new Events('masterClassesDesc', 'masterClassesCommand', Meta.MasterClass, async () => await eventRep.getEvents(Meta.MasterClass));
        const festivalsClasses = new Events('festivalsDesc', 'festivalsCommand', Meta.Festival, async () => await eventRep.getEvents(Meta.Festival));
        const showsClasses = new Events('showsDesc', 'showsCommand', Meta.Show, async () => await eventRep.getEvents(Meta.Show));
        
        const event = new Event('eventDesc', 'eventCommand', async (id, type) => await eventRep.getEvent(id, type));

        const joinEvent = new EventAction('joinEventDesc', 'joinEventCommand', 'join', null,
            async (id, eventType) => await eventRep.getEvent(id, eventType), 
            async (eventType) => await eventRep.getEventsParticipants(eventType), 
            async (eventType, rowNumber, eventId, eventName, username, chatId, status, type) => await eventRep.participateEvent(eventType, rowNumber, eventId, eventName, username, chatId, status, type));

        const dances = new Dances('dancesDesc', 'dancesCommand');
        const salsaDance = new Dance('salsaDesc', 'salsaCommand');
        const bachataDance = new Dance('bachataDesc', 'bachataCommand');
        const afroHouseDance = new Dance('afroHouseDesc', 'afroHouseCommand');
        const latinoGrooveDance = new Dance('latinoGrooveDesc', 'latinoGrooveCommand');

        const salsaSoloClasses = new GroupLessons('salsaSoloClassesDesc', 'salsaSoloClassesCommand', Meta.SalsaSolo, async (type) => await classRep.getClasses(type));
        const salsaPartnerClasses = new GroupLessons('salsaPartnerClassesDesc', 'salsaPartnerClassesCommand', Meta.SalsaPartner, async (type) => await classRep.getClasses(type));
        const salsaMixClasses = new GroupLessons('salsaMixClassesDesc', 'salsaMixClassesCommand', Meta.SalsaMix, async (type) => await classRep.getClasses(type));

        const bachataSoloClasses = new GroupLessons('bachataSoloClassesDesc', 'bachataSoloClassesCommand', Meta.BachataSolo, async (type) => await classRep.getClasses(type));
        const bachataPartnerClasses = new GroupLessons('bachataPartnerClassesDesc', 'bachataPartnerClassesCommand', Meta.BachataPartner, async (type) => await classRep.getClasses(type));
        const bachataMixClasses = new GroupLessons('bachataMixClassesDesc', 'bachataMixClassesCommand', Meta.BachataMix, async (type) => await classRep.getClasses(type));

        const afroHouseSoloClasses = new GroupLessons('afroHouseSoloClassesDesc', 'afroHouseSoloClassesCommand', Meta.AfroHouseSolo, async (type) => await classRep.getClasses(type));
        const afroHousePartnerClasses = new GroupLessons('afroHousePartnerClassesDesc', 'afroHousePartnerClassesCommand', Meta.AfroHousePartner,  async (type) => await classRep.getClasses(type));
        const afroHouseMixClasses = new GroupLessons('afroHouseMixClassesDesc', 'afroHouseMixClassesCommand', Meta.AfroHouseMix, async (type) => await classRep.getClasses(type));

        const latinoGrooveSoloClasses = new GroupLessons('latinoGrooveSoloClassesDesc', 'latinoGrooveSoloClassesCommand', Meta.LatinoGrooveSolo, async (type) => await classRep.getClasses(type));
        const latinoGroovePartnerClasses = new GroupLessons('latinoGroovePartnerClassesDesc', 'latinoGroovePartnerClassesCommand', Meta.LatinoGroovePartner, async (type) => await classRep.getClasses(type));
        const latinoGrooveMixClasses = new GroupLessons('latinoGrooveMixClassesDesc', 'latinoGrooveMixClassesCommand', Meta.LatinoGrooveMix, async (type) => await classRep.getClasses(type));

        const groupClasses = new Step('groupLessonsDesc', 'groupLessonsCommand');

        const groupClass = new GroupLesson('groupLessonDesc', 'groupLessonCommand',
            async (id, type) => await classRep.getClass(id ,type));

        const joinGroupClass = new GroupLessonAction('joinGroupLessonDesc', 'joinGroupLessonCommand', 'join', null,
            async (id, type) => await classRep.getClass(id ,type),
            async (type) => await classRep.getClassesParticipants(type), 
            async (type, rowNumber, classId, className, username, chatId, status) => await classRep.participateClass(type, rowNumber, classId, className, username, chatId, status));


        const privateClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', async () => await plRep.getPrivateLessons());

        const privateClass = new PrivateLesson('privateLessonDesc', 'privateLessonCommand', async (id) => await plRep.getFreeSlot(id));

        const joinPrivateClasses = new PrivateLessonAction('joinPrivateLessonDesc', 'JPL', 'join', null,
            async (id) => await plRep.getFreeSlot(id),
            async (lessonId, dance, username, chatId, status) => await plRep.participatePrivateLesson(lessonId, dance, username, chatId, status));
        
        events.nextSteps = [masterClasses, festivalsClasses];

        masterClasses.nextSteps = [event];
        festivalsClasses.nextSteps = [event];
        showsClasses.nextSteps = [event];

        event.nextSteps = [joinEvent];

        dances.nextSteps = [groupClasses, privateClasses, events];

        groupClasses.nextSteps = [salsaDance, afroHouseDance];

        salsaDance.nextSteps = [salsaSoloClasses, salsaPartnerClasses];
        
        salsaSoloClasses.nextSteps =[groupClass];
        salsaPartnerClasses.nextSteps =[groupClass];
        salsaMixClasses.nextSteps =[groupClass];

        bachataDance.nextSteps = [bachataSoloClasses, bachataPartnerClasses, bachataMixClasses];

        bachataSoloClasses.nextSteps =[groupClass];
        bachataPartnerClasses.nextSteps =[groupClass];
        bachataMixClasses.nextSteps =[groupClass];

        afroHouseDance.nextSteps = [afroHouseSoloClasses, afroHousePartnerClasses, afroHouseMixClasses];
        
        afroHouseSoloClasses.nextSteps =[groupClass];
        afroHousePartnerClasses.nextSteps =[groupClass];
        afroHouseMixClasses.nextSteps =[groupClass];

        latinoGrooveDance.nextSteps = [latinoGrooveSoloClasses, latinoGroovePartnerClasses, latinoGrooveMixClasses];
        
        latinoGrooveSoloClasses.nextSteps =[groupClass];
        latinoGroovePartnerClasses.nextSteps =[groupClass];
        latinoGrooveMixClasses.nextSteps =[groupClass];

        groupClass.nextSteps = [joinGroupClass];

        privateClasses.nextSteps = [privateClass];
        privateClass.nextSteps = [joinPrivateClasses];
        //#endregion

        // #region Admin
        const admin = new Admin('adminDesc', 'adminCommand');

        const adminGroupLessonsType = new AdminGroupLessonsType('adminGroupLessonsTypeDesc', 'adminGroupLessonsTypeCommand');
        const adminGroupLessons = new AdminGroupLessons('adminGroupLessonsDesc', 'adminGroupLessonsCommand', async (lessonTypes) => await classRep.getOwnerClassesParticipants(lessonTypes));
        const adminGroupLesson = new AdminGroupLesson('adminGroupLessonDesc', 'adminGroupLessonCommand', async (id, type) => await classRep.getOwnerClassParticipation(id, type));
        const adminGroupLessonApprove = new AdminGroupLessonAction('adminGroupLessonActionApproveDesc', 'adminGroupLessonActionApproveCommand', 
            'approve', (entity) => entity.status == Status.Pending, 'adminGroupLessonActionApproveUserDesc',
            async (id, type) => await classRep.getOwnerClassParticipation(id, type), async (id, type) => await classRep.updateOwnerClassParticipation(id, type, Status.Approved),
            async (chatId, message) => await notificationService.notifyUser(chatId, message));
        const adminGroupLessonDecline = new AdminGroupLessonAction('adminGroupLessonActionDeclineDesc', 'adminGroupLessonActionDeclineCommand', 
            'decline', null, 'adminGroupLessonActionDeclineUserDesc',
            async (id, type) => await classRep.getOwnerClassParticipation(id, type), async (id, type) => await classRep.updateOwnerClassParticipation(id, type, Status.Declined),
            async (chatId, message) => await notificationService.notifyUser(chatId, message));

        const adminPrivateLessons = new AdminPrivateLessons('adminPrivateLessonsDesc', 'adminPrivateLessonsCommand', async () => await plRep.getOwnerPrivateLessons());
        const adminPrivateLesson = new AdminPrivateLesson('adminPrivateLessonDesc', 'adminPrivateLessonCommand', async (id) => await plRep.getPrivateLesson(id));
        const adminPrivateLessonApprove = new AdminPrivateLessonAction('adminPrivateLessonActionApproveDesc', 'adminPrivateLessonActionApproveCommand', 
            'approve', (entity) => entity.status == Status.Pending, 'adminPrivateLessonActionApproveUserDesc',
            Status.Approved, async (id) => await plRep.getPrivateLesson(id), async (id, uid) => await plRep.updatePrivateLesson(id, Status.Approved, uid),
            async (chatId, message) => await notificationService.notifyUser(chatId, message));
        const adminPrivateLessonDecline = new AdminPrivateLessonAction('adminPrivateLessonActionDeclineDesc', 'adminPrivateLessonActionDeclineCommand',
            'decline', (entity) => entity.status == Status.Pending || entity.status == Status.Approved,  'adminPrivateLessonActionDeclineUserDesc',
            Status.Declined, async (id) => await plRep.getPrivateLesson(id), async (id, uid) => await plRep.updatePrivateLesson(id, Status.Declined, uid), 
            async (chatId, message) => await notificationService.notifyUser(chatId, message));

        const adminEvents = new AdminEvents('adminEventsDesc', 'adminEventsCommand', async () => await eventRep.getOwnerEventsParticipations());
        const adminEvent = new AdminEvent('adminEventDesc', 'adminEventCommand', async (id, type) => await eventRep.getOwnerEventParticipation(id, type));
        const adminEventApprove = new AdminEventAction('adminEventActionApproveDesc', 'adminEventActionApproveCommand', 
            'approve', (entity) => entity.status == Status.Pending, 'adminEventActionApproveUserDesc',
            async (id, type) => await eventRep.getOwnerEventParticipation(id, type), async (id, type) => await eventRep.updateOwnerEventParticipation(id, type, Status.Approved),
            async (chatId, message) => await notificationService.notifyUser(chatId, message)); 
        const adminEventDecline = new AdminEventAction('adminEventActionDeclineDesc', 'adminEventActionDeclineCommand', 
            'decline', null, 'adminEventActionDeclineUserDesc',
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

    findCurrentStep(message = "", username) {
        const proccessLikeEqualsCommand = hasData(message);
        let found = this.findStep(this.initialStep, message, !proccessLikeEqualsCommand);
        if (!found && hasAccessToAdmin(username)) {
            found = this.findStep(this.adminStep, message, !proccessLikeEqualsCommand);
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