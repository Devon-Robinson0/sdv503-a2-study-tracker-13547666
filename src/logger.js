import chalk from 'chalk';

export function getSectionHeading(text, spacerValue) {
    return chalk.bold.bgGray.whiteBright(`\n${' '.repeat(spacerValue)}----|${text}|----\n`);
}

export function getTopicTitleText(text) {
    return chalk.bold.redBright(text);
}

export function getDurationText(text) {
    return chalk.dim(text);
}

export function getTotalDurationText(text) {
    return chalk.bold.magentaBright(text);
}

export function getUserInputText(text) {
    return chalk.bold.blueBright(text);
}

export function getErrorText(text) {
    return chalk.bold.redBright(text);
}