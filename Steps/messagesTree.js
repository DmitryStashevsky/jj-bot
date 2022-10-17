const InitialStep = require('./initialStep.js');
const Lessons = require('./lessons.js');
const GroupLessons = require('./groupLessons.js');
const PrivateLessons = require('./privateLessons.js');
const JoinGroupLessons = require('./joinGroupLesson.js');
const JoinPrivateLessons = require('./joinPrivateLesson.js');

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

        initialStep.nextSteps = [lessons];
        lessons.nextSteps = [groupLessons, privateLessons];
        groupLessons.nextSteps = [joinGroupLessons];
        privateLessons.nextSteps = [joinPrivateLessons];

        this.initialStep = initialStep;

        this.steps = [initialStep, lessons, groupLessons, privateLessons, joinGroupLessons, joinPrivateLessons];
    }

    findCurrentStep(message) {
        console.log(message.toLocaleLowerCase());
        const found = this.steps.filter(e =>  message.toLocaleLowerCase().includes(e.command.toLocaleLowerCase()));
        if (found.length > 0) {
            this.currentStep = found[0];
        } else {
            this.currentStep = this.initialStep;
        }
        return this.currentStep;
    }
}

module.exports = MessagesTree;