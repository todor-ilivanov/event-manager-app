import React from 'react';
import SignIn from './SignIn';

const App = () => {
    const authenticated: boolean = false;

    return authenticated ? <div>Hello User</div> : <SignIn />;
};

export default App;
