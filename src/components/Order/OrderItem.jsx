import React from 'react';
import styled from 'styled-components';
import { Timer } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { DateTime } from 'luxon';
import * as Constant from '../../Constant';

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
    display: inline-flex;
    align-items: center;
    padding: 4px 6px;
    font-size: 0.8em;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 20px;
    color: ${props => props.active === "inactive" ? "grey" : "#fff"};
    background-color: ${props => 
        props.active === "active" ? "#28a745"
        :
        props.active === "inprogress" ? props.theme.blue
        :
        props.active === "unverified" ? "#FF8800"
        :
        props.active === "deleted" ? "#dc3545"
        :
        "#dc3545"};
`;

const LoadingIcon = styled(Timer)`
    && {
        font-size: 14px;
        margin-right: 3px;
    }
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
        case Constant.OPEN:
            activeCheck = 'unverified';
            activeLabel = 'Chờ duyệt';
            break;
        case Constant.CONFIRMED:
            activeCheck = 'inprogress';
            activeLabel = 'Đang hoạt động';
            break;
        case Constant.COMPLETED:
            activeCheck = 'active';
            activeLabel = 'Hoàn thành';
            break;
        case Constant.CANCELED_ORDER:
            activeCheck = 'deleted';
            activeLabel = 'Hủy';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS';
            break;
    }

    let phoneNumber = (item.Resident && item.Resident.PhoneNumber) || '';
    phoneNumber = phoneNumber.slice(0, 4) + " " + phoneNumber.slice(4, 7) + " " + phoneNumber.slice(7);

    return (
        <TableRow onClick={() => navigate("/order/" + item.OrderId)}>
            <TableData grey>{index + 1}</TableData>
            <TableData>{item.Resident && item.Resident.ResidentName}</TableData>
            <TableData>{item.Resident && item.Resident.DeliveryAddress}</TableData>
            <TableData center>{phoneNumber}</TableData>
            <TableData center>
                <small>
                    {DateTime.fromISO(item.CreatedDate).toFormat('t')}<br/>
                    {DateTime.fromISO(item.CreatedDate).toFormat('dd/MM/yyyy')}
                </small>
            </TableData>
            <TableData center>{item.TotalAmount.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</TableData>

            <TableData center>
                <Status active={activeCheck}>
                    {
                        item.Status === Constant.CONFIRMED || item.Status === Constant.OPEN ?
                        <LoadingIcon />
                        : null
                    }
                    {activeLabel}
                </Status>
            </TableData>
        </TableRow>
    )
}

export default OrderItem;