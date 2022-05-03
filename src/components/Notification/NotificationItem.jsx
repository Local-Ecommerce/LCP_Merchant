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

const WarningWrapper = styled.div`
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

const SeenWrapper = styled.div`
    margin-left: auto;
`;

const StyledSeenCircle = styled(Circle)`
    && {
        font-size: 16px;
        color: ${props => props.checked === 0 ? "#1976d2" : props.theme.white};
    }
`;

const NotificationItem = ({ item, handleGetFeedback }) => {
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

    const handleSetFeedback = () => {
        handleGetFeedback(item);
    }

    return (
        <>
            {
                item.type === '103' || item.type === '104' ?
                <WarningWrapper onClick={handleSetFeedback}>
                    {
                        item.data.image ?
                        <Image src={item.data.image} />
                        : <StyledNoImageIcon />
                    }
        
                    <TextWrapper>
                        <TopText>
                            <b>{item.data.name} </b>
                            {
                                item.type === '103' ? <>đã bị cảnh cáo với lí do: {item.data.feedbackReason}</>
                                : item.type === '104' ? <>đã được gỡ cảnh cáo.</>
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
                </WarningWrapper>

                :

                <NotificationWrapper to={
                    item.type === '001' || item.type === '002' ?
                    "/product/" + item.data.id
                    : item.type === '101' || item.type === '102' ?
                    "/storeDetail"
                    : item.type === '301' ?
                    "/orders"
                    : "/"
                }>
                    {
                        item.data.image ?
                        <Image src={item.data.image} />
                        : <StyledNoImageIcon />
                    }
        
                    <TextWrapper>
                        <TopText>
                            <b>{item.data.name} </b> 
                            {
                                item.type === '001' ? "đã được duyệt."
                                : item.type === '101' ? "cập nhật đã được duyệt."
                                : item.type === '002' ? <>đã bị từ chối với lí do: <u>{item.data.reason}</u>.</>
                                : item.type === '102' ? <>cập nhật đã bị từ chối với lí do: <u>{item.data.reason}</u>.</>
                                : item.type === '103' ? <>đã bị cảnh cáo sau phản hồi của khách hàng.</>
                                : item.type === '301' ? <b>{"Cửa hàng nhận được 1 đơn hàng mới."}</b>
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
            }
        </>
    );
};

export default NotificationItem;