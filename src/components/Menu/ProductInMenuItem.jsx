import React, { useState } from 'react';
import styled from 'styled-components';
import { Close } from '@mui/icons-material';

const ContainerWrapper = styled.div`
    font-size: 14px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dee2e6;
    text-decoration: none;
    cursor: pointer;
    background-color: #fff;

    &:hover {
    opacity: 0.9;
    background-color: #F5F5F5;
    }

    &:focus {
    outline: 0;
    }

    &:active {
    transform: translateY(1px);
    }
`;

const Index = styled.span`
    width: 15px;
    margin-right: 10px;
`;

const TextWrapper = styled.div`
    flex: 8;
    width: 1px; //constraint width
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Name = styled.span`    
    margin: 0px 20px;
`;

const StatusWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    margin: 0px 25px;
`;

const Status = styled.span`
    display: inline-block;
    padding: 4px 6px;
    font-size: 0.8em;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 20px;
    color: ${props => props.active === "inactive" ? "grey" : "#fff"};
    background-color: ${props => props.active === "active" ? "#28a745"
        :
        props.active === "unverified" ? "#FF8800"
            :
            props.active === "deleted" ? "#dc3545"
                :
                "#dc3545"};
`;

const Image = styled.img`
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const ButtonWrapper = styled.div`
    display: flex;
`;

const Button = styled.button`
    padding: 3px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: grey;

    &:focus {
    outline: none;
    }
`;

const StyledCloseIcon = styled(Close)`
    && {
        font-size: 22px;
        color: grey;
        opacity: 0.5;
    }

    &:hover {
    opacity: 1;
    }
`;

const TextFIeldWrapper = styled.div`
    flex: 3;
    display: flex;
    align-items: flex-end;
`;

const Currency = styled.span`
    font-size: 14px;
    padding: 5px;
    color: #999;
    border: 1px solid #ccc;
    border-radius: 0 3px 3px 0;
    background: rgba(0,0,0,0.01);
`;

const TextField = styled.input`
    width: 100%;
    padding: 5px;
    outline: none;
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.greyBorder};
    border-right: 0;
    border-radius: 3px 0 0 3px;
    font-size: 14px;
    background-color: ${props => props.theme.white};
`;

const ProductInMenuItem = ({ item, index, handleDeleteItem }) =>  {
    const [input, setInput] = useState({ price: '' });
    const [error, setError] = useState({ price: '' });

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    }
    
    let activeCheck = '';
    let activeLabel = '';
    switch (item.Status) {
        case 1001:
            activeCheck = 'active';
            activeLabel = 'Xác thực';
            break;
        case 1003:
            activeCheck = 'deleted';
            activeLabel = 'Từ chối';
            break;
        case 1004:
            activeCheck = 'unverified';
            activeLabel = 'Chờ duyệt';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS';
            break;
    }
    
    if (item === 0) {
        return null;
    }

    return (
        <ContainerWrapper>
            <Index>{index}.</Index>
            <Image src={item.Image} />

            <TextWrapper>
                <Name>
                    {item.ProductName}                  
                </Name>
            </TextWrapper>

            <TextFIeldWrapper>
                <TextField
                    type="text" 
                    value={input.price ? input.price : 0} name='price'
                    onChange={handleChange}
                    error={error.price !== ''}
                />
                <Currency>vnd</Currency>
            </TextFIeldWrapper>

            <StatusWrapper>
                <Status active={activeCheck}>{activeLabel}</Status>
            </StatusWrapper>

            <ButtonWrapper>
                <Button type="button" onClick={() => handleDeleteItem(item)}>
                    <StyledCloseIcon />
                </Button>
            </ButtonWrapper>
        </ContainerWrapper>
    )
}

export default ProductInMenuItem;