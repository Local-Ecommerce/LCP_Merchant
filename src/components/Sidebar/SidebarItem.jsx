import React, { useState } from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 0px 15px;
    list-style: none;
    height: 60px;
    text-decoration: none;
    color: ${props => props.theme.dark};
    font-size: 0.9em;
    font-weight: 600;

    &:hover, &:focus, &[class*="active"] {
        background-color: ${props => props.theme.hover};
        cursor: pointer;
        text-decoration: none;
        color: ${props => props.theme.blue};
    }
`;

const SidebarDiv = styled.div`
    display: flex;
    align-items: center;
    padding: 0px 20px;
    list-style: none;
    height: 25px;
    text-decoration: none;
    color: rgba(0,0,0,0.3);
    font-size: 14px;
    font-weight: 600;
    margin-top: 15px;
`;

const Row = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Status = styled.span`
    margin-left: 5px;
    padding: 3px 5px;
    font-size: 11px;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 3px;
    color: ${props => props.theme.white};
    background-color: #dc3545;
`;

const SidebarItem = ({ item, openOrder }) => {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);

    return (
        <>
            {
            item.path ?
            <SidebarLink to={item.path} onClick={item.subNav ? showSubnav : null}>
                <Row>
                    {item.icon}
                    {item.title}
                    
                    {
                        item.title === 'Đơn hàng' && openOrder > 0 ?
                        <Status>{openOrder}</Status>
                        : null
                    }
                </Row>
                <div>
                    {item.subNav && subnav
                        ? item.iconOpened
                        : item.subNav
                            ? item.iconClosed
                            : null}
                </div>
            </SidebarLink>

            :

            <SidebarDiv>
                {item.title}
            </SidebarDiv>
            }
        </>
    );
};

export default SidebarItem;