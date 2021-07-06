export const stringToDate = (dateString: string): Date => {
    const dateParams: string[] = dateString.split('/');
    if(dateParams.length >= 3) {
        const date = new Date();
        date.setDate(parseInt(dateParams[0]));
        date.setMonth(parseInt(dateParams[1]) - 1);
        date.setFullYear(parseInt(dateParams[2]));
        return date;
    } else {
        throw new Error('Incorrect date format.');
    }
};

export const localizedDateToString = (date: Date): string => {
    return date.toLocaleDateString("gb-EN");
};