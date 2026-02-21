import { stringToDate } from '../../utils/dateUtils';

describe('dateUtils', () => {

    it('stringToDate converts a date string to a date successfully', () => {
        const date = stringToDate('03/07/2021');
        expect(date.getDate()).toBe(3);
        expect(date.getMonth()).toBe(6);
        expect(date.getFullYear()).toBe(2021);
    });

    it('stringToDate throws an error when the date format is incorrect', () => {
        expect(() => stringToDate('03-07-2021')).toThrow('Incorrect date format.');
    });
});