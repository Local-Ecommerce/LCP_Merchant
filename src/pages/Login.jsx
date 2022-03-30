import styled from "styled-components";
import React, { useState } from 'react';
import { api } from "../RequestMethod";
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

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
    font-size: 40px;
`;

const SmallText = styled.h4`
    color: rgba(23,31,35,.64);
    font-weight: 400;
    margin: 5px 0px 20px 0px;
    text-align: center;
`;

const ErrorText = styled.div`
    margin: 10px 0px;
    padding: 20px;
    color: #762a36;
    background: #f8d7da;
    border-radius: 5px;
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
    margin-top: ${props => props.mt ? "30px" : "10px"};
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

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [input, setInput] = useState({
        username: '',
        password: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    }

    function handleLogin(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        signInWithEmailAndPassword(auth, input.username, input.password)
        .then((userCredential) => {
            const firebaseToken = userCredential._tokenResponse.idToken;
            console.log("Firebase Token: " + firebaseToken);

            api.post("accounts/login", {
                firebaseToken: firebaseToken,
                role: "Merchant"
            })
            .then(function (res) {
                if (res.data.Data.RoleId === "R001" && res.data.Data.Residents[0].Type === "Merchant") {
                    localStorage.setItem('USER', JSON.stringify(res.data.Data));
                    localStorage.setItem('ACCESS_TOKEN', res.data.Data.RefreshTokens[0].AccessToken);
                    localStorage.setItem('REFRESH_TOKEN', res.data.Data.RefreshTokens[0].Token);
                    localStorage.setItem('EXPIRED_TIME', res.data.Data.RefreshTokens[0].AccessTokenExpiredDate);
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

    return (
        <LoginFormContainer>
            <Title>Welcome to <BlueSpan>LCP</BlueSpan> </Title>
            <SmallText>Trang quản lí dành cho Người bán hàng</SmallText>

            {error !== '' ? <ErrorText>{error}</ErrorText> : null}

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
                            value={input.username ? input.username : ''} name="username"
                            onChange={handleChange}
                            label="Tài khoản"
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
                    <BottomText>Quên mật khẩu?</BottomText>
                </>
                }
            </Form>
        </LoginFormContainer>
    )
}

export default Login;