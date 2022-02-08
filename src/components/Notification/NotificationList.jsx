import { React } from 'react';
import NotificationItem from './NotificationItem';

const NotificationList = ({ currentItems, handleRejectItem }) => {

    return currentItems && currentItems.map((item, index) => {
        return (
            <NotificationItem item={item}
            handleRejectItem={handleRejectItem} key={index} />
        )
    });
}

export default NotificationList;