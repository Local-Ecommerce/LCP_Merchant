import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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

const Title = styled.h1`
    font-size: 32px;
    color: #383838;
    margin: 0px 0px 10px 0px;
`;

const GreenSpan = styled.span`
    color: ${props => props.theme};
`;

const SmallText = styled.span`
    color: rgba(23,31,35,.64);
`;

const BottomText = styled.a`
    margin: 15px;
    display: flex;
    justify-content: center;
    text-decoration: none;
    color: ${props => props.theme};
    font-size: 0.9em;
    cursor: pointer;
`;

const ErrorText = styled.div`
    margin: 10px 0px;
    padding: 20px;
    color: #762a36;
    background: #f8d7da;
    border-radius: 5px;
`;

const TextFieldWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 30px;
`;

const StyledButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 15px;
    cursor: pointer;
    background-color: ${props => props.theme};
    color: white;
    font-weight: 600;
    width: 100%;
    margin-top: 30px;

    &:active {
    box-shadow: 0 2px #666;
    transform: translateY(2px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const Login = () => {
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    const theme = "#17a2b8";
    const [input, setInput] = useState({
        username: '',
        password: ''
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault()
    
        try {
            setError('');
            setLoading(true);
            await login(input.username, input.password);
            navigate("/");
        } catch {
            setError("Đăng nhập thất bại. Vui lòng thử lại.");
        }
    
        setLoading(false);
    }

    return (
        <LoginFormContainer>
            <Title>Welcome to <GreenSpan theme={theme}>LCP</GreenSpan> </Title>
            <SmallText>Trang quản lí dành cho người bán của LCP</SmallText>

            {error !== '' ? <ErrorText>{error}</ErrorText> : null}
            
            <Form onSubmit={handleSubmit}>
                <TextFieldWrapper>
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

                <StyledButton theme={theme}>Đăng nhập</StyledButton>
                <BottomText theme={theme}>Quên mật khẩu?</BottomText>
            </Form>
        </LoginFormContainer>
    )
}

export default Login;