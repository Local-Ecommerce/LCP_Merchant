import React from 'react';
import styled from "styled-components";
import { Circle, Done, Close } from '@mui/icons-material';
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

const StyledDoneIcon = styled(Done)`
    && {
        padding: 8px;
        background-color: ${props => props.theme.hover};
        color: ${props => props.theme.grey};
        border-radius: 50%;
        margin-right: 10px;
    }
`;

const StyledCloseIcon = styled(Close)`
    && {
        padding: 8px;
        background-color: ${props => props.theme.hover};
        color: ${props => props.theme.grey};
        border-radius: 50%;
        margin-right: 10px;
    }
`;

const TextWrapper = styled.div`
`;

const TopText = styled.span`
    margin: 0px 0px 10px 0px;
    font-size: 14px;
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

const SeenWrapper = styled.div`
    margin-left: auto;
`;

const StyledSeenCircle = styled(Circle)`
    && {
        font-size: 16px;
        color: ${props => props.checked === 0 ? "#1976d2" : props.theme.white};
    }
`;

const NotificationItem = ({ item }) => {
    const date = DateTime.fromMillis(item.createdDate)
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
            <NotificationWrapper to={"/product/" + item.data.id}>
                {
                    item.type === '001' || item.type === '002' ? <Image src={item.data.image} />
                    : item.type === '101' ? <StyledDoneIcon />
                    : item.type === '102' ? <StyledCloseIcon />
                    : null
                }

                <TextWrapper>
                    <TopText>
                        <b>{item.data.name} </b> 
                        {
                            item.type === '001' ? "đã được duyệt."
                            : item.type === '101' ? "cập nhật đã được duyệt."
                            : item.type === '002' ? <>đã bị từ chối với lí do: <u>{item.data.reason}</u>.</>
                            : item.type === '102' ? <>cập nhật đã bị từ chối với lí do: <u>{item.data.reason}</u>.</>
                            : null
                        }
                    </TopText>

                    <BottomText>{timeLabel}</BottomText>
                </TextWrapper>

                <SeenWrapper>
                    {
                        item.read === 0 ?
                        <StyledSeenCircle checked={item.read} />
                        : null
                    }
                </SeenWrapper>
            </NotificationWrapper>
    );
};

export default NotificationItem;