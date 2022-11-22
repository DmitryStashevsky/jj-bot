const InitialStep = require('./initialStep.js');
const Lessons = require('./lessons.js');
const GroupLessons = require('./groupLessons.js');
const PrivateLessons = require('./privateLessons.js');
const JoinGroupLessons = require('./joinGroupLesson.js');
const JoinPrivateLessons = require('./joinPrivateLesson.js');

const Events = require('./events.js');

const Dances = require('./dances.js');
const BachataDance = require('./bachataDance.js');
const SalsaDance = require('./salsaDance.js');
const LatinoGrooveDance= require('./latinoGrooveDance.js');
const AfroHouseDance = require('./afroHouseDance.js');

const SalsaSoloTopic = require('./salsaSoloTopic.js');
const SalsaPartnerTopic = require('./salsaPartnerTopic.js');
const SalsaMixTopic = require('./salsaMixTopic.js');
const SalsaSoloClasses = require('./salsaSoloClasses.js');
const SalsaPartnerClasses = require('./salsaPartnerClasses.js');
const SalsaMixClasses = require('./salsaMixClasses.js');

const BachataSoloTopic = require('./bachataSoloTopic.js');
const BachataPartnerTopic = require('./bachataPartnerTopic.js');
const BachataMixTopic = require('./bachataMixTopic.js');
const BachataSoloClasses = require('./bachataSoloClasses.js');
const BachataPartnerClasses = require('./bachataPartnerClasses.js');
const BachataMixClasses = require('./bachataMixClasses.js');

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
    steps;

    constructor(repository) {
        const initialStep = new InitialStep();
        const lessons = new Lessons();
        const groupLessons = new GroupLessons(repository);
        const privateLessons = new PrivateLessons();
        const joinGroupLessons = new JoinGroupLessons(repository);
        const joinPrivateLessons = new JoinPrivateLessons();

        const events = new Events();

        const dances = new Dances();
        const salsaDance = new SalsaDance();
        const bachataDance = new BachataDance();
        const latinoGrooveDance = new LatinoGrooveDance();
        const afroHouseDance = new AfroHouseDance();

        const salsaSoloTopic = new SalsaSoloTopic();
        const salsaPartnerTopic = new SalsaPartnerTopic();
        const salsaMixTopic = new SalsaMixTopic();

        const salsaSoloClasses = new SalsaSoloClasses();
        const salsaPartnerClasses = new SalsaPartnerClasses();
        const salsaMixClasses = new SalsaMixClasses();

        const bachataSoloTopic = new BachataSoloTopic();
        const bachataPartnerTopic = new BachataPartnerTopic();
        const bachataMixTopic = new BachataMixTopic();

        const bachataSoloClasses = new BachataSoloClasses();
        const bachataPartnerClasses = new BachataPartnerClasses();
        const bachataMixClasses = new BachataMixClasses();

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

        initialStep.nextSteps = [lessons];
        lessons.nextSteps = [groupLessons, privateLessons];
        groupLessons.nextSteps = [joinGroupLessons];
        privateLessons.nextSteps = [joinPrivateLessons];

        dances.nextSteps = [salsaDance, bachataDance, latinoGrooveDance, afroHouseDance];

        salsaDance.nextSteps = [salsaSoloTopic, salsaPartnerTopic, salsaMixTopic];
        salsaSoloTopic.nextSteps = [salsaSoloClasses, events];
        salsaPartnerTopic.nextSteps = [salsaPartnerClasses, events];
        salsaMixTopic.nextSteps = [salsaMixClasses, events];
        
        bachataDance.nextSteps = [bachataSoloTopic, bachataPartnerTopic, bachataMixTopic];
        bachataSoloTopic.nextSteps = [bachataSoloClasses, events];
        bachataPartnerTopic.nextSteps = [bachataPartnerClasses, events];
        bachataMixTopic.nextSteps = [bachataMixClasses, events];

        latinoGrooveDance.nextSteps = [latinoGrooveSoloTopic, latinoGroovePartnerTopic, latinoGrooveMixTopic];
        latinoGrooveSoloTopic.nextSteps = [latinoGrooveSoloClasses, events];
        latinoGroovePartnerTopic.nextSteps = [latinoGroovePartnerClasses, events];
        latinoGrooveMixTopic.nextSteps = [latinoGrooveMixClasses, events];

        afroHouseDance.nextSteps = [afroHouseSoloTopic, afroHousePartnerTopic, afroHouseMixTopic];
        afroHouseSoloTopic.nextSteps = [afroHouseSoloClasses, events];
        afroHousePartnerTopic.nextSteps = [afroHousePartnerClasses, events];
        afroHouseMixTopic.nextSteps = [afroHouseMixClasses, events];

        this.initialStep = dances;

        this.steps = [initialStep, lessons, groupLessons, privateLessons, joinGroupLessons, joinPrivateLessons,
        events, dances, salsaDance, bachataDance, latinoGrooveDance, afroHouseDance, salsaSoloTopic, salsaPartnerTopic, 
        salsaMixTopic, salsaSoloClasses, salsaPartnerClasses, salsaMixClasses, 
        bachataSoloTopic, bachataPartnerTopic, bachataMixTopic,
        bachataSoloClasses, bachataPartnerClasses, bachataMixClasses,
        latinoGrooveSoloTopic, latinoGroovePartnerTopic, latinoGrooveMixTopic, 
        latinoGrooveSoloClasses, latinoGroovePartnerClasses, latinoGrooveMixClasses,
        afroHouseSoloTopic, afroHousePartnerTopic, 
        afroHouseMixTopic, afroHouseSoloClasses, afroHousePartnerClasses, afroHouseMixClasses];
    }

    findCurrentStep(message) {
        console.log(message.toLocaleLowerCase());
        const matches = message.match(/(\d+)/);
        let found;
        if (matches) {
            found = this.steps.filter(e =>  message.toLocaleLowerCase().includes(e.command.toLocaleLowerCase()));
        } else {
            found = this.steps.filter(e =>  message.toLocaleLowerCase() === e.command.toLocaleLowerCase());
        }
        if (found.length > 0) {
            this.currentStep = found[0];
        } else {
            this.currentStep = this.initialStep;
        }
        return this.currentStep;
    }
}

module.exports = MessagesTree;