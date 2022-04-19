import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { ContentPasteGo, Close } from '@mui/icons-material';

const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding: 15px 0;
    border-bottom: 1px solid rgba(0,0,0,0.1);

    &:hover {
        background-color: #F5F5F5;
    }
`;

const MenuIndex = styled.div`
    font-size: 13px;
    margin-left: 5px;
`;

const MenuName = styled.div`
    flex: 5;
    margin: 0 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const MenuTime = styled.div`
    flex: 3;
    text-align: center; 
    margin-right: 15px;
`;

const ButtonWrapper = styled.div`
`;

const StyledCloseIcon = styled(Close)`
    && {
        font-size: 20px;
        color: grey;
        opacity: 0.5;
        padding: 4px;
        border-radius: 50%;
        cursor: pointer;
    }

    &:hover {
        opacity: 1;
        background-color: rgba(0,0,0,0.1);
    }
`;

const StyledDetailIcon = styled(ContentPasteGo)`
    && {
        font-size: 20px;
        color: grey;
        opacity: 0.5;
        padding: 4px;
        border-radius: 50%;
        cursor: pointer;
    }

    &:hover {
        opacity: 1;
        background-color: rgba(0,0,0,0.1);
    }
`;

const HourSpan = styled.div`
    font-size: 13px;
`;

const DaySpan = styled.span`
    display: inline-block;
    padding: 3px;
    font-size: 12px;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 20px;
    color: ${props => props.green ? props.theme.green : props.theme.disabled};
`;
const MenuInProductDetailItem = ({ item, index, handleGetDeletePim }) =>  {
    const navigate = useNavigate();

    if (!item) {
        return null;
    }

    const handleSetDeletePim = (e, pimId, menuName) => {
        e.stopPropagation();
        handleGetDeletePim(pimId, menuName);
    }

    return (
        <MenuContainer>
            <MenuIndex>{index+1}.</MenuIndex>
            <MenuName>{item.MenuName}</MenuName>

            <MenuTime>
                <HourSpan>
                    {
                        item.TimeStart === '00:00:00' && item.TimeEnd === '23:59:59' ?
                        "Cả ngày" 
                        : item.TimeEnd === '23:59:59' ?
                        item.TimeStart.slice(0,5) + ' - 24:00'
                        : item.TimeStart.slice(0,5) + " - " + item.TimeEnd.slice(0,5)
                    }
                </HourSpan>
                {item.RepeatDate.includes('1') ? <DaySpan green>2</DaySpan> : <DaySpan>2</DaySpan>}
                {item.RepeatDate.includes('2') ? <DaySpan green>3</DaySpan> : <DaySpan>3</DaySpan>}
                {item.RepeatDate.includes('3') ? <DaySpan green>4</DaySpan> : <DaySpan>4</DaySpan>}
                {item.RepeatDate.includes('4') ? <DaySpan green>5</DaySpan> : <DaySpan>5</DaySpan>}
                {item.RepeatDate.includes('5') ? <DaySpan green>6</DaySpan> : <DaySpan>6</DaySpan>}
                {item.RepeatDate.includes('6') ? <DaySpan green>7</DaySpan> : <DaySpan>7</DaySpan>}
                {item.RepeatDate.includes('0') ? <DaySpan green>CN</DaySpan> : <DaySpan>CN</DaySpan>}
            </MenuTime>

            <ButtonWrapper>
                <StyledDetailIcon onClick={() => navigate("/menu/" + item.MenuId)} />
                <StyledCloseIcon onClick={(e) => handleSetDeletePim(e, item.ProductInMenus[0].ProductInMenuId, item.MenuName)} />
            </ButtonWrapper>
        </MenuContainer>
    )
}

export default MenuInProductDetailItem;