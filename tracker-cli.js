let totalDuration;
const sessions = [];

import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(q) {
    return new Promise(resolve => rl.question(q, resolve));
}

async function addNewSession() {
    // ADD THROW AND CATCH FOR ERRORS
    const topic = await ask('Enter Session Topic: ');
    validateTopic(topic);

    const duration = await ask('Enter Session Duration: ');
    validateDuration(duration);

    rl.close();
}

function validateTopic(topic) {
    // VALIDATE
    // TOPIC: MUST NOT BE EMPTY OR WHITESPACE

    if (topic.trim() === '') { return console.log("error")}
}

function validateDuration(duration) {
    // VALIDATE
    // DURATION: MUST NOT BE NON-POSITIVE NUMBER, MUST NOT USE INCORRECT MEASUREMENT
    // EXAMPLE STRING: 4h:20m
    
    const validMeasurements = ['h', 'm'];

    const segments = duration.split(':');
    for (let segment of segments) {
        // Check if last element in string is valid measurement e.g. 'h' or 'm' 
        if (!validMeasurements.includes(segment[segment.length - 1].toLowerCase())) {
            console.log('Measurement Error');
            return;
        }
        const number = Number(segment.slice(0, segment.length - 1));
        if (Number.isNaN(number)) {
            console.log('Formatting Error');
            return;
        }
        console.log(number);
        if (number <= 0) {
            console.log('non-positive value error');
            return;
        }
    }
}

addNewSession();