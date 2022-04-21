import { React } from 'react';
import HomeNotificationItem from './HomeNotificationItem';

const HomeNotificationList = ({ currentItems, handleGetItem }) => {

    return currentItems && currentItems.map((item, index) => {
        return (
            <HomeNotificationItem 
                item={item} 
                key={index}
                handleGetItem={handleGetItem}
            />
        )
    });
}

export default HomeNotificationList;