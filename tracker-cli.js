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
    const topic = await ask('Enter Session Topic: ');
    const duration = await ask('Enter Session Duration: ');

    
    rl.close();
}

addNewSession();