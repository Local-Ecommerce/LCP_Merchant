import React from 'react';
import styled from "styled-components";
import Modal from 'react-modal';

const ModalTitle = styled.h4`
    border-bottom: 1px solid #cfd2d4;
    margin: 0px;
    padding: 20px;
    color: #212529;
`;

const ModalContentWrapper = styled.div`
    padding: 20px;
    font-size: 15px;
    color: #212529;
`;

const ModalButtonWrapper = styled.div`
    border-top: 1px solid #cfd2d4;
    padding: 20px;
`;

const ModalButton = styled.button`
    min-width: 80px;
    padding: 10px;
    margin-left: 10px;
    background: ${props => props.color === "red" ? props.theme.red : props.color === "green" ? props.theme.green : props.theme.white};
    color: ${props => props.color === "red" || props.color === "green" ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.color === "red" ? props.theme.red : props.color === "green" ? props.theme.green : props.theme.greyBorder};
    border-radius: 4px;
    text-align: center;
    font-size: 1rem;
    font-size: 14px;
    font-weight: 600;
    float: right;
    margin-bottom: 20px;

    &:hover {
    opacity: 0.8;
    }

    &:focus {
    outline: 0;
    }

    &:active {
    transform: translateY(1px);
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '65%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const ToggleStatusModal = ({ display, toggle, toggleStatusItem, handleToggleStatus }) => {

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalTitle>Cập nhật trạng thái</ModalTitle>
            <ModalContentWrapper>
                {
                    toggleStatusItem.status ?
                    <>Bạn có chắc muốn ngưng hoạt động bảng giá【<b>{toggleStatusItem ? toggleStatusItem.name : ''}</b>】?</>
                    :
                    <>Cho bảng giá【<b>{toggleStatusItem ? toggleStatusItem.name : ''}</b>】hoạt động trở lại?</>
                }
            </ModalContentWrapper>
            <ModalButtonWrapper>
                <ModalButton color={toggleStatusItem.status ? "red" : "green"} onClick={handleToggleStatus}>Thay đổi</ModalButton>
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default ToggleStatusModal;