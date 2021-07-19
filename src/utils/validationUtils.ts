import { NewEvent } from '../models/ApiRequests';

export const validateNewEvent = (newEvent: NewEvent): string[] => {
    const fieldLengthErrors = validateFieldLength(newEvent);
    const dateErrors = validateDates(newEvent);
    return fieldLengthErrors.concat(dateErrors);
};

const validateFieldLength = (newEvent: NewEvent): string[] => {
    const fieldToMaxLengthMap = {
        'headline': 30,
        'description': 280,
        'city': 50
    };

    const errors: string[] = Object.keys(fieldToMaxLengthMap)
        .filter(field => newEvent[field] !== undefined )
        .filter(field => typeof newEvent[field] === 'string' && (newEvent[field] as string).length === 0)
        .map(field => `The ${field} cannot be empty.`);

    Object.entries(fieldToMaxLengthMap).forEach(([field, maxLength]) => {
        if(typeof newEvent[field] === 'string' && (newEvent[field] as string).length > maxLength) {
            errors.push(`The ${field} cannot be more than ${maxLength} characters.`);
        }
    });

    return errors;
};

const validateDates = (newEvent: NewEvent): string[] => {
    const errors = [];

    if(newEvent.startDate > newEvent.endDate) {
        errors.push('The end date must be later than the start date.');
    }

    return errors;
};