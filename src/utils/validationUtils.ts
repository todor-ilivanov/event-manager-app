import { EventDTO } from '../models/Event';
import { stringToDate } from './dateUtils';

export const validateNewEvent = (newEvent: EventDTO): string[] => {
    const fieldLengthErrors = validateFieldLength(newEvent);
    const dateErrors = validateDates(newEvent);
    return fieldLengthErrors.concat(dateErrors);
};

const validateFieldLength = (newEvent: EventDTO): string[] => {
    const fieldToMaxLengthMap = {
        'headline': 30,
        'description': 280,
        'city': 50
    };

    const errors: string[] = Object.keys(fieldToMaxLengthMap)
        .filter(field => newEvent[field] !== undefined && newEvent[field]!!.length === 0)
        .map(field => `The ${field} cannot be empty.`);

    Object.entries(fieldToMaxLengthMap).forEach(([field, maxLength]) => {
        if(newEvent[field] !== undefined && newEvent[field]!!.length > maxLength) {
            errors.push(`The ${field} cannot be more than ${maxLength} characters.`);
        }
    });

    return errors;
};

const validateDates = (newEvent: EventDTO): string[] => {
    const start: Date = stringToDate(newEvent.startDate);
    const end: Date = stringToDate(newEvent.endDate);
    const errors = [];

    if(start > end) {
        errors.push('The end date must be later than the start date.');
    }

    return errors;
};