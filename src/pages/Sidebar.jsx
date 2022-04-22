/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SidebarData from '../components/Sidebar/SidebarData';
import SidebarItem from '../components/Sidebar/SidebarItem';
import { api } from "../RequestMethod";
import { Person } from '@mui/icons-material';
import * as Constant from '../Constant';

const SidebarWrapper = styled.div`
    background-color: #fff;
    text-decoration: none;
    min-width: 245px;
    max-width: 245px;
    height: 100vh;
    border-right: 1px solid #E0E0E0;
    position: fixed; 
    z-index: 1; 
    top: 0; 
    left: 0;
    overflow: hidden;

    &::-webkit-scrollbar {
    display: none;
    }
`;

const PaddingBlock = styled.div`
    height: 90px;
`;

const AvatarWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    border-bottom: 1px solid rgba(0,0,0,0.15);
    padding-bottom: 5px;
    margin: 0px 15px;
`;

const Avatar = styled.img`
    vertical-align: middle;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.1);
`;

const StyledUserIcon = styled(Person)`
    && {
        color: ${props => props.theme.grey};
        font-size: 30px;
        padding: 10px;
        border-radius: 50%;
        border: 1px solid rgba(0,0,0,0.1);
    }
`;

const Name = styled.h3`
    width: 100%;
    text-align: center;
    font-size: 16px;
    margin: 15px 0px;
    font-weight: 500;
    line-height: 1.2em;
`;

const Hello = styled.span`
    font-size: 16px;
    color: ${props => props.theme.dark};
    font-weight: 400;
`;

const Sidebar = ({ refresh, toggleRefresh }) => {
    const user = JSON.parse(localStorage.getItem('USER'));
    const [openOrder, setOpenOrder] = useState(0);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {  //fetch api data

        const fetchData = () => {
            api.get("residents?id=" + user.Residents[0].ResidentId)
            .then(function (res) {
                setName(res.data.Data.List[0].ResidentName || '');

                api.get("accounts?id=" + res.data.Data.List[0].AccountId)
                .then(function (res2) {
                    setImage(res2.data.Data.ProfileImage);

                    let url = "orders"
                        + "?limit=100"
                        + "&sort=-createddate"
                        + "&include=product"
                        + "&include=resident"
                        + "&status=" + Constant.OPEN;
                    api.get(url)
                    .then(function (res3) {
                        setOpenOrder(res3.data.Data.List.length);
                    })
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        fetchData();
    }, [refresh]);

    return (
        <SidebarWrapper>
            <PaddingBlock />

            <AvatarWrapper>
                {
                    image ?
                    <Avatar src={image} />
                    : <StyledUserIcon />
                }
                
                <Name>
                    <Hello>Xin chào, </Hello>{name} <br/> 
                </Name>
            </AvatarWrapper>

            {SidebarData.map((item, index) => {
                return <SidebarItem item={item} key={index} openOrder={openOrder} />;
            })}

            <PaddingBlock />
        </SidebarWrapper>
    );
};

export default Sidebar;