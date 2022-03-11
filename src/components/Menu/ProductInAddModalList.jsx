import React from 'react';
import ProductInAddModalItem from './ProductInAddModalItem';

const ProductInAddModalList = ({ currentItems, search, handleToggle }) => {

    if (currentItems.length === 0) {
        return <ProductInAddModalItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <ProductInAddModalItem
                item={item} key={index}
                search={search}
                handleToggle={handleToggle}
            />
        )
    });
}

export default ProductInAddModalList;