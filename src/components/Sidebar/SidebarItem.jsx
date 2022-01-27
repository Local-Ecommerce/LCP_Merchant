import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 0px 20px 0px 20px;
    list-style: none;
    height: 50px;
    text-decoration: none;
    color: #44474a;
    font-size: 0.9em;
    font-weight: 600;

    &:hover {
        background-color: rgba(246, 246, 247, 1);
        cursor: pointer;
        text-decoration: none;
    }

    &:focus {
        background-color: rgba(246, 246, 247, 1);
        cursor: pointer;
        text-decoration: none;
    }
`;

const SidebarDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 0px 20px 0px 20px;
    list-style: none;
    height: 50px;
    text-decoration: none;
    color: #44474a;
    font-size: 0.9em;
    font-weight: 600;

    &:hover {
        background-color: rgba(246, 246, 247, 1);
        cursor: pointer;
        text-decoration: none;
    }

    &:focus {
        background-color: rgba(246, 246, 247, 1);
        cursor: pointer;
        text-decoration: none;
    }
`;

const SidebarChild = styled(SidebarLink)`
    color: #8e9092;
    padding: 0px 20px 0px 44px;
    height: 45px;
`;

const Row = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SidebarLabel = styled.span`
    margin-left: 16px;
`;

const SidebarItem = ({ item }) => {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);

    return (
        <>
            {
            (item.path !== null) ?
            <SidebarLink to={item.path} onClick={item.subNav ? showSubnav : null}>
                <Row>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
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
            <SidebarDiv to={item.path} onClick={item.subNav ? showSubnav : null}>
                <Row>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </Row>
                <div>
                    {item.subNav && subnav
                        ? item.iconOpened
                        : item.subNav
                            ? item.iconClosed
                            : null}
                </div>
            </SidebarDiv>
            }
            {subnav &&
                item.subNav.map((item, index) => {
                    return (
                        <SidebarChild to={item.path} onClick={item.subNav ? showSubnav : null} key={index}>
                            <Row>
                                {item.icon}
                                <SidebarLabel>{item.title}</SidebarLabel>
                            </Row>
                            <div>
                                {item.subNav && subnav
                                    ? item.iconOpened
                                    : item.subNav
                                        ? item.iconClosed
                                        : null}
                            </div>
                        </SidebarChild>
                    );
                })}
        </>
    );
};

export default SidebarItem;