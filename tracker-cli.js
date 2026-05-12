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
    let topic;
    let duration;

    try {
        topic = await ask('Enter Session Topic: ');
        validateTopic(topic);

        duration = await ask('Enter Session Duration: ');
        validateDuration(duration);

    } catch(err) {
        console.log(err + ', Try Again');

        addNewSession();
        return;
    }

    const newSession = sessions.push([topic, duration]);

    displaySessions();
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

    if (duration === '') { throw new Error('Duration must not be empty'); }

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

function displaySessions() {
    // IMPROVE VISUALS
    let table = '|==SESSIONS==|\n';

    for (let [topic, duration] of sessions) {
        const newString = topic.padEnd(15) + duration;
        table += newString + '\n';
    }

    console.log(table);
}

addNewSession();