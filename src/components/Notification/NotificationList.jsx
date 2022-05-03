import { React } from 'react';
import NotificationItem from './NotificationItem';

const NotificationList = ({ currentItems, handleGetFeedback }) => {

    return currentItems && currentItems.map((item, index) => {
        return (
            <NotificationItem 
                item={item} key={index}
                handleGetFeedback={handleGetFeedback}
            />
        )
    });
}

export default NotificationList;