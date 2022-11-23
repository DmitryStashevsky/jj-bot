
const GroupLessons = require('./groupLessons.js');
const PrivateLessons = require('./privateLessons.js');
const JoinGroupLesson = require('./joinGroupLesson.js');
const JoinPrivateLessons = require('./joinPrivateLesson.js');

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

    constructor(repository) {
        const privateLessons = new PrivateLessons();
        const joinPrivateLessons = new JoinPrivateLessons();

        const events = new Events();

        const dances = new Dances();
        const salsaDance = new Dance('salsaDesc', 'salsaCommand');
        const bachataDance = new Dance('bachataDesc', 'bachataCommand');
        const latinoGrooveDance = new Dance('latinoGrooveDesc', 'latinoGrooveCommand');
        const afroHouseDance = new Dance('afroHouseDesc', 'afroHouseCommand');

        const salsaSoloTopic = new Topic('salsaSoloTopicDesc', 'salsaSoloTopicCommand');
        const salsaPartnerTopic = new Topic('salsaPartnerTopicDesc', 'salsaPartnerTopicCommand');
        const salsaMixTopic = new Topic('salsaMixTopicDesc', 'salsaMixTopicCommand');

        const salsaSoloClasses = new GroupLessons('salsaSoloClassesDesc', 'salsaSoloClassesCommand', () => repository.getLessons());
        const salsaPartnerClasses = new GroupLessons('salsaPartnerClassesDesc', 'salsaPartnerClassesCommand', () => repository.getLessons());
        const salsaMixClasses = new GroupLessons('salsaMixClassesDesc', 'salsaMixClassesCommand', () => repository.getLessons());

        const joinSalsaSoloClasses = new JoinGroupLesson('joinSalsaSoloClassesDesc', 'joinSalsaSoloClassesCommand', () => repository.getLessons());
        const joinSalsaPartnerClasses = new JoinGroupLesson('joinSalsaPartnerClassesDesc', 'joinSalsaPartnerClassesCommand', () => repository.getLessons());
        const joinSalsaMixClasses = new JoinGroupLesson('joinSalsaMixClassesDesc', 'joinSalsaMixClassesCommand', () => repository.getLessons());

        const bachataSoloTopic = new Topic('bachataSoloTopicDesc', 'bachataSoloTopicCommand');
        const bachataPartnerTopic = new Topic('bachataPartnerTopicDesc', 'bachataPartnerTopicCommand');
        const bachataMixTopic = new Topic('bachataMixTopicDesc', 'bachataMixTopicCommand');

        const bachataSoloClasses = new GroupLessons('bachataSoloClassesDesc', 'bachataSoloClassesCommand', () => repository.getLessons());
        const bachataPartnerClasses = new GroupLessons('bachataPartnerClassesDesc', 'bachataPartnerClassesCommand', () => repository.getLessons());
        const bachataMixClasses = new GroupLessons('bachataMixClassesDesc', 'bachataMixClassesCommand', () => repository.getLessons());

        const joinBachataSoloClasses = new JoinGroupLesson('joinBachataSoloClassesDesc', 'joinBachataSoloClassesCommand', () => repository.getLessons());
        const joinBachataPartnerClasses = new JoinGroupLesson('joinBachataPartnerClassesDesc', 'joinBachataPartnerClassesCommand', () => repository.getLessons());
        const joinBachataMixClasses = new JoinGroupLesson('joinBachataMixClassesDesc', 'joinBachataMixClassesCommand', () => repository.getLessons());

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
        bachataSoloTopic.nextSteps = [bachataSoloClasses, events];
        bachataPartnerTopic.nextSteps = [bachataPartnerClasses, events];
        bachataMixTopic.nextSteps = [bachataMixClasses, events];

        bachataSoloClasses.nextSteps =[joinBachataSoloClasses];
        bachataPartnerClasses.nextSteps =[joinBachataPartnerClasses];
        bachataMixClasses.nextSteps =[joinBachataMixClasses];

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