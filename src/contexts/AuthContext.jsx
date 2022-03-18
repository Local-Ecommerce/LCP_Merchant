/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { api } from "../RequestMethod";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import { toast } from 'react-toastify';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    let navigate = useNavigate();
    const [socket, setSocket] = useState(null);
    
    useEffect(() => {
        setSocket(io("1.52.23.214:5002", {
            transports: ['websocket'],
        }));
        
        const user = JSON.parse(localStorage.getItem('USER'));
        if (user) {
            socket?.emit("newAccount", user.AccountId);
        }
    }, []);

    useEffect(() => {
		if (socket) {
            socket.on("getNotification", (data) => {
                toast.success(data.product + ' của bạn đã được duyệt!', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false
                });
            });
        }
	}, [socket]);

    useEffect(() => {
        if (socket) {
            const user = JSON.parse(localStorage.getItem('USER'));
            if (user) {
                socket?.emit("newAccount", user.AccountId);
            }
        }
    }, [socket])
    
    async function login(email, password) {
        await auth.signInWithEmailAndPassword(email, password);
        auth.onAuthStateChanged(async user => {
            if (user) {
                const firebaseToken = await user.getIdToken(true);
                console.log("Firebase Token: " + firebaseToken);
                
                await api.post("accounts/login", {
                    firebaseToken: firebaseToken,
                    role: "Merchant"
                })
                .then(function (res) {
                    if (res.data.Data.RoleId === "R001" && res.data.Data.Residents[0].Type === "Merchant") {
                        socket?.emit("newAccount", res.data.Data.AccountId);
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
                    navigate(0);
                }
            })
            .catch(function (error) {
                console.log(error);
                navigate(0);
            });
        }
        extendSession();
    }

    const value = {
        socket,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}