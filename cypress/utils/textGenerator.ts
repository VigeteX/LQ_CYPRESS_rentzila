import { faker } from '@faker-js/faker';

/**
 * Generates text of selected length
 * @param {number} length - length in symbols
 * @returns {string}
 */
export function generateText(length: number = 9000): string {
    let text: string = '';
    while (text.length < length) {
        text += faker.lorem.word() + ' ';
    }
    return text.slice(0, length);
}
