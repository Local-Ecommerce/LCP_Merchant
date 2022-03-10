import React from 'react';
import ProductInMenuItem from './ProductInMenuItem';

const ProductInMenuList = ({ currentItems, handleDeleteItem, handleSetPrice }) => {

    if (currentItems.length === 0) {
        return <ProductInMenuItem item={0} />
    }

    return currentItems && currentItems.map((item, index) => {
        return (
            <ProductInMenuItem
                item={item} index={index + 1} key={index}
                handleDeleteItem={handleDeleteItem}
                handleSetPrice={handleSetPrice}
            />
        )
    });
}

export default ProductInMenuList;