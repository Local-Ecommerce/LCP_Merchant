/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { api } from "../RequestMethod";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    let navigate = useNavigate();

    async function logout() {
        await signOut(auth);
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        
        if (accessToken !== null) {
            await api.put("accounts/logout")
            .catch(function (error) {
                console.log(error);
            });
        };

        localStorage.removeItem("USER");
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        localStorage.removeItem("EXPIRED_TIME");
        localStorage.removeItem("IS_TOGGLE");
        navigate('/login');
    };

    const value = {
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}