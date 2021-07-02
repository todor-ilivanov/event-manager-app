import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress,
    TextField,
    Typography,
} from '@material-ui/core';
import './styles/login.css';
import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { useAppContext } from './AppContext';

type InputEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

type LoginError = {
    message: string;
    shouldRender: boolean;
};

const Login = () => {
    const [loginDialogOpen, setLoginDialogOpenOpen] = useState<boolean>(false);
    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<LoginError>({} as LoginError);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { setIsAuthenticated } = useAppContext();

    const attemptLogin = async () => {
        setLoginLoading(true);
        setLoginError({} as LoginError);

        try {
            await Auth.signIn(email, password);
            setIsAuthenticated(true);
            setLoginLoading(false);
            console.log('Login successful.');
        } catch(error) {
            console.error(error.message);
            setLoginError({
                message: error.message,
                shouldRender: true,
            } as LoginError);
            setLoginLoading(false);
        }
    };

    const handleDialogOpen = () => {
        setLoginDialogOpenOpen(true);
    };

    const handleDialogClose = () => {
        setLoginDialogOpenOpen(false);
    };

    return (
        <>
            TODO Refactor
            <Typography component="div">
                <Box textAlign="center" m={1}>
                    Welcome to the Event Manager App!
                </Box>
                <Box textAlign="center" m={1}>
                    Create and manage events with ease.
                </Box>
                <Box textAlign="center" m={1}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDialogOpen}
                    >
                        Log In
                    </Button>
                </Box>
            </Typography>

            <Dialog
                open={loginDialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Log In</DialogTitle>
                <DialogContent>
                    <div className="login-input-field">
                        <TextField
                            id="outlined-basic"
                            label="E-mail"
                            variant="outlined"
                            inputProps={{ 'data-testid': 'login-email-input' }}
                            onChange={(e: InputEvent) =>
                                setEmail(e.target.value)
                            }
                        />
                    </div>
                    <div className="login-input-field">
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            type="password"
                            inputProps={{ 'data-testid': 'login-password-input' }}
                            onChange={(e: InputEvent) =>
                                setPassword(e.target.value)
                            }
                        />
                    </div>
                    <DialogContentText>
                        {
                            loginError.shouldRender ?
                                <div className={'login-error'}>
                                    {loginError.message}
                                </div> : <></>
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleDialogClose}>
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={attemptLogin}
                        data-testid="login-dialog-button"
                        disabled={
                            email.length === 0 ||
                            password.length === 0 ||
                            loginLoading
                        }
                    >
                        Log In
                    </Button>
                </DialogActions>
                {loginLoading ? <LinearProgress /> : <></>}
            </Dialog>
        </>
    );
};

export default Login;
