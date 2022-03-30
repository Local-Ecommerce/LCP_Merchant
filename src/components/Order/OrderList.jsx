import React from 'react';
import OrderItem from './OrderItem';

const OrderList = ({ currentItems }) => {

    if (currentItems.length === 0) {
        return <OrderItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <OrderItem
                item={item} index={index} key={index}
            />
        )
    });
}

export default OrderList;