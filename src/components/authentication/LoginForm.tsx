import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress,
    TextField
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { useAppContext } from '../../hooks/AppContext';
import { LoginError } from '../../models/Errors';
import '../../styles/login.css';

type InputEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

type LoginFormProps = {
    loginDialogOpen: boolean;
    handleDialogClose: () => void;
};

const LoginForm = (props: LoginFormProps) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { setIsAuthenticated } = useAppContext();
    const { loginDialogOpen, handleDialogClose } = props;

    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<LoginError>({} as LoginError);

    const attemptLogin = async () => {
        setLoginLoading(true);
        setLoginError({} as LoginError);
        try {
            await Auth.signIn(email, password);
            setIsAuthenticated(true);
            console.log('Login successful.');
        } catch(error) {
            setLoginError({
                message: error.message,
                shouldRender: true,
            } as LoginError);
            setLoginLoading(false);
            console.error(error);
        }
    };

    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={loginDialogOpen}
            onClose={handleDialogClose}
            aria-labelledby="form-dialog-title"
            onKeyPress={
                (e) => {
                    if(e.key === 'Enter')
                        attemptLogin();
                }
            }
        >
            <DialogTitle id="form-dialog-title">Log In</DialogTitle>
            <DialogContent>
                <div className="login-input-field">
                    <TextField
                        fullWidth
                        className="outlined-basic"
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
                        fullWidth
                        className="outlined-basic"
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
                            <Alert severity="error">
                                {loginError.message}
                            </Alert> : <></>
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
    );
};

export default LoginForm;