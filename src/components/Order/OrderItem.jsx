import React from 'react';
import styled from 'styled-components';
import { Delete, ToggleOff, ToggleOn } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

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
    font-size: 14px;
    color: ${props => props.grey ? props.theme.grey : null};

    height: 35px;
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

const OrderItem = ({ item, index }) =>  {
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

    let activeCheck = '';
    let activeLabel = '';
    switch (item.Status) {
        case 0:
            activeCheck = 'unverified';
            activeLabel = 'Chờ duyệt';
            break;
        case 1:
            activeCheck = 'active';
            activeLabel = 'Duyệt';
            break;
        case 2:
            activeCheck = 'deleted';
            activeLabel = 'Từ chối';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS';
            break;
    }

    let phoneNumber = item.Resident.PhoneNumber || '';
    phoneNumber = phoneNumber.slice(0, 4) + " " + phoneNumber.slice(4, 7) + " " + phoneNumber.slice(7);

    return (
        <TableRow onClick={() => navigate("/order/" + item.OrderId)}>
            <TableData grey>{index + 1}</TableData>
            <TableData>{item.Resident.ResidentName}</TableData>
            <TableData>{item.DeliveryAddress}</TableData>
            <TableData center>{phoneNumber}</TableData>
            <TableData center>{item.CreatedDate}</TableData>
            <TableData center>{item.TotalAmount.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</TableData>

            <TableData center>
                <Status active={activeCheck}>{activeLabel}</Status>
            </TableData>
        </TableRow>
    )
}

export default OrderItem;