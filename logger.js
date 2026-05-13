import chalk from 'chalk';

export function setSectionHeading(text) {
    return chalk.bold.bgGray.whiteBright(`\n=+=|${text}|=+=\n`);
}

export function setTopicTitle(text) {
    return chalk.bold.redBright(text);
}

export function setDurationTitle(text) {
    return chalk.dim(text);
}

export function setTotalDurationTitle(text) {
    return chalk.bold.magentaBright(text);
}