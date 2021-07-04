import React, { useEffect, useState } from 'react';
import {
    Grid,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    LinearProgress,
    DialogContentText
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import '../styles/createNewEvent.css';
import { buildCreateEventRequest, CreateEventRequest } from '../models/ApiRequests';
import { useCreateNewEvent } from '../hooks/EventsApiHooks';
import { Alert } from '@material-ui/lab';
import { getBlankEvent, EventDTO } from '../models/Event';
import { stringToDate } from '../utils/dateUtils';

type CreateEventDialogProps = {
    open: boolean;
    handleDialogClose: () => void;
    setShouldFetchEvents: (val: boolean) => void;
};

const CreateEventDialog = (props: CreateEventDialogProps) => {

    const { open, handleDialogClose, setShouldFetchEvents } = props;

    const [newEvent, setNewEvent] = useState<EventDTO>(getBlankEvent());
    const [createEventRequest, setCreateEventRequest] = useState<CreateEventRequest>();
    const [inputValidationErrors, setInputValidationErrors] = useState<string[]>([]);

    const {
        data: createEventResponse,
        isLoading: isLoadingEventCreation,
        error: eventCreationError
    } = useCreateNewEvent(createEventRequest);

    useEffect(() => {
        if(createEventResponse) {
            setCreateEventRequest(undefined);
            setShouldFetchEvents(true);
            setNewEvent(getBlankEvent);
            handleDialogClose();
        }
    }, [createEventResponse, setShouldFetchEvents, handleDialogClose]);

    const getDateString = (date: Date | undefined | null): string => {
        if(!date) {
            throw new Error('Incorrect date format.');
        }
        return date.toLocaleDateString('gb-EN');
    };

    const createNewEvent = (newEvent: EventDTO) => {
        const validationErrors = validateInput(newEvent);
        if(validationErrors.length === 0) {
            const creationRequest = buildCreateEventRequest(newEvent);
            setCreateEventRequest(creationRequest);
        }
    }

    const validateInput = (newEvent: EventDTO): string[] => {
        const fieldsToValidate = ['headline', 'description', 'city'];
        const errors: string[] = fieldsToValidate
            .filter(field => newEvent[field] !== undefined && newEvent[field]!!.length === 0)
            .map(field => `The ${field} cannot be empty.`);
        
        const start: Date = stringToDate(newEvent.startDate);
        const end: Date = stringToDate(newEvent.endDate);

        if(start > end) {
            errors.push('The end date must be later than the start date.')
        }
        setInputValidationErrors(errors);
        return errors;
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Dialog
                open={open}
                fullWidth
                maxWidth="sm"
                onClose={handleDialogClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Create New Event</DialogTitle>
                <DialogContent>
                    <div className="new-event-input">
                        <TextField
                            fullWidth
                            className="outlined-basic"
                            label="Headline"
                            variant="outlined"
                            inputProps={{ 'data-testid': 'headline-input' }}
                            onChange={(e) => setNewEvent({ ...newEvent, headline: e.target.value })}
                        />
                    </div>
                    <div className="new-event-input">
                        <TextField
                            fullWidth
                            className="outlined-basic"
                            label="Description"
                            variant="outlined"
                            inputProps={{ 'data-testid': 'description-input' }}
                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        />
                    </div>
                    <div className="new-event-input">
                        <TextField
                            fullWidth
                            className="outlined-basic"
                            label="City"
                            variant="outlined"
                            inputProps={{ 'data-testid': 'city-input' }}
                            onChange={(e) => setNewEvent({ ...newEvent, city: e.target.value })}
                        />
                    </div>
                    <div className="new-event-input">
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="start-date-picker"
                                label="Start Date"
                                value={
                                    newEvent.startDate.length !== 0 ?
                                        stringToDate(newEvent.startDate)
                                        : new Date()
                                }
                                onChange={(e) => setNewEvent({ ...newEvent, startDate: getDateString(e) })}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="end-date-picker"
                                label="End Date"
                                value={
                                    newEvent.endDate.length !== 0 ?
                                        stringToDate(newEvent.endDate)
                                        : new Date()
                                }
                                onChange={(e) => setNewEvent({ ...newEvent, endDate: getDateString(e) })}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </div>
                    <DialogContentText>
                        {
                            eventCreationError ?
                                <Alert className="event-creation-error" severity="error">
                                    Error creating an event.
                                </Alert> : <></>
                        }
                        {
                            inputValidationErrors.length > 0 ?
                                inputValidationErrors.map(error =>
                                    <Alert className="event-creation-error" severity="error">
                                        {error}
                                    </Alert>
                                ) : <></>
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleDialogClose}>
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => createNewEvent(newEvent)}
                        data-testid="create-new-event-submit"
                    >
                        Create
                    </Button>
                </DialogActions>
                {isLoadingEventCreation ? <LinearProgress /> : <></>}
            </Dialog>
        </MuiPickersUtilsProvider>
    );
};

export default CreateEventDialog;