/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { api } from "../RequestMethod";
import { Notifications, AccountCircleOutlined, HelpOutlineOutlined, Logout, Person } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useClickOutside from "../contexts/useClickOutside";
import * as Constant from '../Constant';
import _ from 'lodash';

import NotificationList from '../components/Notification/NotificationList';
import FeedbackDetailModal from '../components/Notification/FeedbackDetailModal';
import PictureModal from '../components/Notification/PictureModal';

import { db } from "../firebase";
import { ref, onValue, update, query, limitToLast, orderByChild, equalTo } from "firebase/database";

const Wrapper = styled.div`
    display: flex;
    background-color: #fff;
    padding: 10px 30px 10px 10px;
    box-shadow: 0 4px 3px -5px rgba(0, 0, 0, 0.75);
    justify-content: space-between;
    align-items: center;
`;

const Tab = styled.h1`
    color: ${props => props.active ? "#383838" : props.theme.grey};
    padding: 15px 0;
    margin: 0px;
    border-right: ${props => props.br ? "1px solid rgba(0,0,0,0.05)" : null};
    border-bottom: ${props => props.active ? "2px solid " + props.theme.blue : "2px solid rgba(0,0,0,0.05)"};
    font-size: 14px;
    width: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const NotificationSpan = styled.span`
    padding: 3px 5px;
    text-align: center;
    border-radius: 25px;
    color: ${props => props.theme.white};
    background-color: ${props =>  props.theme.red};
    margin: 0px 0px 0px 3px;
    font-size: 10px;
    font-weight: 400;
`;

const NoNotificationWrapper = styled.div`
    height: auto;
    margin: 0 auto;
    text-align: center;
`;

const StyledNoNotificationIcon = styled(Notifications)`
    && {
        margin: 40px;
        font-size: 77px;
        color: #D8D8D8;
    }
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.start ? "flex-start" : "space-between"};
    margin-left: ${props => props.ml ? "10px" : "0px"};
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: ${props => props.mb ? "20px" : "0px"};
`;

const Logo = styled.img`
    width: 80px;
    height: 40px;
`;

const Avatar = styled.img`
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0.1);
`;

const StyledUserIcon = styled(Person)`
    && {
        color: ${props => props.theme.grey};
        font-size: 30px;
        padding: 5px;
        border-radius: 50%;
        border: 1px solid rgba(0,0,0,0.1);
        cursor: pointer;
    }
`;

const Align = styled.div`
    display: flex;
    align-items: center;
`;

const StyledBadge = styled(Badge)`
    && {    
        color: #fff;

        & .MuiBadge-badge {
            background: #dc3545;
        }
    }
`;

const IconButton = styled.button`
    margin-right: 20px;
    padding: 5px;
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 50px;

    &:hover {
    background-color: #E0E0E0;
    }

    &:active {
    transform: translateY(2px);
    }
`;

const StyledNotificationIcon = styled(Notifications)`
    && {
        font-size: 24px;
        color: grey;
    }
`;

const NotificationDropdownWrapper = styled.div`
    position: absolute;
    top: 75px;
    right: 50px;
    margin: 0px 20px;
    background: ${props => props.theme.white};
    width: 400px;
    box-sizing: 0 5px 25px rgba(0,0,0,0.1);
    border-radius: 15px;
    border: 1px solid rgba(0,0,0,0.1);
    transition: 0.5s;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);

    &:before {
        content: '';
        position: absolute;
        top: -10px;
        right: 28px;
        width: 18px;
        height: 18px;
        background: ${props => props.theme.white};
        transform: rotate(45deg);
    }
`;

const NotificationWrapper = styled.div`
    max-height: 60vh;
    overflow: auto;
    overflow-x: hidden;
`;

const UserDropdownWrapper = styled.div`
    position: absolute;
    top: 75px;
    right: -10px;
    margin: 0px 20px;
    background: ${props => props.theme.white};
    width: 250px;
    box-sizing: 0 5px 25px rgba(0,0,0,0.1);
    border-radius: 15px;
    border: 1px solid rgba(0,0,0,0.1);
    transition: 0.5s;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);

    &:before {
        content: '';
        position: absolute;
        top: -5px;
        right: 28px;
        width: 20px;
        height: 20px;
        background: ${props => props.theme.white};
        transform: rotate(45deg);
    }
`;

const Name = styled.h3`
    width: 100%;
    text-align: center;
    font-size: 18px;
    margin: 15px 0px;
    font-weight: 500;
    line-height: 1.2em;
`;

const Title = styled.span`
    font-size: 15px;
    color: ${props => props.theme.dark};
    font-weight: 400;
`;

const DropdownList = styled.ul`
    padding: 0px;
    margin: 10px 0px;
    cursor: pointer;
`;

const DropdownItem = styled.div`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${props => props.theme.dark};
    height: 50px;
    border-top: 1px solid rgba(0,0,0,0.05);
    padding: 0px 20px;

    &:hover {
        color: ${props => props.theme.blue};
        background-color: ${props => props.theme.hover};
    }
`;

const DropdownLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${props => props.theme.dark};
    height: 50px;
    border-top: 1px solid rgba(0,0,0,0.05);
    padding: 0px 20px;

    &:hover {
        color: ${props => props.theme.blue};
        background-color: ${props => props.theme.hover};
    }
`;

const StyledPersonIcon = styled(AccountCircleOutlined)`
    && {
        margin-right: 8px;
        opacity: 0.5;

        &:hover {
            opacity: 1.0;
        }
    }
`;

const StyledHelpIcon = styled(HelpOutlineOutlined)`
    && {
        margin-right: 8px;
        opacity: 0.5;
    }
`;

const StyledLogoutIcon = styled(Logout)`
    && {
        margin-right: 8px;
        opacity: 0.5;
    }
`;

const ApartmentName = styled.div`
    font-size: 14px;
    margin-left: 10px;
`;

const Header = ({ refresh, toggleRefresh }) => {
    const { logout } = useAuth();
    let navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('USER'));
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [apartmentName, setApartmentName] = useState('');

    const [feedback, setFeedback] = useState({});
    const [feedbackModal, setFeedbackModal] = useState(false);
    const toggleFeedbackModal = () => { setFeedbackModal(!feedbackModal) };

    const [picItem, setPicItem] = useState({});
    const [pictureModal, setPictureModal] = useState(false);
    function togglePictureModal() { setPictureModal(!pictureModal); }

    const [activeTab, setActiveTab] = useState(1);
    const [notificationDropdown, toggleNotificationDropdown] = useState(false);
    const [userDropdown, toggleUserDropdown] = useState(false);

    const [products, setProducts] = useState([]);
    const [productRead, setProductRead] = useState(0);
    const [stores, setStores] = useState([]);
    const [storeRead, setStoreRead] = useState(0);
    const [orders, setOrders] = useState([]);
    const [orderRead, setOrderRead] = useState(0);
    const [idList, setIdList] = useState([]);

    useEffect(() => {  //fetch api data
        if (user && user.RoleId === "R001" && user.Residents[0].Type === Constant.MERCHANT) {
            const dataRef = query(ref(db, 'Notification/' + user.Residents[0].ResidentId), limitToLast(100), orderByChild('receiverId'), equalTo(user.Residents[0].ResidentId));
            return onValue(dataRef, (snapshot) => {
                const data = _.reverse(_.toArray(snapshot.val()));
                const productList = data.filter(item => item.type === '001' || item.type === '002' || item.type === '3' || item.type === '4');
                const storeList = data.filter(item => item.type === '101' || item.type === '102' || item.type === '103' || item.type === '104');
                const orderList = data.filter(item => item.type === '301');

                setProducts(productList);
                setStores(storeList);
                setOrders(orderList);
                setProductRead(productList.filter(item => item.read === 0).length);
                setStoreRead(storeList.filter(item => item.read === 0).length);
                setOrderRead(orderList.filter(item => item.read === 0).length);


                setIdList(Object.entries(snapshot.toJSON()).map(item => { return item[0] }));
            })
        }
    }, []);

    useEffect(() => {
        const fetchData = () => {
            api.get("residents?id=" + user.Residents[0].ResidentId)
            .then(function (res) {
                setName(res.data.Data.List[0].ResidentName || '');

                api.get("accounts?id=" + res.data.Data.List[0].AccountId)
                .then(function (res2) {
                    setImage(res2.data.Data.ProfileImage);

                    api.get("apartments?id=" + res.data.Data.List[0].ApartmentId)
                    .then(function (res3) {
                        setApartmentName("| " + res3.data.Data.List[0].ApartmentName);
                    })
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        fetchData();
    }, [refresh]);

    let clickOutside = useClickOutside(() => {
        if (notificationDropdown) {
            handleSetRead();
            toggleNotificationDropdown(false);
        }
        if (userDropdown) {
            toggleUserDropdown(false);
        }
    });

    const handleSetRead = () => {
        if (idList.length) {
            idList.forEach(item => {
                update(ref(db, `Notification/` + user.Residents[0].ResidentId + "/" + item), {
                    read: 1
                });
            })
        }
    };

    async function handleLogout() {
        try {
            await logout();
            navigate("/");
        } catch {}
    }

    const handleGetFeedback = (feedback) => {
        setFeedback(feedback);
        toggleFeedbackModal();
    }

    const handleGetPicItem = (url) => {
        setPicItem(url);
        togglePictureModal();
    }

    return (
        <Wrapper>
            <Align>
                <Link to={"/"}>
                    <Logo src='./images/lcp.png' alt="Loich Logo" />
                </Link>
                <ApartmentName>{apartmentName}</ApartmentName>
            </Align>

            <Align>
                <IconButton onClick={() => toggleNotificationDropdown(!notificationDropdown)}>
                    <StyledBadge badgeContent={productRead + storeRead + orderRead} overlap="circular">
                        <StyledNotificationIcon />
                    </StyledBadge>
                </IconButton>
            
                {
                    image ?
                    <Avatar onClick={() => toggleUserDropdown(!userDropdown)} src={image} />
                    : <StyledUserIcon onClick={() => toggleUserDropdown(!userDropdown)} />
                }
            </Align>

            {
                notificationDropdown ?
                <NotificationDropdownWrapper ref={clickOutside}>
                    <Row>
                        <Tab br active={activeTab === 1 ? 1 : 0} onClick={() => setActiveTab(1)}>
                            Sản phẩm 
                            {
                                productRead > 0 ?
                                <NotificationSpan> {productRead} </NotificationSpan>
                                : null
                            }
                        </Tab>

                        <Tab br active={activeTab === 2 ? 1 : 0} onClick={() => setActiveTab(2)}>
                            Cửa hàng
                            {
                                storeRead > 0 ?
                                <NotificationSpan> {storeRead} </NotificationSpan>
                                : null
                            }
                        </Tab>

                        <Tab br active={activeTab === 3 ? 1 : 0} onClick={() => setActiveTab(3)}>
                            Đơn hàng 
                            {
                                orderRead > 0 ?
                                <NotificationSpan> {orderRead} </NotificationSpan>
                                : null
                            }
                        </Tab>
                    </Row>

                    {
                        activeTab === 1 && products.length ?
                        <>
                            <NotificationWrapper>
                                <NotificationList 
                                    currentItems={products}
                                />
                            </NotificationWrapper>
                        </>
                        : activeTab === 2 && stores.length ?
                        <>
                            <NotificationWrapper>
                                <NotificationList 
                                    currentItems={stores}
                                    handleGetFeedback={handleGetFeedback}
                                />
                            </NotificationWrapper>
                        </>
                        : activeTab === 3 && orders.length ?
                        <>
                            <NotificationWrapper>
                                <NotificationList 
                                    currentItems={orders}
                                />
                            </NotificationWrapper>
                        </>
                        : 
                        <NoNotificationWrapper>
                            <StyledNoNotificationIcon />
                        </NoNotificationWrapper>
                    }
                </NotificationDropdownWrapper>
                : null
            }

            {
                userDropdown ?
                <UserDropdownWrapper ref={clickOutside}>
                    <Name>
                        {name} <br/> 
                        <Title>Thương nhân</Title> 
                    </Name>
                    
                    <DropdownList>
                        <DropdownLink to={"/userProfile"}> <StyledPersonIcon /> Thông tin cá nhân </DropdownLink>
                        <DropdownLink to={"/"}> <StyledHelpIcon /> Trợ giúp </DropdownLink>
                        <DropdownItem onClick={handleLogout}> <StyledLogoutIcon /> Đăng xuất </DropdownItem>
                    </DropdownList>
                </UserDropdownWrapper>
                : null
            }

            <FeedbackDetailModal 
                display={feedbackModal} 
                toggle={toggleFeedbackModal} 
                feedback={feedback}
                handleGetPicItem={handleGetPicItem}
            />

            <PictureModal
                display={pictureModal} 
                toggle={togglePictureModal} 
                url={picItem}
            />
        </Wrapper>
    );
}

export default Header;