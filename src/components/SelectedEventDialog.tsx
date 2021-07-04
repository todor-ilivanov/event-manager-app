import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText, 
    DialogTitle
} from '@material-ui/core';
import { EventDTO } from '../models/Event';

type SelectedEventDialogProps = {
    open: boolean;
    selectedEvent: EventDTO | undefined;
    handleClose: () => void;
    setSelectedEvent: (event: EventDTO | undefined) => void;
};

const SelectedEventDialog = (props: SelectedEventDialogProps) => {

    const { selectedEvent, open, handleClose, setSelectedEvent } = props;

    const getDisplayDate = (selectedEvent: EventDTO) => {
        return selectedEvent.startDate === selectedEvent.endDate
            ? selectedEvent.startDate
            : `${selectedEvent.startDate} - ${selectedEvent.endDate}`
    }

    return (<>
        {
            selectedEvent &&
            <Dialog
                fullWidth
                maxWidth="xs"
                open={open}
                onClose={handleClose}
                onExited={() => setSelectedEvent(undefined)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{selectedEvent.headline}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {selectedEvent.description}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        {getDisplayDate(selectedEvent)}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        {selectedEvent.city}
                    </DialogContentText>
                </DialogContent>
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