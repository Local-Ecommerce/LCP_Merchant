import { React } from 'react';
import NotificationItem from './NotificationItem';

const NotificationList = ({ currentItems }) => {

    return currentItems && currentItems.map((item, index) => {
        return (
            <NotificationItem 
                item={item} key={index} 
            />
        )
    });
}

export default NotificationList;