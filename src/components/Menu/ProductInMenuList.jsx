import React from 'react';
import styled from 'styled-components';
import { Help } from '@mui/icons-material';
import ProductInMenuItem from './ProductInMenuItem';

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
`;

const Index = styled.span`
    width: 15px;
    margin-right: 10px;
`;

const TextWrapper = styled.div`
    flex: ${props => props.isBaseMenu ? "11" : "8"};
    width: 1px; //constraint width
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0px 20px;
`;

const ImageWrapper = styled.div`
    text-align: center;
    width: 40px;
`;

const TextFIeldWrapper = styled.div`
    flex: 3;
    display: flex;
    justify-content: center;
    margin-right: 15px;
`;

const StyledHelpIcon = styled(Help)`
    && {
        font-size: 18px;
        margin-right: 7px;
        color: ${props => props.theme.grey};
        opacity: 0.5;
        cursor: pointer;

        &:hover {
            opacity: 1.0;
        }
    }
`;

const TooltipText = styled.div`
    visibility: hidden;
    width: 255px;
    font-size: 13px;
    font-weight: 400;
    background-color: ${props => props.theme.dark};
    color: ${props => props.theme.white};
    padding: 6px 10px;
    border-radius: 6px;

    position: absolute;
    z-index: 1;
`;

const Tooltip = styled.div`
    position: relative;
    display: inline-block;

    &:hover ${TooltipText} {
        visibility: visible;
    }
`;

const ProductInMenuList = ({ currentItems, handleDeleteItem, handleSetPrice, handleSetPriceRelated, isBaseMenu, search }) => {

    if (currentItems.length === 0) {
        return <ProductInMenuItem item={0} />
    }

    return (
        <>
            <ContainerWrapper>
                <Index>#</Index>
                <ImageWrapper>Ảnh</ImageWrapper>
                <TextWrapper isBaseMenu={isBaseMenu}>Tên sản phẩm</TextWrapper>
                <TextFIeldWrapper>Giá mặc định</TextFIeldWrapper>
                {
                    isBaseMenu ?
                    null : <TextFIeldWrapper>Giá thay đổi</TextFIeldWrapper>
                }
                <Tooltip>
                    <StyledHelpIcon />
                    <TooltipText>
                        Giá thay đổi sẽ được áp dụng khi bảng giá đến hiệu lực.
                        <br/>
                        *** Thay đổi giá của sản phẩm nền sẽ áp dụng đến toàn bộ tùy chọn nếu có.
                    </TooltipText>
                </Tooltip>
            </ContainerWrapper>

            {currentItems && currentItems.map((item, index) => {    
                return (
                    <ProductInMenuItem
                        item={item} index={index + 1} key={index}
                        handleDeleteItem={handleDeleteItem}
                        handleSetPrice={handleSetPrice}
                        handleSetPriceRelated={handleSetPriceRelated}
                        isBaseMenu={isBaseMenu}
                        search={search}
                    />
                )
            })}
        </>
    );
}

export default ProductInMenuList;