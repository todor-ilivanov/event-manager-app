import React, { useEffect, useState } from 'react';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid
} from '@material-ui/core';
import { EventDTO } from '../models/Event';
import { useWeather } from '../hooks/EventsApiHooks';
import { WeatherResponse } from '../models/WeatherResponse';
import WeatherInfo from './WeatherInfo';
import '../styles/selectedEvent.css';
import { Alert } from '@material-ui/lab';

type SelectedEventDialogProps = {
    open: boolean;
    selectedEvent: EventDTO | undefined;
    handleClose: () => void;
    setSelectedEvent: (event: EventDTO | undefined) => void;
};

const SelectedEventDialog = (props: SelectedEventDialogProps) => {

    const { selectedEvent, open, handleClose, setSelectedEvent } = props;

    const {
        data: weatherResponse,
        isLoading: weatherLoading,
        error: weatherError
    } = useWeather(selectedEvent?.city);

    const [weather, setWeather] = useState<WeatherResponse>();

    useEffect(() => {
        if(weatherResponse) {
            setWeather(weatherResponse);
        }
    }, [weatherResponse]);

    const getDisplayDate = (selectedEvent: EventDTO) => {
        return selectedEvent.startDate === selectedEvent.endDate
            ? selectedEvent.startDate
            : `${selectedEvent.startDate} - ${selectedEvent.endDate}`;
    };

    return (<>
        {
            selectedEvent &&
            <Dialog
                fullWidth
                maxWidth="xs"
                open={open}
                onClose={handleClose}
                onExited={() => setSelectedEvent(undefined)}
            >
                <Grid container justify="space-between">
                    <Grid item>
                        <DialogTitle>{selectedEvent.headline}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {selectedEvent.description}
                            </DialogContentText>

                            <DialogContentText>
                                {getDisplayDate(selectedEvent)}
                            </DialogContentText>
                            <DialogContentText>
                                {selectedEvent.city}
                            </DialogContentText>

                        </DialogContent>
                    </Grid>
                    <Grid item className="weather-grid-item">
                        {
                            !weatherLoading ?
                                <div className="weather-info">
                                    {
                                        (weather && !weather.error) ?
                                            <WeatherInfo weather={weather} />
                                            : <></>
                                    }
                                </div> : <CircularProgress />
                        }
                        {
                            (weatherError || weather?.error) && !weatherLoading ?
                                <Alert severity="error">
                                    Error getting weather data for {selectedEvent.city}.
                                </Alert> : <></>
                        }
                    </Grid>
                </Grid>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Hide
                    </Button>
                </DialogActions>
            </Dialog>
        }
    </>
    );
};

export default SelectedEventDialog;