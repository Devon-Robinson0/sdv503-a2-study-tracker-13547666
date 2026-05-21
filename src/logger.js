import chalk from 'chalk';

export function getSectionHeading(text) {
    return chalk.bold.bgGray.whiteBright(`\n=+=|${text}|=+=\n`);
}

export function getTopicTitle(text) {
    return chalk.bold.redBright(text);
}

export function getDurationTitle(text) {
    return chalk.dim(text);
}

export function getTotalDurationTitle(text) {
    return chalk.bold.magentaBright(text);
}

export function getUserInputText(text) {
    return chalk.bold.blueBright(text);
}

export function getErrorText(text) {
    return chalk.bold.redBright(text);
}