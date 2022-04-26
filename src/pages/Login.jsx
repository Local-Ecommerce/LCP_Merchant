import styled from "styled-components";
import React, { useState } from 'react';
import { api } from "../RequestMethod";
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { TextField, CircularProgress } from '@mui/material';

import { auth } from "../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const PageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
`;

const BackgroundImage = styled.img`
    width: 100%;
    height: auto;
    
    position: fixed;
    top: 0;
    left: 0;

    opacity: 0.3;
`;

const LoginFormContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: #fff;
    padding: 50px;
    width: 350px;
    border-radius: 5px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    opacity: 0.95;
`;

const Form = styled.form``;

const CenterWrapper = styled.div`
    margin: 30px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
`;

const Title = styled.h1`
    font-size: 32px;
    color: #383838;
    margin: 0px;
    text-align: center;
`;

const BlueSpan = styled.span`
    color: #3075BA;
    font-size: ${props => props.fontSize};
`;

const SmallText = styled.h4`
    color: rgba(23,31,35,.64);
    font-weight: 400;
    margin: 5px -10px 20px -10px;
    text-align: center;
    font-size: 14px;
`;

const ErrorText = styled.div`
    margin: 10px 0px;
    padding: 20px;
    color: #762a36;
    background: #f8d7da;
    border-radius: 5px;
`;

const SuccessText = styled.div`
    text-align: center;
    color: green;
`;

const BottomText = styled.a`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    text-decoration: none;
    color: #007bff;
    font-size: 0.9em;
    cursor: pointer;
`;

const TextFieldWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: ${props => props.mt ? "30px" : "20px"};
`;

const Button = styled.button`
    border-radius: 5px;
    border: none;
    padding: 15px;
    cursor: pointer;
    background-color: #17a2b8;
    color: white;
    font-weight: 600;
    width: 100%;
    margin-top: 30px;
    border-radius: 35px;

    &:active {
    box-shadow: 0 2px #666;
    transform: translateY(2px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const Login = () => {
    let navigate = useNavigate();
    const { timer, extendSession } = useAuth();

    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);
    const toggleForm = () => { 
        setToggle(!toggle); 
        setError(''); 
        setSuccess('')
    }

    const [input, setInput] = useState({ email: '', password: '', forgetEmail: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    function handleChange(e) {
        const { name, value } = e.target;
        setError('');
        setSuccess('');
        setInput(input => ({ ...input, [name]: value }));
    }

    function handleLogin(e) {
        e.preventDefault();

        if (validCheck()) {
            setError('');
            setSuccess('');
            setLoading(true);
            signInWithEmailAndPassword(auth, input.email, input.password)
            .then((userCredential) => {
                const firebaseToken = userCredential._tokenResponse.idToken;
                console.log("Firebase Token: " + firebaseToken);

                api.post("accounts/login", {
                    firebaseToken: firebaseToken,
                    role: ""
                })
                .then(function (res) {
                    if (res.data.Data.RoleId === "R001" && res.data.Data.Residents[0].Type === "Merchant") {
                        localStorage.setItem('USER', JSON.stringify(res.data.Data));
                        localStorage.setItem('ACCESS_TOKEN', res.data.Data.RefreshTokens[0].AccessToken);
                        localStorage.setItem('REFRESH_TOKEN', res.data.Data.RefreshTokens[0].Token);
                        localStorage.setItem('EXPIRED_TIME', res.data.Data.RefreshTokens[0].AccessTokenExpiredDate);
                        timer.current = setTimeout(() => {
                            extendSession();
                        }, DateTime.fromISO(res.data.Data.RefreshTokens[0].AccessTokenExpiredDate).diffNow().toObject().milliseconds);
                        navigate("/");
                    } else {
                        setError("Tài khoản hoặc mật khẩu không hợp lệ. Vui lòng thử lại.");
                        setLoading(false);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    setError("Tài khoản hoặc mật khẩu không hợp lệ. Vui lòng thử lại.");
                    setLoading(false);
                });
            })
            .catch((error) => {
                console.log(error);
                setError("Tài khoản hoặc mật khẩu không hợp lệ. Vui lòng thử lại.");
                setLoading(false);
            })
        }
    }

    function handleForgetPassword(e) {
        e.preventDefault();

        if (validCheck()) {
            setError('');
            sendPasswordResetEmail(auth, input.forgetEmail)
            .then(() => {
                setSuccess('Gửi thành công. Vui lòng kiểm tra email.');
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    const validCheck = () => {
        let check = false;
        setError('');

        let pattern= /[^@\s]+@[^@\s]+\.[^@\s]+/;
        
        if (toggle === false) { //login
            if (input.email.trim() === null || input.email.trim() === '' || !pattern.test(input.email.trim())) {
                setError('Vui lòng nhập đúng chuẩn email');
                check = true;
            }
        } else {
            if (input.forgetEmail.trim() === null || input.forgetEmail.trim() === '' || !pattern.test(input.forgetEmail.trim())) {
                setError('Vui lòng nhập đúng chuẩn email');
                check = true;
            }
        }

        if (check === true) {
            return false;
        }

        return true;
    }

    return (
        <PageWrapper>
            <BackgroundImage src="images/background.png"></BackgroundImage>

            <LoginFormContainer>
                {
                    !toggle ?
                    <>
                        <Title>Welcome to <BlueSpan fontSize="40px">LCP</BlueSpan> </Title>
                        <SmallText>Trang quản lí dành cho <b>Người bán hàng</b></SmallText>

                        {error !== '' ? <ErrorText>{error}</ErrorText> : null}
                        {success !== '' ? <ErrorText>{success}</ErrorText> : null}

                        <Form onSubmit={handleLogin}>
                            {
                            loading ?
                            <CenterWrapper>
                                <CircularProgress /> 
                            </CenterWrapper>
                            :
                            <>
                                <TextFieldWrapper mt>
                                    <TextField
                                        fullWidth
                                        value={input.email ? input.email : ''} name="email"
                                        onChange={handleChange}
                                        label="Email"
                                    />
                                </TextFieldWrapper>

                                <TextFieldWrapper>
                                    <TextField
                                        fullWidth
                                        value={input.password ? input.password : ''} name="password"
                                        type="password"
                                        onChange={handleChange}
                                        label="Mật khẩu" 
                                    />
                                </TextFieldWrapper>

                                <Button>Đăng nhập</Button>
                                <BottomText onClick={toggleForm}>Quên mật khẩu?</BottomText>
                            </>
                            }
                        </Form>
                    </>

                    :
                    
                    <>
                        <Title><BlueSpan fontSize="28px">Quên mật khẩu?</BlueSpan></Title>
                        <SmallText>Nhập địa chỉ email đã đăng kí cho tài khoản của bạn</SmallText>

                        {error !== '' ? <ErrorText>{error}</ErrorText> : null}
                        {success !== '' ? <SuccessText>{success}</SuccessText> : null}

                        <Form onSubmit={handleForgetPassword}>
                            {
                            loading ?
                            <CenterWrapper>
                                <CircularProgress /> 
                            </CenterWrapper>
                            :
                            <>
                                <TextFieldWrapper mt>
                                    <TextField
                                        fullWidth
                                        value={input.forgetEmail ? input.forgetEmail : ''} name="forgetEmail"
                                        onChange={handleChange}
                                        label="Email"
                                    />
                                </TextFieldWrapper>

                                <Button>Gửi</Button>
                                <BottomText onClick={toggleForm}>Trở về đăng nhập</BottomText>
                            </>
                            }
                        </Form>
                    </>
                }
            </LoginFormContainer>
        </PageWrapper>
    )
}

export default Login;