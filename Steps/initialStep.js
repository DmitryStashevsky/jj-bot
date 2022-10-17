const Step = require('./step.js');

class InitialStep extends Step {
    message = 'Привет! Я бот JJ - у меня ты можешь спросить что хочешь';
    command = 'Начало';
}

module.exports = InitialStep;