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
        timeLabel = (Math.abs(diff.toObject().years) + ' n??m tr?????c');
    } 
    else if (Math.abs(diff.toObject().months) >= 1) {
        timeLabel = (Math.abs(diff.toObject().months) + ' th??ng tr?????c');
    } 
    else if (Math.abs(diff.toObject().days) >= 1) {
        timeLabel = (Math.abs(diff.toObject().days) + ' ng??y tr?????c');
    } 
    else if (Math.abs(diff.toObject().hours) >= 1) {
        timeLabel = (Math.abs(diff.toObject().hours) + ' ti???ng tr?????c');
    } 
    else if (Math.abs(diff.toObject().minutes) > 1) {
        timeLabel = Math.trunc(Math.abs(diff.toObject().minutes)) + ' ph??t tr?????c';
    } else {
        timeLabel = '1 ph??t tr?????c';
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
                                item.type === '103' ? <>???? b??? c???nh c??o v???i l?? do: {item.data.feedbackReason}</>
                                : item.type === '104' ? <>???? ???????c g??? c???nh c??o.</>
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
                    : item.type === '3' || item.type === '4' ?
                    "/menu/" + item.data.menuId
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
                            {
                                item.type === '3' ?
                                <>B???ng gi?? <b>{item.data.menuName}</b> c?? s???n ph???m h???t h??ng.</>
                                : item.type === '4' ?
                                <>B???ng gi?? <b>{item.data.menuName}</b> c?? s???n ph???m g???n h???t h??ng.</>
                                :
                                <>
                                    <b>{item.data.name} </b> 
                                    {
                                        item.type === '001' ? "???? ???????c duy???t."
                                        : item.type === '101' ? "c???p nh???t ???? ???????c duy???t."
                                        : item.type === '002' ? <>???? b??? t??? ch???i v???i l?? do: <u>{item.data.reason}</u>.</>
                                        : item.type === '102' ? <>c???p nh???t ???? b??? t??? ch???i v???i l?? do: <u>{item.data.reason}</u>.</>
                                        : item.type === '103' ? <>???? b??? c???nh c??o sau ph???n h???i c???a kh??ch h??ng.</>
                                        : item.type === '301' ? <b>{"C???a h??ng nh???n ???????c 1 ????n h??ng m???i."}</b>
                                        : null
                                    }
                                </>
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