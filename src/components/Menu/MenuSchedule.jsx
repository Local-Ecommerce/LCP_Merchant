import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import * as Constant from '../../Constant';

const Table = styled.table`
    table-layout: fixed;
    border-spacing: 0px;
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    overflow: hidden;
    border-radius: 5px;
    border: 1px solid rgba(0,0,0,0.05);
`;

const TableHead = styled.thead`
    display: table-header-group;
    vertical-align: bottom;
    background-color: ${props => props.theme.hover};
`;

const TableHeader = styled.th`
    width: ${props => props.width};
    text-align: center;
    padding: 16px;
    font-size: 15px;
    color: ${props => props.grey ? props.theme.grey : null};
    border-bottom: 1px solid #dee2e6;
`;

const TableBody = styled.tbody`
    border-top: 1px solid #dee2e6;
`;

const TableData = styled.td`
    border-bottom: ${props => props.border ? "1px solid rgba(0,0,0,0.05)" : null};
    vertical-align: middle;
    height: 5px;
    text-align: center;
    font-size: 14px;
`;

const TimeBlock = styled(TableData)`
    font-size: 13px;
    border-right: 1px solid rgba(0,0,0,0.05);
`;

const MenuBlock = styled(TableData)`
    background-color: ${props => props.active === Constant.ACTIVE_MENU ? props.theme.blue : "rgba(0,0,0,0.2)"};
    color: ${props => props.theme.white};
    border-radius: 3px;
    cursor: pointer;
    border: 1px solid ${props => props.theme.white};
    opacity: ${props => props.focus ? "1" : "0.6"};

    &:hover {
        opacity: 0.8;
    }
`;

const TimeText = styled.div`
    margin-top: 5px;
    font-weight: 600;
`;

const MenuName = styled.div`
    margin: 5px;
`;

const TableRow = styled.tr``;

const MenuList = ({ menuSchedule }) => {
    const navigate = useNavigate();
    let skipColumn = 0;

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeader width={"80px"}>&nbsp;</TableHeader>
                    <TableHeader>Thứ hai</TableHeader>
                    <TableHeader>Thứ ba</TableHeader>
                    <TableHeader>Thứ tư</TableHeader>
                    <TableHeader>Thứ năm</TableHeader>
                    <TableHeader>Thứ sáu</TableHeader>
                    <TableHeader>Thứ bảy</TableHeader>
                    <TableHeader>Chủ nhật</TableHeader>
                </TableRow>
            </TableHead>

            <TableBody>
                {[...Array(96)].map((x, columnIndex) =>
                    <TableRow key={columnIndex}>
                        {
                            columnIndex % 4 === 0 ?
                            <TimeBlock border rowSpan={4}>{columnIndex/4}:00 - {columnIndex/4 + 1}:00</TimeBlock>
                            : null
                        }
                        
                        {[...Array(7)].map((x, rowIndex) => {
                            if (skipColumn > 0) {
                                skipColumn -= 1;
                                return null;
                            }

                            const found = menuSchedule.find(menu => menu.RepeatDate.charAt(0) === (rowIndex + 1).toString() && menu.TimeStartMillis === columnIndex * 900000);
                            if (found) {
                                skipColumn = found.RepeatDate.length - 1;
                                return <MenuBlock
                                    focus={found.Focus ? 1 : 0}
                                    onClick={() => navigate("/menu/" + found.MenuId)}
                                    key={rowIndex}
                                    rowSpan={(found.TimeEndMillis - found.TimeStartMillis) / 900000}
                                    colSpan={found.RepeatDate.length}
                                    active={found.Status}
                                >
                                    <TimeText>{found.TimeStart} - {found.TimeEnd}</TimeText>
                                    <MenuName>{found.MenuName}</MenuName>
                                </MenuBlock>
                            } else {
                                const skip = menuSchedule.find(menu => menu.RepeatDate.includes((rowIndex + 1).toString()) 
                                && menu.TimeStartMillis < columnIndex * 900000 && menu.TimeEndMillis > columnIndex * 900000);
                                if (skip) {
                                    return null;
                                } else {
                                    return <TableData key={rowIndex} border={columnIndex % 4 === 3}></TableData>
                                }
                            }
                        })}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default MenuList;