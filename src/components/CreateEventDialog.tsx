import React, { useEffect, useState } from 'react';
import {
    Grid,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    LinearProgress
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import '../styles/createNewEvent.css';
import { buildCreateEventRequest, CreateEventRequest } from '../models/ApiRequests';
import { useCreateNewEvent } from '../hooks/EventsApiHooks';
import { Alert } from '@material-ui/lab';
import { getBlankEvent, EventDTO } from '../models/Event';
import { DatesInput } from '../models/DateModels';
import { validateNewEvent } from '../utils/validationUtils';
import { localizedDateToString } from '../utils/dateUtils';

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
    const [datesInput, setDatesInput] = useState<DatesInput>({ startDate: new Date(), endDate: new Date() });

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

    const createNewEvent = (newEvent: EventDTO, datesInput: DatesInput) => {
        newEvent.startDate = localizedDateToString(datesInput.startDate);
        newEvent.endDate = localizedDateToString(datesInput.endDate);
        const validationErrors = validateInput(newEvent);
        if(validationErrors.length === 0) {
            const creationRequest = buildCreateEventRequest(newEvent);
            setCreateEventRequest(creationRequest);
        }
    };

    const validateInput = (newEvent: EventDTO): string[] => {
        const errors = validateNewEvent(newEvent);
        setInputValidationErrors(errors);
        return errors;
    };

    const handleDateChange = (date: Date | null, key: string) => {
        if(date !== null) {
            setDatesInput({...datesInput, [key]: date})
        }
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Dialog
                open={open}
                fullWidth
                maxWidth="sm"
                onClose={handleDialogClose}
                onKeyPress={
                    (e) => {
                        if(e.key === 'Enter')
                            createNewEvent(newEvent, datesInput);
                    }
                }
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
                                value={datesInput.startDate}
                                inputProps={{ 'data-testid': 'start-date-picker' }}
                                onChange={(e) => handleDateChange(e, 'startDate')}
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
                                value={datesInput.endDate}
                                inputProps={{ 'data-testid': 'end-date-picker' }}
                                onChange={(e) => handleDateChange(e, 'endDate')}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </div>
                    <DialogContent>
                        {
                            eventCreationError ?
                                <Alert className="event-creation-error" severity="error">
                                    Error creating an event.
                                </Alert> : <></>
                        }
                        {
                            inputValidationErrors.length > 0 ?
                                inputValidationErrors.map((error, index) =>
                                    <Alert className="event-creation-error" key={index} severity="error">
                                        {error}
                                    </Alert>
                                ) : <></>
                        }
                    </DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleDialogClose}>
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => createNewEvent(newEvent, datesInput)}
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