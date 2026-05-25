import readline from 'readline';
import stringWidth from 'string-width';
import { getSectionHeading, getTopicTitleText, getDurationText, 
    getTotalDurationText, getUserInputText, getErrorText } from './logger.js';

function padChalk(text, length) {
    const visibleLength = stringWidth(text);
    if (visibleLength > length) {
        length = visibleLength + 2;
    }
    return text + getDurationText('·'.repeat(length - visibleLength));
}

let totalDuration = 0;
const sessions = [];

let tablePadding = 14;

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
        const topicText = getUserInputText('Enter Session Topic: ');
        topic = await ask(topicText);
        const exitEarly = validateTopic(topic);

        if (exitEarly) {
            console.log('\nExited\n');
            return;
        }

        const durationText = getUserInputText('Enter Session Duration: ');
        duration = await ask(durationText);
        cancelEarly = validateDuration(duration);

    } catch(err) {
        const errorText = getErrorText(err + ', Try Again');
        console.log(errorText);

        addNewSession();
        return;
    }

    let durationMinutes = 0;
    const segments = duration.split(':');
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const value = Number(segment.slice(0, segment.length - 1));
        const measurement = segment[segment.length - 1];
        durationMinutes += getDurationInMinutes(value, measurement);
    }
    totalDuration += durationMinutes;

    if (!cancelEarly) {
        sessions.push([topic, durationMinutes]);
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

    if (duration.trim() === '') { throw new Error('Duration must not be empty'); }

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
        if (!Number.isInteger(number)) {
            throw new Error('Number must be an interger');
        }
        if (number <= 0) {
            throw new Error('Number must be a positive value');
        }  
    }
}

function getDurationInMinutes(incrementValue, measurement) {
    let minutes = 0;
    switch (measurement.toLowerCase()) {
        case "h":
            minutes += (incrementValue * 60);
            break;
        case "m":
            minutes += incrementValue;
            break;
    }
    return minutes;
}

function getMinutesInHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes - (hours * 60);

    return `${hours}h${mins}m`;
}

function displaySessions() {
    // IMPROVE VISUALS
    let table = getSectionHeading('Sessions');

    sessions.forEach((session) => {
        if (session[0].length > tablePadding) {
            tablePadding = session[0].length + 2;
        }
    })

    for (let [topic, duration] of sessions) {
        const topicTitle = padChalk(getTopicTitleText(topic.trim()), tablePadding);

        const durationText = getDurationText(getMinutesInHours(duration));
        const newString = topicTitle + durationText;

        table += newString + '\n';
    }

    console.log(table);
    const totalDurationText = getMinutesInHours(totalDuration);
    const totalDurationTitle = getTotalDurationText('Total Duration:');
    const totalDurationNumberText = getDurationText(`${totalDurationText} (${totalDuration}m)`);
    console.log(`${totalDurationTitle} ${totalDurationNumberText}\n`);

    addNewSession();
}

addNewSession();