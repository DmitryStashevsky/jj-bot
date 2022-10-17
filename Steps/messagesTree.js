const InitialStep = require('./initialStep.js');
const Lessons = require('./lessons.js');
const PrivateLessons = require('./privateLessons.js');
const JoinPrivateLessons = require('./joinPrivateLessons.js');

class MessagesTree {
    initialStep;
    currentStep;
    steps;

    constructor() {
        const initialStep = new InitialStep();
        const lessons = new Lessons();
        const privateLessons = new PrivateLessons();
        const joinPrivateLessons = new JoinPrivateLessons();

        initialStep.nextSteps = [lessons, privateLessons];
        privateLessons.nextSteps = [joinPrivateLessons];

        this.initialStep = initialStep;

        this.steps = [initialStep, lessons, privateLessons, joinPrivateLessons];
    }

    findCurrentStep(message) {
        const found = this.steps.filter(e => e.message.toLocaleLowerCase() 
            === message.toLocaleLowerCase());
        if (found.length > 0) {
            this.currentStep = found[0];
        } else {
            this.currentStep = this.initialStep;
        }
        return this.currentStep;
    }
}

module.exports = MessagesTree;