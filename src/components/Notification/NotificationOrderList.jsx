import { React } from 'react';
import NotificationOrderItem from './NotificationOrderItem';

const NotificationOrderList = ({ currentItems }) => {

    return currentItems && currentItems.map((item, index) => {
        return (
            <NotificationOrderItem 
                item={item} key={index} 
            />
        )
    });
}

export default NotificationOrderList;