import { React } from 'react';
import NotificationItem from './NotificationItem';

const NotificationList = ({ currentItems, handleGetFeedbackId }) => {

    return currentItems && currentItems.map((item, index) => {
        return (
            <NotificationItem 
                item={item} key={index}
                handleGetFeedbackId={handleGetFeedbackId}
            />
        )
    });
}

export default NotificationList;