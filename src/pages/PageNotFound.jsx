import React from 'react';
import styled from "styled-components";
import { NavLink as Link } from 'react-router-dom';

const PageWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 50px;
    width: 350px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;

const Title = styled.h1`
    font-size: 100px;
    color: #383838;
    margin: 20px;
`;

const StyledLink = styled(Link)`
    color: #3075BA;
    margin: 10px;
`;

const SmallText = styled.span`
    color: rgba(23,31,35,.64);
`;

const PageNotFound = () => {

    return (
        <PageWrapper>
            <Title>404</Title>
            <SmallText> Trang bạn yêu cầu không được tìm thấy.</SmallText>
            <StyledLink to="/"> Trở về trang chủ </StyledLink>
        </PageWrapper>
    )
}

export default PageNotFound;