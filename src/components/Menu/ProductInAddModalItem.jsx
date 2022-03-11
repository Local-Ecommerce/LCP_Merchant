import React from 'react';
import styled from 'styled-components';
import { FormControlLabel, Checkbox } from '@mui/material';

const ContainerWrapper = styled.div`
    font-size: 14px;
    padding: 12px 0px 12px 12px;
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
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const ProductInAddModalItem = ({ item, search, handleToggle }) =>  {
    
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

    const handleToggleChecked = () => {
        handleToggle(item.Product.ProductId, item.checked);
    }

    return (
        <ContainerWrapper>
            <FormControlLabel
                style={{ pointerEvents: "none" }}
                control={
                    <Checkbox
                        checked={item.checked}
                        onClick={handleToggleChecked}
                        style={{ pointerEvents: "auto" }}
                    />
                }
                label={<span></span>} 
            />

            <Image src={"../images/product1.png"} />

            <TextWrapper>
                <Name>
                    {item.Product.ProductName}                  
                </Name>
            </TextWrapper>

            <StatusWrapper>
                <Status active={activeCheck}>{activeLabel}</Status>
            </StatusWrapper>
        </ContainerWrapper>
    )
}

export default ProductInAddModalItem;