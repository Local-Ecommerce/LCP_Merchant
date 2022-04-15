import React from 'react';
import styled from "styled-components";
import { Circle, HideImage } from '@mui/icons-material';
import { DateTime } from 'luxon';
import { Link } from "react-router-dom";

const NotificationWrapper = styled(Link)`
    height: 50px;
    padding: 8px 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dee2e6;
    color: ${props => props.theme.black};
    text-decoration: none;
    cursor: pointer;
    background-color: #fff;
    border-radius: 5px;

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

const Image = styled.img`
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;

const StyledNoImageIcon = styled(HideImage)`
    && {
        color: rgba(0,0,0,0.2);
        font-size: 20px;
        padding: 10px;
        border-radius: 50%;
        border: 1px solid rgba(0,0,0,0.2);
        margin-right: 10px;
    }
`;

const TextWrapper = styled.div`
`;

const TopText = styled.span`
    margin: 3px 0px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const BottomText = styled.p`
    margin: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #484848;
    font-size: 12px;
    font-weight: 400;
`;

const NotificationOrderItem = ({ item }) => {
    console.log(item)
    const date = DateTime.fromISO(item.CreatedDate)
    const diff = date.diffNow(["years", "months", "days", "hours", "minutes"])
    let timeLabel = '';

    if (Math.abs(diff.toObject().years) >= 1) {
        timeLabel = (Math.abs(diff.toObject().years) + ' năm trước');
    } 
    else if (Math.abs(diff.toObject().months) >= 1) {
        timeLabel = (Math.abs(diff.toObject().months) + ' tháng trước');
    } 
    else if (Math.abs(diff.toObject().days) >= 1) {
        timeLabel = (Math.abs(diff.toObject().days) + ' ngày trước');
    } 
    else if (Math.abs(diff.toObject().hours) >= 1) {
        timeLabel = (Math.abs(diff.toObject().hours) + ' tiếng trước');
    } 
    else if (Math.abs(diff.toObject().minutes) > 1) {
        timeLabel = Math.trunc(Math.abs(diff.toObject().minutes)) + ' phút trước';
    } else {
        timeLabel = '1 phút trước';
    }

    return (
            <NotificationWrapper to={"/order/" + item.OrderId}>
                {
                    item.OrderDetails && item.OrderDetails[0].Product.BaseProduct !== null ?
                    <Image src={item.OrderDetails[0].Product.BaseProduct.Image} />
                    : item.OrderDetails[0].Product.BaseProduct === null ?
                    <Image src={item.OrderDetails[0].Product.Image} />
                    : <StyledNoImageIcon />
                }

                <TextWrapper>
                    <TopText>
                        Cửa hàng đang có 1 <b>đơn hàng chờ duyệt</b>.
                    </TopText>

                    <BottomText>{timeLabel}</BottomText>
                </TextWrapper>
            </NotificationWrapper>
    );
};

export default NotificationOrderItem;