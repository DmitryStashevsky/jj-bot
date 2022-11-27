
const { Meta } = require('../cache.config.js');

const GroupLessons = require('./groupLessons.js');
const PrivateLessons = require('./privateLessons.js');
const JoinGroupLesson = require('./joinGroupLesson.js');
const JoinPrivateLesson = require('./joinPrivateLesson.js');

const Events = require('./events.js');

const Dances = require('./dances.js');
const Dance = require('./dance.js');

const Topic = require('./topic.js');

const LatinoGrooveSoloTopic = require('./latinoGrooveSoloTopic.js');
const LatinoGroovePartnerTopic = require('./latinoGroovePartnerTopic.js');
const LatinoGrooveMixTopic = require('./latinoGrooveMixTopic.js');
const LatinoGrooveSoloClasses = require('./latinoGrooveSoloClasses.js');
const LatinoGroovePartnerClasses = require('./latinoGroovePartnerClasses.js');
const LatinoGrooveMixClasses = require('./latinoGrooveMixClasses.js');

const AfroHouseSoloTopic = require('./afroHouseSoloTopic.js');
const AfroHousePartnerTopic = require('./afroHousePartnerTopic.js');
const AfroHouseMixTopic = require('./afroHouseMixTopic.js');
const AfroHouseSoloClasses = require('./afroHouseSoloClasses.js');
const AfroHousePartnerClasses = require('./afroHousePartnerClasses.js');
const AfroHouseMixClasses = require('./afroHouseMixClasses.js');

class MessagesTree {
    initialStep;
    currentStep;

    constructor(repository, metaData) {
        const events = new Events();

        const dances = new Dances();
        const salsaDance = new Dance('salsaDesc', 'salsaCommand');
        const bachataDance = new Dance('bachataDesc', 'bachataCommand');
        const latinoGrooveDance = new Dance('latinoGrooveDesc', 'latinoGrooveCommand');
        const afroHouseDance = new Dance('afroHouseDesc', 'afroHouseCommand');

        const salsaSoloTopic = new Topic('salsaSoloTopicDesc', 'salsaSoloTopicCommand');
        const salsaPartnerTopic = new Topic('salsaPartnerTopicDesc', 'salsaPartnerTopicCommand');
        const salsaMixTopic = new Topic('salsaMixTopicDesc', 'salsaMixTopicCommand');

        const salsaSoloClasses = new GroupLessons('salsaSoloClassesDesc', 'salsaSoloClassesCommand', async () => await repository.getLessons(Meta.SalsaSolo));
        const salsaPartnerClasses = new GroupLessons('salsaPartnerClassesDesc', 'salsaPartnerClassesCommand', async () => await repository.getLessons(Meta.SalsaPartner));
        const salsaMixClasses = new GroupLessons('salsaMixClassesDesc', 'salsaMixClassesCommand', async () => await repository.getLessons(Meta.SalsaMix));

        const joinSalsaSoloClasses = new JoinGroupLesson('joinSalsaSoloClassesDesc', 'joinSalsaSoloClassesCommand', async () => await repository.getLessons(Meta.SalsaSolo));
        const joinSalsaPartnerClasses = new JoinGroupLesson('joinSalsaPartnerClassesDesc', 'joinSalsaPartnerClassesCommand', async () => await repository.getLessons(Meta.SalsaPartner));
        const joinSalsaMixClasses = new JoinGroupLesson('joinSalsaMixClassesDesc', 'joinSalsaMixClassesCommand', async () => await repository.getLessons(Meta.SalsaMix));

        const bachataSoloTopic = new Topic('bachataSoloTopicDesc', 'bachataSoloTopicCommand');
        const bachataPartnerTopic = new Topic('bachataPartnerTopicDesc', 'bachataPartnerTopicCommand');
        const bachataMixTopic = new Topic('bachataMixTopicDesc', 'bachataMixTopicCommand');

        const bachataSoloClasses = new GroupLessons('bachataSoloClassesDesc', 'bachataSoloClassesCommand', async () => await repository.getLessons(Meta.BachataSolo));
        const bachataPartnerClasses = new GroupLessons('bachataPartnerClassesDesc', 'bachataPartnerClassesCommand',  async () => await repository.getLessons(Meta.BachataPartner));
        const bachataMixClasses = new GroupLessons('bachataMixClassesDesc', 'bachataMixClassesCommand', async () => await repository.getLessons(Meta.BachataMix));

        const joinBachataSoloClasses = new JoinGroupLesson('joinBachataSoloClassesDesc', 'joinBachataSoloClassesCommand', async () => await repository.getLessons(Meta.BachataSolo));
        const joinBachataPartnerClasses = new JoinGroupLesson('joinBachataPartnerClassesDesc', 'joinBachataPartnerClassesCommand', async () => await repository.getLessons(Meta.BachataPartner));
        const joinBachataMixClasses = new JoinGroupLesson('joinBachataMixClassesDesc', 'joinBachataMixClassesCommand', async () => await repository.getLessons(Meta.BachataMix));
        
        const joinPrivateBachataSoloClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsBSoloDescCommand', 'Bachata Solo', () => repository.getFreeSlots());
        const joinPrivateBachataPartnerClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsBPartnerDescCommand', 'Bachata Partner', () => repository.getFreeSlots());
        const joinPrivateBachataMixClasses = new PrivateLessons('privateLessonsDesc', 'privateLessonsBMixDescCommand', 'Bachata Mix', () => repository.getFreeSlots());
        
        const joinPrivateClasses = new JoinPrivateLesson('privateLessonsDesc', 'JPL', (username, field) => metaData.getMetadata(username, field), () => repository.getFreeSlots());

        const latinoGrooveSoloTopic = new LatinoGrooveSoloTopic();
        const latinoGroovePartnerTopic = new LatinoGroovePartnerTopic();
        const latinoGrooveMixTopic = new LatinoGrooveMixTopic();

        const latinoGrooveSoloClasses = new LatinoGrooveSoloClasses();
        const latinoGroovePartnerClasses = new LatinoGroovePartnerClasses();
        const latinoGrooveMixClasses = new LatinoGrooveMixClasses();

        const afroHouseSoloTopic = new AfroHouseSoloTopic();
        const afroHousePartnerTopic = new AfroHousePartnerTopic();
        const afroHouseMixTopic = new AfroHouseMixTopic();

        const afroHouseSoloClasses = new AfroHouseSoloClasses();
        const afroHousePartnerClasses = new AfroHousePartnerClasses();
        const afroHouseMixClasses = new AfroHouseMixClasses();

        dances.nextSteps = [salsaDance, bachataDance];

        salsaDance.nextSteps = [salsaSoloTopic, salsaPartnerTopic, salsaMixTopic];
        salsaSoloTopic.nextSteps = [salsaSoloClasses, events];
        salsaPartnerTopic.nextSteps = [salsaPartnerClasses, events];
        salsaMixTopic.nextSteps = [salsaMixClasses, events];
        
        salsaSoloClasses.nextSteps =[joinSalsaSoloClasses];
        salsaPartnerClasses.nextSteps =[joinSalsaPartnerClasses];
        salsaMixClasses.nextSteps =[joinSalsaMixClasses];

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

        latinoGrooveDance.nextSteps = [latinoGrooveSoloTopic, latinoGroovePartnerTopic, latinoGrooveMixTopic];
        latinoGrooveSoloTopic.nextSteps = [latinoGrooveSoloClasses, events];
        latinoGroovePartnerTopic.nextSteps = [latinoGroovePartnerClasses, events];
        latinoGrooveMixTopic.nextSteps = [latinoGrooveMixClasses, events];

        afroHouseDance.nextSteps = [afroHouseSoloTopic, afroHousePartnerTopic, afroHouseMixTopic];
        afroHouseSoloTopic.nextSteps = [afroHouseSoloClasses, events];
        afroHousePartnerTopic.nextSteps = [afroHousePartnerClasses, events];
        afroHouseMixTopic.nextSteps = [afroHouseMixClasses, events];

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