/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { api } from "../RequestMethod";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';
import ExtendSessionModal from './ExtendSessionModal';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    const [modal, setModal] = useState(false);
    let navigate = useNavigate();

    function toggleModal() {
        localStorage.setItem('IS_TOGGLE', "1");
        setModal(true); 
    }


    async function login(email, password) {
        await auth.signInWithEmailAndPassword(email, password);
        auth.onAuthStateChanged(async user => {
            if (user) {
                const firebaseToken = await user.getIdToken(true);
                console.log("Firebase Token: " + firebaseToken);
                let url = "accounts/login";

                await api.post(url, {
                    firebaseToken: firebaseToken,
                })
                .then(function (res) {
                    if (res.data.Data.RoleId === "R001" && res.data.Data.Residents[0].Type === "Merchant") {
                        localStorage.setItem('USER', JSON.stringify(res.data.Data));
                        localStorage.setItem('ACCESS_TOKEN', res.data.Data.RefreshTokens[0].AccessToken);
                        localStorage.setItem('REFRESH_TOKEN', res.data.Data.RefreshTokens[0].Token);
                        localStorage.setItem('EXPIRED_TIME', res.data.Data.RefreshTokens[0].AccessTokenExpiredDate);
                        localStorage.setItem('IS_TOGGLE', "0");
                        navigate("/");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            };
        });
    };

    async function logout() {
        await auth.signOut();
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
        setModal(false); 
    };
    
    async function handleExtendSession() {
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
                    localStorage.setItem('IS_TOGGLE', "0");
                    setModal(false);
                    navigate(0);
                }
            })
            .catch(function (error) {
                console.log(error);
                setModal(false);
                navigate(0);
            });
        }
        extendSession();
    }

    const value = {
        login,
        logout,
        toggleModal
    };

    return (
        <>
            <ExtendSessionModal 
                display={modal}
                handleExtendSession={handleExtendSession}
                logout={logout}
            />

            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}