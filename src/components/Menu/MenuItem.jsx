import React from 'react';
import styled from 'styled-components';
import { Delete, ToggleOff, ToggleOn } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const Button = styled.button`
    padding: 3px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    color: ${props => props.disabled === true ? "#E0E0E0" : "grey"};

    &:focus {
    outline: none;
    }
`;

const TableRow = styled.tr`
    &:hover {
        background-color: #F5F5F5;
        cursor: pointer;
    }
`;

const TableData = styled.td`
    padding: 16px;
    vertical-align: top;
    border-bottom: 1px solid #dee2e6;
    vertical-align: middle;
    text-align: ${props => props.center ? "center" : "left"};
    font-size: 15px;
    color: ${props => props.grey ? props.theme.grey : null};

    height: 50px;
`;

const DaySpan = styled.span`
    display: inline-block;
    padding: 4px;
    font-size: 0.8em;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 20px;
    color: ${props => props.green ? props.theme.green : props.theme.disabled};
`;

const StyledToggleOnIcon = styled(ToggleOn)`
    && {
        font-size: 40px;
        color: ${props => props.theme.green};

        
        &:hover {
            opacity: 0.8;
        }
    }
`;

const StyledToggleOffIcon = styled(ToggleOff)`
    && {
        font-size: 40px;
        color: ${props => props.theme.red};

        
        &:hover {
            opacity: 0.8;
        }
    }
`;

const StyledDeleteIcon = styled(Delete)`
    padding: 8px;
    border-radius: 20px;

    &:hover {
    background-color: ${props => props.disabled === true ? null : props.theme.disabled};
    }
`;

const MenuItem = ({ item, handleGetToggleStatusItem, handleGetDeleteItem, index }) =>  {
    const navigate = useNavigate();

    if (item === 0) {
        return (
            <TableRow>
                <TableData colSpan={100} center>
                    <h4>Không tìm thấy dữ liệu.</h4>
                </TableData>
            </TableRow>
        )
    }

    const handleSetToggleStatusItem = (e) => {
        e.stopPropagation();
        handleGetToggleStatusItem(item.MenuId, item.MenuName, (item.Status === 9001 ? true : false))
    }

    const handleSetDeleteItem = (e) => {
        e.stopPropagation();
        handleGetDeleteItem(item.MenuId, item.MenuName);
    }

    return (
        <TableRow onClick={() => navigate("/menu/" + item.MenuId)}>
            <TableData grey>{index + 1}</TableData>
            <TableData>{item.MenuName}</TableData>
            <TableData center>{item.TimeStart}</TableData>
            <TableData center>{item.TimeEnd}</TableData>
            <TableData center>
                {item.RepeatDate.includes('2') ? <DaySpan green>2</DaySpan> : <DaySpan>2</DaySpan>}
                {item.RepeatDate.includes('3') ? <DaySpan green>3</DaySpan> : <DaySpan>3</DaySpan>}
                {item.RepeatDate.includes('4') ? <DaySpan green>4</DaySpan> : <DaySpan>4</DaySpan>}
                {item.RepeatDate.includes('5') ? <DaySpan green>5</DaySpan> : <DaySpan>5</DaySpan>}
                {item.RepeatDate.includes('6') ? <DaySpan green>6</DaySpan> : <DaySpan>6</DaySpan>}
                {item.RepeatDate.includes('7') ? <DaySpan green>7</DaySpan> : <DaySpan>7</DaySpan>}
                {item.RepeatDate.includes('8') ? <DaySpan green>CN</DaySpan> : <DaySpan>CN</DaySpan>}
            </TableData>

            <TableData center>
                {
                    item.Status === 9001 ?
                    <StyledToggleOnIcon onClick={handleSetToggleStatusItem} />
                    : item.Status === 9005 ?
                    <StyledToggleOffIcon onClick={handleSetToggleStatusItem} />
                    : null
                }
            </TableData>

            <TableData center>
                <Button disabled={item.Status === 14004 ? true : false} onClick={handleSetDeleteItem}>
                    <StyledDeleteIcon disabled={item.Status === 14004 ? true : false} />
                </Button>
            </TableData>
        </TableRow>
    )
}

export default MenuItem;