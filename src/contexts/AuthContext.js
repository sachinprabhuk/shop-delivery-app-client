import React, { createContext, useState, useEffect } from "react";
import { app } from "../firebase";
import { CHECKING_AUTH_STATUS } from "../constants/constants";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(CHECKING_AUTH_STATUS);

    // Current usage: when the user creds are proper but he is not an admin.
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
        let firstAuthAttempt = true;
        app.auth().onAuthStateChanged(async (user) => {
            if (user) {
                const res = await user.getIdTokenResult();
                user.admin = res.claims.admin;
                if (user.admin === true) {
                    app.auth().signOut();
                    user = null;
                    // Reason: A customer was logged in before and now he visits admin page.
                    // if not for this, customer will see an error message upfront.
                    if (!firstAuthAttempt) {
                        setAuthError("Invalid username or password");
                    }
                }
            }
            setUser(user);
            firstAuthAttempt = false;
        });
    }, []);

    return (
        <AuthContext.Provider value={{ user, authError, setAuthError }}>
            {children}
        </AuthContext.Provider>
    );
};
