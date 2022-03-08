import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ currentItems, handleGetDeleteItem }) => {

    if (currentItems.length === 0) {
        return <ProductItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <ProductItem
                item={item} key={index}
                handleGetDeleteItem={handleGetDeleteItem}
            />
        )
    });
}

export default ProductList;