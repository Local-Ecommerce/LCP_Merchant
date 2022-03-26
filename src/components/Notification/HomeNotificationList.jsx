import { React } from 'react';
import HomeNotificationItem from './HomeNotificationItem';

const HomeNotificationList = ({ currentItems, handleRejectItem }) => {

    return currentItems && currentItems.map((item, index) => {
        return (
            <HomeNotificationItem item={item}
            handleRejectItem={handleRejectItem} key={index} />
        )
    });
}

export default HomeNotificationList;