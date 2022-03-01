import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from '@mui/icons-material';

const PageWrapper = styled.div`
    width: 720px;
    margin: 40px auto;
`;

const Row = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`;

const ContainerWrapper = styled.div`
    margin-bottom: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: #fff;
    border-radius: 5px;
`;

const HeaderWrapper = styled.div`
    padding: 20px;
    border-bottom: 1px solid #D8D8D8;
`;

const Header = styled.div`
    font-weight: 600;
`;

const StyledHyperlink = styled.a`
    font-size: 14px;
    color: #007bff;
    cursor: pointer;
`;

const ContentWrapper = styled.div`
    padding: 20px;
`;

const FooterWrapper = styled.div`
    border-top: 1px solid #d6d6d6;
    padding-top: 20px;
    height: 100px;
`;

const FloatRight = styled.div`
    float: right;
`;

const Button = styled.button`
    border-radius: 5px;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    background-color: #17a2b8;
    color: white;
    font-weight: 600;

    &:active {
    transform: translateY(1px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const FieldLabel = styled.div`
    font-weight: 400;
    font-size: 14px;
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: 10px;
`;

const TextField = styled.input`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 5px;
    padding: 10px 14px;
    outline: none;
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.greyBorder};
    border-radius: 3px;
    font-size: 14px;
`;

const HelperText = styled.span`
    color: ${props => props.theme.grey};
    font-size: 13px;
    padding: 5px;
    color: ${props => props.theme.red};
`;

const Detail = () => {
    let navigate = useNavigate();

    const [input, setInput] = useState({ name: '' });
    const [error, setError] = useState({ nameError: '' });

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    }

    return (
        <PageWrapper>            
            <form id="form">
                <ContainerWrapper>
                    <HeaderWrapper>
                        <Row>
                            <Header>Thông tin cơ bản</Header>
                            <StyledHyperlink>Sửa</StyledHyperlink>
                        </Row>
                    </HeaderWrapper>

                    <ContentWrapper>
                        <FieldLabel>Tên cửa hàng</FieldLabel>
                        <TextField
                            type="text" value={input.name ? input.name : ''} name='name'
                            onChange={handleChange}
                            error={error.nameError !== ''}
                         />
                         <HelperText>{error.nameError}</HelperText>
                    </ContentWrapper>
                </ContainerWrapper>

                <FooterWrapper>
                    <FloatRight>
                        <Button>Lưu</Button>
                    </FloatRight>
                </FooterWrapper>
            </form>
        </PageWrapper>
    )
}

export default Detail;