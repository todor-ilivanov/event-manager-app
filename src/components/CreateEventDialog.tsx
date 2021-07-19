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
import { buildCreateEventRequest, CreateEventRequest, getBlankEvent, NewEvent } from '../models/ApiRequests';
import { useCreateNewEvent } from '../hooks/EventsApiHooks';
import { Alert } from '@material-ui/lab';
import { validateNewEvent } from '../utils/validationUtils';

type CreateEventDialogProps = {
    open: boolean;
    handleDialogClose: () => void;
};

const CreateEventDialog = (props: CreateEventDialogProps) => {

    const { open, handleDialogClose } = props;

    const [newEvent, setNewEvent] = useState<NewEvent>(getBlankEvent());
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
            setNewEvent(getBlankEvent);
            handleDialogClose();
        }
    }, [createEventResponse, handleDialogClose]);

    const createNewEvent = (newEvent: NewEvent) => {
        const validationErrors = validateInput(newEvent);
        if(validationErrors.length === 0) {
            const creationRequest = buildCreateEventRequest(newEvent);
            setCreateEventRequest(creationRequest);
        }
    };

    const validateInput = (newEvent: NewEvent): string[] => {
        const errors = validateNewEvent(newEvent);
        setInputValidationErrors(errors);
        return errors;
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
                            createNewEvent(newEvent);
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
                                value={newEvent.startDate}
                                inputProps={{ 'data-testid': 'start-date-picker' }}
                                onChange={(e) => setNewEvent({ ...newEvent, startDate: e as Date})}
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
                                value={newEvent.endDate}
                                inputProps={{ 'data-testid': 'end-date-picker' }}
                                onChange={(e) => setNewEvent({ ...newEvent, endDate: e as Date})}
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