import React from 'react';
import styled from 'styled-components';
import { Close, HideImage } from '@mui/icons-material';

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

const TextFIeldWrapper = styled.div`
    flex: 3;
    display: flex;
    align-items: flex-end;
    margin-right: 15px;
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

const ProductInMenuItem = ({ item, index, handleDeleteItem, handleSetPrice, isBaseMenu }) =>  {

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
    
    if (item === 0) {
        return null;
    }

    return (
        <ContainerWrapper>
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
            </TextWrapper>

            <TextFIeldWrapper>
                <TextField
                    type="text" disabled={true}
                    value={item.Product.DefaultPrice.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                />
                <Currency>đ</Currency>
            </TextFIeldWrapper>

            {
                isBaseMenu ?
                null :
                <TextFIeldWrapper>
                    <TextField
                        type="text" 
                        value={item.Price} name='price'
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
    )
}

export default ProductInMenuItem;