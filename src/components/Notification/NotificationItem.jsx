import React from 'react';
import styled from "styled-components";
import { Circle } from '@mui/icons-material';
import { DateTime } from 'luxon';

const NotificationWrapper = styled.a`
    height: 50px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dee2e6;
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

const TextWrapper = styled.div`
    flex: 8;
`;

const TopText = styled.span`
    margin: 5px 0px;
    font-size: 14px;
`;

const TimeWrapper = styled.div`
    flex: 1;
    margin: 0px;
    color: #484848;
    font-size: 12px;
    font-weight: 400;
`;

const TimeLabel = styled.span`
    float: right;
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
    display: flex;
    margin-left: 10px;
`;

const StyledSeenCircle = styled(Circle)`
    && {
        font-size: 16px;
        color: ${props => props.checked === 1 ? "#1976d2" : "#fff"};
    }
`;

const StatusLabel = styled.span`
    margin-right: 6px;
    display: inline-block;
    padding: 3px 5px;
    font-size: 0.8em;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 5px;
    color: #fff;
    background-color: ${props => props.red ? "#dc3545" : "#FF8800"};
`;

const NotificationItem = ({ item, handleRejectItem }) => {
    const date = DateTime.fromISO(item.ApprovedTime)
    const diff = date.diffNow(["years", "months", "days", "hours", "minutes"])
    let timeLabel = '';

    if (Math.abs(diff.toObject().years) > 0) {
        timeLabel = (Math.abs(diff.toObject().years) + ' năm trước');
    } 
    else if (Math.abs(diff.toObject().months) > 0) {
        timeLabel = (Math.abs(diff.toObject().months) + ' tháng trước');
    } 
    else if (Math.abs(diff.toObject().days) > 0) {
        timeLabel = (Math.abs(diff.toObject().days) + ' ngày trước');
    } 
    else if (Math.abs(diff.toObject().hours) > 0) {
        timeLabel = (Math.abs(diff.toObject().hours) + ' tiếng trước');
    } 
    else {
        timeLabel = (Math.abs(diff.toObject().minutes) + ' phút trước');
    }

    let statusLabel = '';
    switch(item.Status) {
        case 1006:
            statusLabel = <StatusLabel red>Tạo mới</StatusLabel>
            break;
        case 1007:
            statusLabel = <StatusLabel>Cập nhật</StatusLabel>
            break;
        case 6006:
            statusLabel = <StatusLabel red>Tạo mới</StatusLabel>
            break;
        case 6007:
            statusLabel = <StatusLabel>Cập nhật</StatusLabel>
            break;
        default:
            break;
    }

    return (
            <NotificationWrapper>
                {item.Image ? <Image src={item.Image} /> : null}

                <TextWrapper>
                    <TopText>{item.Text}</TopText>

                    <BottomText>{timeLabel}</BottomText>
                </TextWrapper>

                <SeenWrapper>
                    <StyledSeenCircle checked={item.Status} />
                </SeenWrapper>
            </NotificationWrapper>
    );
};

export default NotificationItem;