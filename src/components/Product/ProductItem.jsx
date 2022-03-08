import React from 'react';
import styled from 'styled-components';
import { Delete } from '@mui/icons-material';
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
    padding: 8px 16px;
    vertical-align: top;
    vertical-align: middle;
    text-align: ${props => props.center ? "center" : "left"};
    font-size: 15px;
    color: ${props => props.grey ? props.theme.grey : null};
    border-bottom: 1px solid #dee2e6;

    height: 50px;
`;

const Image = styled.img`
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const Status = styled.span`
    display: inline-block;
    padding: 3px 5px;
    font-size: 11px;
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

const StyledDeleteIcon = styled(Delete)`
    padding: 8px;
    border-radius: 20px;

    &:hover {
    background-color: ${props => props.disabled === true ? null : props.theme.disabled};
    }
`;

const ProductItem = ({ item, handleGetDeleteItem }) =>  {
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
        case 1001:
            activeCheck = 'active';
            activeLabel = 'Hoạt động';
            break;
        case 1003:
            activeCheck = 'deleted';
            activeLabel = 'Từ chối';
            break;
        case 1004:
            activeCheck = 'unverified';
            activeLabel = 'Chờ xác thực';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS';
            break;
    }

    const handleSetDeleteItem = (e) => {
        e.stopPropagation();
        handleGetDeleteItem(item.ProductId, item.ProductName);
    }

    return (
        <TableRow onClick={() => navigate("/product/" + item.ProductId)}>
            <TableData center> <Image src={item.Image} /> </TableData>
            <TableData>{item.ProductName}</TableData>
            <TableData center>{item.DefaultPrice.toLocaleString().replace(',', '.')} đ</TableData>
            <TableData center> <Status active={activeCheck}>{activeLabel}</Status> </TableData>

            <TableData center>
                <Button onClick={handleSetDeleteItem}>
                    <StyledDeleteIcon />
                </Button>
            </TableData>
        </TableRow>
    )
}

export default ProductItem;