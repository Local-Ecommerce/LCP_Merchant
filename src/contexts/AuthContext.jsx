/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect, useRef } from "react";
import { api } from "../RequestMethod";
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';

import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    let navigate = useNavigate();
    const [change, setChange] = useState(false);
    const timer = useRef(null);

    useEffect(() => {
        const expiredTime = localStorage.getItem("EXPIRED_TIME");
        if (expiredTime && typeof expiredTime !== 'undefined' && expiredTime !== null && DateTime.fromISO(expiredTime).diffNow().toObject().milliseconds > 0) {
            timer.current = setTimeout(() => {
                extendSession();
            }, DateTime.fromISO(expiredTime).diffNow().toObject().milliseconds);
            
            return () => clearTimeout(timer.current);
        }
    }, [change]);

    async function logout() {
        await signOut(auth);
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        
        if (accessToken !== null) {
            await api.put("accounts/logout")
            .catch(function (error) {
                console.log(error);
            });
        };
        clearTimeout(timer.current);
        localStorage.removeItem("USER");
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        localStorage.removeItem("EXPIRED_TIME");
        navigate('/login');
    };

    async function extendSession() {
        let url = "accounts/refresh-token";
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        const refreshToken = localStorage.getItem("REFRESH_TOKEN");

        const extendSession = () => {
            api.post(url, {
                token: refreshToken,
                accessToken: accessToken
            })
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    localStorage.setItem('ACCESS_TOKEN', res.data.Data.AccessToken);
                    localStorage.setItem('EXPIRED_TIME', res.data.Data.AccessTokenExpiredDate);
                    setChange(!change);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        extendSession();
    }

    const value = {
        logout,
        timer,
        extendSession
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}