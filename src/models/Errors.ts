export type LoginError = AuthError;
export type SignupError = AuthError;

type AuthError = {
    message: string;
    shouldRender: boolean;
};