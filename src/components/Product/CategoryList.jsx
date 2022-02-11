import React from 'react';
import styled from 'styled-components';
import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';

const StyledList = styled(List)`
    && {
        border: 1px solid #d6d6d6;
        border-radius: 5px;
        margin-right: 5px;
    }
`;

const StyledArrowRight = styled(ArrowRight)`
    && {
        color: #44474a;
    }
`;

const CategoryList = ({ currentItems, handleGetSubCategory }) => {

    return (
        <StyledList dense sx={{ width: '100%', maxWidth: 375, height: 300, position: 'relative', overflow: 'auto' }}>
        {
            currentItems && currentItems.map((item, index) => {
                return (
                    <ListItem key={index} secondaryAction={item.level !== 3 ? <StyledArrowRight /> : null} disablePadding>
                        <ListItemButton onClick={() => handleGetSubCategory()}>
                            <ListItemText disableTypography primary={<Typography style={{ color: '#44474a' }}>{item.CategoryName}</Typography>} />
                        </ListItemButton>
                    </ListItem>
                );
            })
        }
        </StyledList>
    );
}

export default CategoryList;