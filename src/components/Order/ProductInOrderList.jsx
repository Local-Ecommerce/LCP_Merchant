import React from 'react';
import styled from 'styled-components';
import ProductInOrderItem from './ProductInOrderItem';

const ContainerWrapper = styled.div`
    font-size: 14px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dee2e6;
    text-decoration: none;
    background-color: #fff;
    font-weight: 600;
    height: 25px;
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

const ImageWrapper = styled.div`
    width: 43px;
    text-align: center;
`;

const ProductInOrderList = ({ currentItems }) => {

    if (currentItems.length === 0) {
        return <ProductInOrderItem item={0} />
    }

    return (
        <>
            <ContainerWrapper>
                <ImageWrapper>Ảnh</ImageWrapper>
                <Flex2Wrapper>Tên sản phẩm</Flex2Wrapper>
                <Flex1Wrapper>Số lượng</Flex1Wrapper>
                <Flex1Wrapper>Giá</Flex1Wrapper>
                <Flex1Wrapper>Tổng</Flex1Wrapper>
            </ContainerWrapper>

            {currentItems && currentItems.map((item, index) => {
                return (
                    <ProductInOrderItem
                        item={item} key={index}
                    />
                )
            })}
        </>
    );
}

export default ProductInOrderList;