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
import { useAppContext } from '../AppContext';
import { SignupError } from '../models/Errors';
import '../styles/signup.css';

type InputEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

type SignupFormProps = {
    signupDialogOpen: boolean;
    handleDialogClose: () => void;
};

const SignupForm = (props: SignupFormProps) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [newUser, setNewUser] = useState();

    const { setIsAuthenticated } = useAppContext();
    const { signupDialogOpen, handleDialogClose } = props;

    const [signupLoading, setSignupLoading] = useState<boolean>(false);
    const [signupError, setSignupError] = useState<SignupError>({} as SignupError);

    const attemptSignup = async () => {
        setSignupLoading(true);
        setSignupError({} as SignupError);
        if(password !== confirmPassword) {
            setSignupError({
                message: 'Passwords must match.',
                shouldRender: true,
            } as SignupError);
            setSignupLoading(false);
            return;
        }
        try {
            const newUser = await Auth.signUp({
                username: email,
                password: password,
            });
            setSignupLoading(false);
            //@ts-ignore - wasn't able to import ISignUpResult
            setNewUser(newUser);
        } catch(error) {
            setSignupError({
                message: error.message,
                shouldRender: true,
            } as SignupError);
            setSignupLoading(false);
            console.error(error);
        }
    };

    const attemptVerification = async () => {
        setSignupLoading(true);
        try {
            await Auth.confirmSignUp(email, verificationCode);
            await Auth.signIn(email, password);
            setIsAuthenticated(true);
        } catch(error) {
            console.error(error);
            setSignupError({
                message: error.message,
                shouldRender: true,
            } as SignupError);
            setSignupLoading(false);
            setNewUser(undefined);
        }
    };

    const renderSignUpForm = () => {
        return (
            <>
                <DialogContent>
                    <div className="signup-input-field">
                        <TextField
                            fullWidth
                            className="outlined-basic"
                            label="E-mail"
                            variant="outlined"
                            inputProps={{ 'data-testid': 'signup-email-input' }}
                            onChange={(e: InputEvent) =>
                                setEmail(e.target.value)
                            }
                        />
                    </div>
                    <div className="signup-input-field">
                        <TextField
                            fullWidth
                            className="outlined-basic"
                            label="Password"
                            variant="outlined"
                            type="password"
                            inputProps={{ 'data-testid': 'signup-password-input' }}
                            onChange={(e: InputEvent) =>
                                setPassword(e.target.value)
                            }
                        />
                    </div>
                    <div className="signup-input-field">
                        <TextField
                            fullWidth
                            className="outlined-basic"
                            label="Confirm Password"
                            variant="outlined"
                            type="password"
                            inputProps={{ 'data-testid': 'signup-confirm-password-input' }}
                            onChange={(e: InputEvent) =>
                                setConfirmPassword(e.target.value)
                            }
                        />
                    </div>
                    <DialogContentText>
                        {
                            signupError.shouldRender ?
                                <Alert severity="error">
                                    {signupError.message}
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
                        onClick={attemptSignup}
                        data-testid="signup-dialog-button"
                        disabled={
                            email.length === 0 ||
                            password.length === 0 ||
                            confirmPassword.length === 0 ||
                            signupLoading
                        }
                    >
                        Sign Up
                    </Button>
                </DialogActions>
            </>
        );
    };

    const renderVerificationForm = () => {
        return (
            <>
                <DialogContent>
                    <div className="signup-input-field">
                        <TextField
                            fullWidth
                            className="outlined-basic"
                            label="Verification Code"
                            variant="outlined"
                            value={verificationCode}
                            inputProps={{ 'data-testid': 'signup-verification-input' }}
                            onChange={(e: InputEvent) =>
                                setVerificationCode(e.target.value)
                            }
                        />
                    </div>
                    <DialogContentText>
                        {
                            signupError.shouldRender ?
                                <Alert severity="error">
                                    {signupError.message}
                                </Alert> : <></>
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button fullWidth color="primary" onClick={attemptVerification}>
                        Verify
                    </Button>
                </DialogActions>
            </>
        );
    };

    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={signupDialogOpen}
            onClose={handleDialogClose}
            aria-labelledby="form-dialog-title"
            onKeyPress={
                (e) => {
                    if(e.key === 'Enter') {
                        newUser === undefined ? attemptSignup() : attemptVerification();
                    }
                }
            }
        >
            <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
            {newUser === undefined ? renderSignUpForm() : renderVerificationForm()}
            {signupLoading ? <LinearProgress /> : <></>}
        </Dialog>
    );
};

export default SignupForm;