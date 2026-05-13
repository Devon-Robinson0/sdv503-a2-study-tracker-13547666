import readline from 'readline';
import stringWidth from 'string-width';
import { setSectionHeading, setTopicTitle, setDurationTitle, 
    setTotalDurationTitle } from './logger.js';

function padChalk(text, length) {
    const visibleLength = stringWidth(text);
    return text + ' '.repeat(length - visibleLength);
}

let totalDuration = 0;
const sessions = [];

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

    let cancelEarly = false;

    try {
        topic = await ask('Enter Session Topic: ');
        const exitEarly = validateTopic(topic);

        if (exitEarly) {
            console.log('\nExited\n');
            return;
        }

        duration = await ask('Enter Session Duration: ');
        cancelEarly = validateDuration(duration);

    } catch(err) {
        console.log(err + ', Try Again');

        addNewSession();
        return;
    }

    if (!cancelEarly) {
        sessions.push([topic, duration]);
    }
    displaySessions();
}

function validateTopic(topic) {
    // VALIDATE
    // TOPIC: MUST NOT BE EMPTY OR WHITESPACE

    if (topic.trim() === '') { 
        throw new Error('Topic must not be empty');
    }

    if (topic.toLowerCase() === 'exit') {
        rl.close();
        return true;
    }
}

function validateDuration(duration) {
    // VALIDATE
    // DURATION: MUST NOT BE NON-POSITIVE NUMBER, MUST NOT USE INCORRECT MEASUREMENT

    if (duration === '') { throw new Error('Duration must not be empty'); }

    if (duration.toLowerCase() === 'cancel') {
        return true;
    }

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
        incrementTotalDuration(number, segment[segment.length - 1]);
    }
}

function incrementTotalDuration(incrementValue, measurement) {
    switch (measurement) {
        case "h":
            totalDuration += (incrementValue * 60);
            break;
        case "m":
            totalDuration += incrementValue;
            break;
    }
}

function displaySessions() {
    // IMPROVE VISUALS
    let table = setSectionHeading('Sessions');

    for (let [topic, duration] of sessions) {
        const topicTitle = padChalk(setTopicTitle(topic), 14);
        const durationTitle = padChalk(setDurationTitle(duration), 14);
        const newString = topicTitle + durationTitle;

        table += newString + '\n';
    }

    console.log(table);
    const hours = Math.floor(totalDuration / 60);
    const mins = totalDuration - (hours * 60);
    const totalDurationTitle = setTotalDurationTitle('Total Duration:');
    const totalDurationNumberTitle = setDurationTitle(`${hours}h${mins}m`)
    console.log(`${totalDurationTitle} ${totalDurationNumberTitle}\n`);

    addNewSession();
}

addNewSession();