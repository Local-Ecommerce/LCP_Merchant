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

const CategoryList = ({ currentItems, selected, handleGetCategory }) => {

    return (
        <StyledList dense sx={{ width: '100%', maxWidth: 375, height: 300, position: 'relative', overflow: 'auto' }}>
        {
            currentItems && currentItems.map((item, index) => {
                return (
                    <ListItem selected={item.SystemCategoryId === selected} key={index} secondaryAction={item.CategoryLevel !== 3 ? <StyledArrowRight /> : null} disablePadding>
                        <ListItemButton onClick={() => handleGetCategory(item.SystemCategoryId)}>
                            <ListItemText disableTypography primary={
                                <Typography style={{ color: '#44474a' }}>{item.SysCategoryName}</Typography>
                            }/>
                        </ListItemButton>
                    </ListItem>
                );
            })
        }
        </StyledList>
    );
}

export default CategoryList;