import React from 'react';
import styled from 'styled-components';
import SidebarData from '../components/Sidebar/SidebarData';
import SidebarItem from '../components/Sidebar/SidebarItem';

const SidebarWrapper = styled.div`
    background-color: #fff;
    text-decoration: none;
    min-width: 245px;
    max-width: 245px;
    height: 100vh;
    border-right: 1px solid #E0E0E0;
    overflow-y:scroll;

    &::-webkit-scrollbar {
    display: none;
    }
`;

const PaddingBlock = styled.div`
    height: 85px;
`;

const Sidebar = () => {
    return (
        <SidebarWrapper>
            <PaddingBlock />

            {SidebarData.map((item, index) => {
                return <SidebarItem item={item} key={index} />;
            })}
        </SidebarWrapper>
    );
};

export default Sidebar;