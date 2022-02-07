import React from 'react';
import styled from 'styled-components';
import { Close } from '@mui/icons-material';

const ContainerWrapper = styled.div`
    font-size: 14px;
    padding: 10px 20px;
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
    width: 25px;
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
    flex: 2;
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
    width: 50px;
    height: 50px;
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

const ProductItem = ({ item, index, handleGetDeleteItem }) =>  {
    let activeCheck = '';
    let activeLabel = '';
    switch (item.Status) {
        case 1004:
            activeCheck = 'deleted';
            activeLabel = 'Deleted';
            break;
        case 1005:
            activeCheck = 'active';
            activeLabel = 'Active';
            break;
        case 1006:
            activeCheck = 'rejected';
            activeLabel = 'Rejected';
            break;
        case 1007:
            activeCheck = 'unverified';
            activeLabel = 'Unverified';
            break;
        case 1008:
            activeCheck = 'unverified';
            activeLabel = 'Unverified';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS NUMBER';
            break;
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

            <StatusWrapper>
                <Status active={activeCheck}>{activeLabel}</Status>
            </StatusWrapper>

            <ButtonWrapper>
                <Button>
                    <StyledCloseIcon />
                </Button>
            </ButtonWrapper>
        </ContainerWrapper>
    )
}

export default ProductItem;