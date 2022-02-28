import React, { useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { Notifications, Search, AccountCircleOutlined, HelpOutlineOutlined, Logout } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useClickOutside from "../contexts/useClickOutside";

const Wrapper = styled.div`
    display: flex;
    background-color: #fff;
    padding: 10px 30px 10px 10px;
    box-shadow: 0 4px 3px -5px rgba(0, 0, 0, 0.75);
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled.img`
    width: 80px;
    height: 40px;
`;

const SearchField = styled.div`
    display: flex;
    width: 31%;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #E0E0E0;
    border-style: solid;
    border-width: thin;
    height: 35px;
    padding: 0px 3px 0px 8px;
    background-color: #f6f6f7;
`;

const Input = styled.input`
    padding: 4px;
    flex-grow: 1;
    background-color: transparent;
    outline: none;
    border: none;
    margin-right: 8px;

    &:focus {
    outline: 0;
    }
`;

const StyledSearchIcon = styled(Search)`
    && {
        color: grey;
    }
`;

const Avatar = styled.img`
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
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

const ModalTitle = styled.h2`
    margin: 25px 20px;
    color: #212529;
    text-align: center;
`;

const ModalContentWrapper = styled.div`
    border-top: 1px solid #cfd2d4;
    border-bottom: 1px solid #cfd2d4;
`;

const ModalButton = styled.button`
    min-width: 80px;
    margin: 20px;
    padding: 10px;
    margin-left: 10px;
    background: ${props => props.red ? "#dc3545" : "#fff"};
    color: ${props => props.red ? "#fff" : "#212529"};;
    border: 1px solid ${props => props.red ? "#dc3545" : "#fff"};
    border-radius: 4px;
    text-align: center;
    font-size: 1rem;
    float: right;

    &:hover {
    opacity: 0.8;
    }

    &:focus {
    outline: 0;
    }

    &:active {
    transform: translateY(2px);
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '50%',
        bottom: 'auto',
        marginRight: '-45%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const DropdownWrapper = styled.div`
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

const Header = () => {
    const { logout } = useAuth();
    const user = JSON.parse(localStorage.getItem('USER'));
    let navigate = useNavigate();
    const [NotificationModal, toggleNotificationModal] = useState(false);
    const [UserDropdown, toggleUserDropdown] = useState(false);

    let clickOutside = useClickOutside(() => {
        toggleUserDropdown(false);
    });

    async function handleLogout() {
        try {
            await logout();
        } catch {}
    }

    return (
        <Wrapper>
            <Link to={"/"}>
                <Logo src='./images/lcp2.png' alt="Loich Logo" />
            </Link>

            <SearchField>
                <StyledSearchIcon />
                <Input placeholder="Tìm kiếm" />
            </SearchField>

            <div>
                <IconButton onClick={() => toggleNotificationModal(!NotificationModal)}>
                    <StyledBadge badgeContent={1} overlap="circular">
                        <StyledNotificationIcon />
                    </StyledBadge>
                </IconButton>
            
                <Avatar onClick={() => toggleUserDropdown(!UserDropdown)} src="./images/user.png" alt="Loich Logo" />
            </div>

            {
            UserDropdown ?
            <DropdownWrapper ref={clickOutside}>
                <Name>
                    {user.Residents[0].ResidentName} <br/> 
                    <Title>Người bán hàng</Title> 
                </Name>
                
                <DropdownList>
                    <DropdownLink to={"/"}> <StyledPersonIcon /> Thông tin cá nhân </DropdownLink>
                    <DropdownLink to={"/"}> <StyledHelpIcon /> Trợ giúp </DropdownLink>
                    <DropdownItem onClick={handleLogout}> <StyledLogoutIcon /> Đăng xuất </DropdownItem>
                </DropdownList>
            </DropdownWrapper>
            : null
            }

            <Modal isOpen={NotificationModal} onRequestClose={() => toggleNotificationModal(!NotificationModal)} style={customStyles} ariaHideApp={false}>
                <ModalTitle>Thông báo</ModalTitle>

                <ModalContentWrapper>
                </ModalContentWrapper>

                <ModalButton red onClick={() => toggleNotificationModal(!NotificationModal)}>Quay lại</ModalButton>
            </Modal>
        </Wrapper>
    );
}

export default Header;