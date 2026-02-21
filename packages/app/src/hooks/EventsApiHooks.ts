import { API } from 'aws-amplify';
import { useQuery } from 'react-query';
import { CreateEventRequest } from '../models/ApiRequests';

export const useEvents = (enabled: boolean) => {
    return useQuery(['getEvents'],
        () => API.get('events', '/events', {}),
        { enabled: enabled }
    );
};

export const useCreateNewEvent = (eventRequest: CreateEventRequest | undefined) => {
    return useQuery(['createNewEvent', eventRequest],
        () => API.post('events', '/create', { body: eventRequest }),
        { enabled: eventRequest !== undefined }
    );
};

export const useWeather = (city: string | undefined) => {
    return useQuery([city, 'getWeather'],
        () => API.get('events', '/weather', { queryStringParameters: { city: city } }),
        { enabled: city !== undefined }
    );
};
