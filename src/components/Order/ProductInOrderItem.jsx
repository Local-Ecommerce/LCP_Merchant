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
    margin: 0px 15px;
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

const Text = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const Option = styled.div`
    font-size: 13px;
    color: ${props => props.theme.grey};
`;

const ProductInOrderItem = ({ item }) =>  {

    if (item === 0) {
        return null;
    }

    let option = 
          (item.Product.Color ? item.Product.Color : '')
        + (item.Product.Color && (item.Product.Size || item.Product.Weight) ? " / " : '')
        + (item.Product.Size ? item.Product.Size : '')
        + (item.Product.Size && item.Product.Weight ? " / " : '')
        + (item.Product.Weight ? item.Product.Weight + "kg " : '');

    return (
        <ContainerWrapper>
            {
                item.Product.BaseProduct !== null ?
                <Image src={item.Product.BaseProduct.Image} />
                : item.Product.BaseProduct === null ?
                <Image src={item.Product.Image} />
                : <StyledNoImageIcon />
            }

            <Flex2Wrapper>
                {
                    item.Product.BaseProduct !== null ?
                    <Text>{item.Product.BaseProduct.ProductName}</Text>
                    : <Text>{item.Product.ProductName}</Text>
                }
                <Option>{option}</Option>
            </Flex2Wrapper>
            <Flex1Wrapper>{item.Quantity}</Flex1Wrapper>
            <Flex1Wrapper>{item.UnitPrice.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</Flex1Wrapper>
            <Flex1Wrapper>{item.FinalAmount.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</Flex1Wrapper>
        </ContainerWrapper>
    )
}

export default ProductInOrderItem;