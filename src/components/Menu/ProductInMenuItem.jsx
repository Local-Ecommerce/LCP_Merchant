import React, { useState } from 'react';
import styled from 'styled-components';
import { Close, HideImage, ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

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
    flex: ${props => props.isBaseMenu ? "11" : "8"};
    width: 1px; //constraint width
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0px 20px;
    display: flex;
    align-items: center;
`;

const TooltipText = styled.div`
    visibility: hidden;
    width: 70px;
    font-size: 13px;
    font-weight: 400;
    background-color: ${props => props.theme.dark};
    color: ${props => props.theme.white};
    padding: 6px;
    border-radius: 6px;
    text-align: center;

    position: absolute;
    z-index: 1;
`;

const Status = styled.span`
    position: absolute;
    top: -3px;
    right: -3px;

    padding: 5px;
    font-size: 10px;
    font-weight: 700;
    border-radius: 50%;
    color: #fff;
    background-color: ${props => props.active === "active" ? "#28a745"
    :
    props.active === "unverified" ? "#FF8800"
    :
    props.active === "deleted" ? "#dc3545"
    :
    "#dc3545"};

    &:hover ${TooltipText} {
        visibility: visible;
    }
`;

const ImageWrapper = styled.div`
    position: relative;
    opacity: ${props => props.disabled ? "0" : null};
`;

const Image = styled.img`
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 3px;
    border: 1px solid rgba(0,0,0,0.2);
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

const StyledDisabledCloseIcon = styled(Close)`
    && {
        font-size: 22px;
        opacity: 0;
    }
`;

const TextFIeldWrapper = styled.div`
    flex: 3;
    display: flex;
    justify-content: center;
    margin-right: 15px;
    opacity: ${props => props.disabled ? "0" : null};
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
    color: ${props => props.grey ? "#BEBEBE" : props.theme.black};
`;

const StyledDropdownIcon = styled(ArrowDropDown)`
    && {
        margin-left: 5px;
        font-size: 20px;
    }
`;

const StyledDropupIcon = styled(ArrowDropUp)`
    && {
        margin-left: 5px;
        font-size: 20px;
    }
`;

const ProductInMenuItem = ({ item, index, handleDeleteItem, handleSetPrice, handleSetPriceRelated, isBaseMenu, search }) =>  {
    const [dropdown, setDropdown] = useState(false);
    const toggleDropdown = () => { setDropdown(!dropdown) };

    if (item === 0) {
        return null;
    }

    if (!item.Product.ProductName.includes(search)) {
        return null;
    }

    let activeCheck = '';
    let activeLabel = '';
    switch (item.Product.Status) {
        case 1001:
            activeCheck = 'active';
            activeLabel = 'Hoạt động';
            break;
        case 1003:
            activeCheck = 'deleted';
            activeLabel = 'Bị từ chối';
            break;
        case 1004:
            activeCheck = 'unverified';
            activeLabel = 'Chờ duyệt'
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS'
            break;
    }

    function inputStopPropagation(e) {
        e.stopPropagation();
    }

    let relatedPrices = item.RelatedProductInMenu.map((item) => (item.Price.replace(/\D/g, "")));

    return (
        <>
            <ContainerWrapper onClick={toggleDropdown}>
                <Index>{index}.</Index>

                <ImageWrapper>
                        {
                            item.Product.Image ?
                            <Image src={item.Product.Image ? item.Product.Image.split("|")[0] : ''} />
                            : <StyledNoImageIcon />
                        }
                        
                        {
                            activeCheck === 'active' ?
                            null :
                            <Status active={activeCheck}>
                                <TooltipText>{activeLabel}</TooltipText>
                            </Status>
                        }
                </ImageWrapper>

                <TextWrapper isBaseMenu={isBaseMenu}>
                    {item.Product.ProductName}
                    {
                        item.RelatedProductInMenu.length && !dropdown ?
                        <StyledDropdownIcon />
                        : item.RelatedProductInMenu.length && dropdown ?
                        <StyledDropupIcon />
                        : null
                    }
                </TextWrapper>

                <TextFIeldWrapper>
                    {item.Product.DefaultPrice.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ
                </TextFIeldWrapper>

                {
                    isBaseMenu ?
                    null :
                    <TextFIeldWrapper>
                        <TextField
                            type="text" grey={
                                relatedPrices.length > 0 
                                && (parseInt(item.Price.replace(/\D/g, "")) !== Math.min(...relatedPrices) 
                                || parseInt(item.Price.replace(/\D/g, "")) !== Math.max(...relatedPrices)) ?
                                true : false
                            }
                            value={item.Price} name='price'
                            onClick={inputStopPropagation}
                            onChange={(event) => handleSetPrice(item.Product.ProductId, event.target.value)}
                        />
                        <Currency>đ</Currency>
                    </TextFIeldWrapper>
                }

                <ButtonWrapper>
                    <Button type="button" onClick={() => handleDeleteItem(item.Product.ProductId)}>
                        <StyledCloseIcon />
                    </Button>
                </ButtonWrapper>
            </ContainerWrapper>

            {
                item.RelatedProductInMenu && dropdown ?
                <>
                    {item.RelatedProductInMenu.map((related, index2) => {
                        return <ContainerWrapper key={index2}>
                            <Index></Index>
            
                            <ImageWrapper disabled>
                                <Image />
                            </ImageWrapper>
            
                            <TextWrapper isBaseMenu={isBaseMenu}>
                                {related.Product.Color ? related.Product.Color : ''}
                                {related.Product.Color && (related.Product.Size || related.Product.Weight) ? " / " : ''}
                                {related.Product.Size ? related.Product.Size : ''}
                                {related.Product.Size && related.Product.Weight ? " / " : ''}
                                {related.Product.Weight ? related.Product.Weight + "kg " : ''}
                            </TextWrapper>

                            <TextFIeldWrapper disabled>
                                {item.Product.DefaultPrice.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ
                            </TextFIeldWrapper>

                            {
                                isBaseMenu ?
                                null :
                                <TextFIeldWrapper>
                                    <TextField
                                        type="text"
                                        value={related.Price} name='price'
                                        onClick={inputStopPropagation}
                                        onChange={(event) => handleSetPriceRelated(
                                            item.Product.ProductId, 
                                            related.Product.ProductId, 
                                            event.target.value
                                        )}
                                    />
                                    <Currency>đ</Currency>
                                </TextFIeldWrapper>
                            }

                            <ButtonWrapper>
                                <Button type="button">
                                    <StyledDisabledCloseIcon />
                                </Button>
                            </ButtonWrapper>
                        </ContainerWrapper>
                    })}
                </>
                : null
            }
        </>
    )
}

export default ProductInMenuItem;