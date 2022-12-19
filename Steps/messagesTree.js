
const { Meta } = require('../cache.config.js');

const GroupLessons = require('./groupLessons.js');
const PrivateLessons = require('./privateLessons.js');
const JoinGroupLesson = require('./joinGroupLesson.js');
const JoinPrivateLesson = require('./joinPrivateLesson.js');

const Events = require('./events.js');
const Event = require('./event.js');
const JoinEvent = require('./joinEvent.js');

const Dances = require('./dances.js');
const Dance = require('./dance.js');

const Topic = require('./topic.js');

class MessagesTree {

    constructor(repository, metaData) {
        const events = new Events('eventsDesc', 'eventsCommand');

        const masterClasses = new Event('masterClassesDesc', 'masterClassesCommand', Meta.MasterClass, async () => await repository.getEvents(Meta.MasterClass));
        const festivalsClasses = new Event('festivalsDesc', 'festivalsCommand', Meta.Festival, async () => await repository.getEvents(Meta.Festival));
        const showsClasses = new Event('showsDesc', 'showsCommand', Meta.Show, async () => await repository.getEvents(Meta.Show));

        const joinEvent = new JoinEvent('joinEventDesc', 'joinEventCommand', (username, field) => metaData.getMetadata(username, field), 
            async (eventType) => await repository.getEvents(eventType), 
            async (eventType) => await repository.getEventsParticipants(eventType), 
            async (eventType, rowNumber, eventId, eventName, username) => await repository.participateEvent(eventType, rowNumber, eventId, eventName, username));

        const dances = new Dances('dancesDesc', 'dancesCommand');
        const salsaDance = new Dance('salsaDesc', 'salsaCommand');
        const bachataDance = new Dance('bachataDesc', 'bachataCommand');
        const latinoGrooveDance = new Dance('latinoGrooveDesc', 'latinoGrooveCommand');
        const afroHouseDance = new Dance('afroHouseDesc', 'afroHouseCommand');

        const salsaSoloTopic = new Topic('salsaSoloTopicDesc', 'salsaSoloTopicCommand');
        const salsaPartnerTopic = new Topic('salsaPartnerTopicDesc', 'salsaPartnerTopicCommand');
        const salsaMixTopic = new Topic('salsaMixTopicDesc', 'salsaMixTopicCommand');

        const salsaSoloClasses = new GroupLessons('salsaSoloClassesDesc', 'salsaSoloClassesCommand', async () => await repository.getClasses(Meta.SalsaSolo));
        const salsaPartnerClasses = new GroupLessons('salsaPartnerClassesDesc', 'salsaPartnerClassesCommand', async () => await repository.getClasses(Meta.SalsaPartner));
        const salsaMixClasses = new GroupLessons('salsaMixClassesDesc', 'salsaMixClassesCommand', async () => await repository.getClasses(Meta.SalsaMix));

        const joinSalsaSoloClasses = new JoinGroupLesson('joinSalsaSoloClassesDesc', 'joinSalsaSoloClassesCommand', async () => await repository.getClasses(Meta.SalsaSolo),
            async () => await repository.getClassesParticipants(Meta.SalsaSolo), 
            async (rowNumber, classId, className, username) => await repository.participateClass(Meta.SalsaSolo, rowNumber, classId, className, username));

        const joinSalsaPartnerClasses = new JoinGroupLesson('joinSalsaPartnerClassesDesc', 'joinSalsaPartnerClassesCommand', async () => await repository.getClasses(Meta.SalsaPartner),
            async () => await repository.getClassesParticipants(Meta.SalsaPartner), 
            async (rowNumber, classId, className, username) => await repository.participateClass(Meta.SalsaPartner, rowNumber, classId, className, username));
        
        const joinSalsaMixClasses = new JoinGroupLesson('joinSalsaMixClassesDesc', 'joinSalsaMixClassesCommand', async () => await repository.getClasses(Meta.SalsaMix),
            async () => await repository.getClassesParticipants(Meta.SalsaMix), 
            async (rowNumber, classId, className, username) => await repository.participateClass(Meta.SalsaMix, rowNumber, classId, className, username));

        const joinPrivateSalsaSoloClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.SalsaSolo, async () => await repository.getPrivateLessons());
        const joinPrivateSalsaPartnerClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.SalsaPartner, async () => await repository.getPrivateLessons());
        const joinPrivateSalsaMixClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.SalsaMix, async () => await repository.getPrivateLessons());

        const bachataSoloTopic = new Topic('bachataSoloTopicDesc', 'bachataSoloTopicCommand');
        const bachataPartnerTopic = new Topic('bachataPartnerTopicDesc', 'bachataPartnerTopicCommand');
        const bachataMixTopic = new Topic('bachataMixTopicDesc', 'bachataMixTopicCommand');

        const bachataSoloClasses = new GroupLessons('bachataSoloClassesDesc', 'bachataSoloClassesCommand', async () => await repository.getClasses(Meta.BachataSolo));
        const bachataPartnerClasses = new GroupLessons('bachataPartnerClassesDesc', 'bachataPartnerClassesCommand',  async () => await repository.getClasses(Meta.BachataPartner));
        const bachataMixClasses = new GroupLessons('bachataMixClassesDesc', 'bachataMixClassesCommand', async () => await repository.getClasses(Meta.BachataMix));

        const joinBachataSoloClasses = new JoinGroupLesson('joinBachataSoloClassesDesc', 'joinBachataSoloClassesCommand', async () => await repository.getClasses(Meta.BachataSolo),
            async () => await repository.getClassesParticipants(Meta.BachataSolo), 
            async (rowNumber, classId, className, username) => await repository.participateClass(Meta.BachataSolo, rowNumber, classId, className, username));
        
        const joinBachataPartnerClasses = new JoinGroupLesson('joinBachataPartnerClassesDesc', 'joinBachataPartnerClassesCommand', async () => await repository.getClasses(Meta.BachataPartner),
            async () => await repository.getClassesParticipants(Meta.BachataPartner), 
            async (rowNumber, classId, className, username) => await repository.participateClass(Meta.BachataPartner, rowNumber, classId, className, username));

        const joinBachataMixClasses = new JoinGroupLesson('joinBachataMixClassesDesc', 'joinBachataMixClassesCommand', async () => await repository.getClasses(Meta.BachataMix),
            async () => await repository.getClassesParticipants(Meta.BachataMix), 
            async (rowNumber, classId, className, username) => await repository.participateClass(Meta.BachataMix, rowNumber, classId, className, username));
        
        const joinPrivateBachataSoloClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.BachataSolo, async () => await repository.getPrivateLessons());
        const joinPrivateBachataPartnerClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.BachataPartner, async () => await repository.getPrivateLessons());
        const joinPrivateBachataMixClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsCommand', Meta.BachataMix, async () => await repository.getPrivateLessons());
        
        const joinPrivateClasses = new JoinPrivateLesson('privateLessonsDesc', 'JPL', (username, field) => metaData.getMetadata(username, field), async () => await repository.getPrivateLessons(), async (lessonId, dance, username) => await repository.participatePrivateLesson(lessonId, dance, username));
        
        events.nextSteps = [masterClasses, festivalsClasses, showsClasses];

        masterClasses.nextSteps = [joinEvent];
        festivalsClasses.nextSteps = [joinEvent];
        showsClasses.nextSteps = [joinEvent];

        dances.nextSteps = [salsaDance, bachataDance];

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

        this.initialStep = dances;
    }

    findCurrentStep(message) {
        console.log(message.toLocaleLowerCase());
        const matches = message.match(/(\d+)/);
        const found = this.findStep(this.initialStep, message, !matches);
        if (found) {
            this.currentStep = found;
        } else {
            this.currentStep = this.initialStep;
        }
        return this.currentStep;
    }

    findStep(top, message, equals) {
        let queue = []
        queue.push(top);
        while(queue.length > 0) {
            let step = queue.shift();
            for(let nextStep of step.nextSteps) {
                queue.push(nextStep);
                if (equals) {
                    if (message.toLocaleLowerCase() === nextStep.command.toLocaleLowerCase()) {
                        queue = [];
                        return nextStep;
                    }
                }
                else {
                    if (message.toLocaleLowerCase().includes(nextStep.command.toLocaleLowerCase())) {
                        return nextStep;
                    }
                }
            }
        } 
        return null;
    }
}

module.exports = MessagesTree;