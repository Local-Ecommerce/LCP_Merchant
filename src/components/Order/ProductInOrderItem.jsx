import React from 'react';
import styled from 'styled-components';
import { HideImage } from '@mui/icons-material';

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

const Flex2Wrapper = styled.div`
    flex: 2;
    width: 1px; //constraint width
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0px 20px;
`;

const Flex1Wrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`;

const Image = styled.img`
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 3px;
`;

const StyledNoImageIcon = styled(HideImage)`
    && {
        color: ${props => props.theme.grey};
        font-size: 30px;
        padding: 5px;
        border-radius: 3px;
        border: 1px solid rgba(0,0,0,0.2);
    }
`;

const ProductInOrderItem = ({ item }) =>  {

    if (item === 0) {
        return null;
    }

    return (
        <ContainerWrapper>
            {
                item.Image ?
                <Image src={item.Image ? item.Image.split("|")[0] : ''} />
                : <StyledNoImageIcon />
            }

            <Flex2Wrapper>{item.ProductName}</Flex2Wrapper>
            <Flex1Wrapper>{item.Quantity}</Flex1Wrapper>
            <Flex1Wrapper>{item.UnitPrice.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</Flex1Wrapper>
            <Flex1Wrapper>{item.FinalAmount.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</Flex1Wrapper>
        </ContainerWrapper>
    )
}

export default ProductInOrderItem;