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

const TextFieldWrapper = styled.div`
    flex: 3;
    display: flex;
    justify-content: center;
    margin-right: 15px;
`;

const NumberFieldWrapper = styled.div`
    flex: 2;
    display: flex;
    justify-content: center;
    margin-right: 15px;
    text-align: center;
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

const ProductInMenuList = ({ currentItems, handleDeleteItem, 
                            handleSetPrice, handleSetPriceRelated, 
                            handleSetMaxBuy, handleSetMaxBuyRelated,
                            handleSetQuantity, handleSetQuantityRelated, 
                            isBaseMenu, search }) => {

    if (currentItems.length === 0) {
        return <ProductInMenuItem item={0} />
    }

    return (
        <>
            <ContainerWrapper>
                <Index>#</Index>
                <ImageWrapper>???nh</ImageWrapper>
                <TextWrapper isBaseMenu={isBaseMenu}>T??n s???n ph???m</TextWrapper>
                <TextFieldWrapper>Gi?? m???c ?????nh</TextFieldWrapper>
                {
                    isBaseMenu ?
                    null : <TextFieldWrapper>Gi?? thay ?????i</TextFieldWrapper>
                }
                <NumberFieldWrapper>S??? l?????ng</NumberFieldWrapper>
                <NumberFieldWrapper>M???c mua t???i ??a</NumberFieldWrapper>
                <Tooltip>
                    <StyledHelpIcon />
                    <TooltipText>
                        Gi?? thay ?????i s??? ???????c ??p d???ng khi b???ng gi?? ?????n hi???u l???c.
                        <br/>
                        *** Thay ?????i gi?? c???a s???n ph???m n???n s??? ??p d???ng ?????n to??n b??? t??y ch???n n???u c??.
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
                        handleSetMaxBuy={handleSetMaxBuy}
                        handleSetMaxBuyRelated={handleSetMaxBuyRelated}
                        handleSetQuantity={handleSetQuantity}
                        handleSetQuantityRelated={handleSetQuantityRelated}
                        isBaseMenu={isBaseMenu}
                        search={search}
                    />
                )
            })}
        </>
    );
}

export default ProductInMenuList;