import React from 'react';
import styled from "styled-components";
import { DateTime } from 'luxon';
import * as Constant from '../../Constant';

const NotificationWrapper = styled.div`
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

const Type = styled.span`
    margin-right: 5px;
    display: inline-flex;
    align-items: center;
    padding: 3px 5px;
    font-size: 11px;
    font-weight: 700;
    text-align: center;
    border-radius: 20px;
    color: ${props => props.theme.white};
    background-color: ${props => 
        props.type === Constant.NEWS_TYPE_01 ? props.theme.orange
      : props.type === Constant.NEWS_TYPE_02 ? props.theme.blue
      : props.type === Constant.PINNED ? props.theme.red
      : props.theme.disabled};
`;

const NotificationItem = ({ item, handleGetItem }) => {
    const date = DateTime.fromISO(item.ReleaseDate)
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

    const handleSetItem = (e) => {
        e.stopPropagation();
        handleGetItem(item);
    }

    return (
            <NotificationWrapper onClick={handleSetItem}>
                <TextWrapper>
                    <TopText>
                        <Type type={item.Type}>{item.Type}</Type>
                        <b>{item.Title}</b> 
                    </TopText>

                    <BottomText>{timeLabel}</BottomText>
                </TextWrapper>
            </NotificationWrapper>
    );
};

export default NotificationItem;