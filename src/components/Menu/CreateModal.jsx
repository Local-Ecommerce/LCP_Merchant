import React from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { TextField } from '@mui/material';

const ModalTitle = styled.h2`
    margin: 25px 20px;
    color: #212529;
`;

const ModalContentWrapper = styled.div`
    border-top: 1px solid #cfd2d4;
    border-bottom: 1px solid #cfd2d4;
    padding: 25px;
`;

const ModalButtonWrapper = styled.div`
    margin: 20px;
    float: right;
`;

const ModalButton = styled.button`
    min-width: 80px;
    padding: 10px;
    margin-left: 10px;
    background: ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.white};
    color: ${props => props.red || props.blue ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.greyBorder};
    border-radius: 4px;
    text-align: center;
    font-size: 1rem;

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
        right: '60%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const FormLabel = styled.div`
    font-weight: 700;
    margin-bottom: 10px;
    margin-top: ${props => props.mt ? "30px" : null};
`;

const CreateModal = ({ display, toggle, input, error, setInput, handleAddItem }) => {

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalTitle>Tạo chung cư mới</ModalTitle>

            <ModalContentWrapper>
                <FormLabel>Tên chung cư</FormLabel>
                <TextField
                    fullWidth size="small"
                    value={''} name='name'
                    onChange={(event) => setInput(input => ({ ...input, name: event.target.value }))}
                />

                <FormLabel mt>Địa chỉ</FormLabel>
                <TextField
                    fullWidth size="small"
                    multiline rows={3}
                    value={''} name='address'
                    onChange={(event) => setInput(input => ({ ...input, address: event.target.value }))}
                />
            </ModalContentWrapper>
            
            <ModalButtonWrapper>
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
                <ModalButton blue onClick={handleAddItem}>Tạo</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default CreateModal;