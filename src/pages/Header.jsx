import React from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { Notifications, Search } from '@mui/icons-material';
import { Badge } from '@mui/material';

import Avatar from '../components/Header/Avatar';

const Wrapper = styled.div`
    display: flex;
    background-color: #fff;
    padding: 10px 25px;
    box-shadow: 0 4px 3px -5px rgba(0, 0, 0, 0.75);
    justify-content: space-between;
    align-items: center;
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

const Header = () => {
    const [NotificationModal, toggleNotificationModal] = React.useState(false);

    return (
        <Wrapper>
            <Avatar />

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
            
                <Avatar />
            </div>

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