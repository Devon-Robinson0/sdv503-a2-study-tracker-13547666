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
    let minutes;

    try {
        const topic = await ask('Enter Session Topic: ');
        validateTopic(topic);

        const duration = await ask('Enter Session Duration: ');
        minutes = validateDuration(duration);

    } catch(err) {
        console.log(err + ', Try Again');
    }

    rl.close();
}

function validateTopic(topic) {
    // VALIDATE
    // TOPIC: MUST NOT BE EMPTY OR WHITESPACE

    if (topic.trim() === '') { 
        throw new Error('Topic must not be empty');
    }
}

function validateDuration(duration) {
    // VALIDATE
    // DURATION: MUST NOT BE NON-POSITIVE NUMBER, MUST NOT USE INCORRECT MEASUREMENT

    const validMeasurements = ['h', 'm'];

    const segments = duration.split(':');
    for (let segment of segments) {
        // Check if last element in string is valid measurement e.g. 'h' or 'm' 
        if (!validMeasurements.includes(segment[segment.length - 1].toLowerCase())) {
            throw new Error('Ensure each segment ends with correct time measurement (h or m): e.g. 4h:20m, 20m')
        }
        const number = Number(segment.slice(0, segment.length - 1));
        if (Number.isNaN(number)) {
            throw new Error('Ensure correct formatting is used e.g. 4h:20m, 20m');
        }
        if (number <= 0) {
            throw new Error('Number must be a positive value');
        }  
    }
}

addNewSession();