import React, { useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { TextField, FormControlLabel, Radio, RadioGroup } from '@mui/material';

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
    padding: 8px 10px;
    margin-left: 10px;
    background: ${props => props.color === "red" ? props.theme.red : props.color === "green" ? props.theme.green : props.theme.white};
    color: ${props => props.color === "red" || props.color === "green" ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.color === "red" ? props.theme.red : props.color === "green" ? props.theme.green : props.theme.greyBorder};
    border-radius: 4px;
    text-align: center;
    font-size: 14px;
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

const RadioWrapper = styled.div`
    margin: 8px 20px;
`;

const RadioLabel = styled.span`
    font-size: 14px;
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

const RejectModal = ({ display, toggle, handleRejectItem }) => {
    const [reason, setReason] = useState('Tên không hợp lệ');
    const [reasonString, setReasonString] = useState('');
    const [error, setError] = useState('');

    const reasons = [
        'Hết hàng',
        'Khác'
    ];

    const handleReject = (e) => {
        if (validCheck()) {
            if (reason === 'Khác') {
                handleRejectItem(e, reasonString);
            } else {
                handleRejectItem(e, reason);
            }
        }
    }

    const validCheck = () => {
        let check = false;
        setError('');

        if (reason === 'Khác' && (reasonString === null || reasonString === '')) {
            setError('Vui lòng nhập lí do');
            check = true;
        }

        if (check === true) {
            return false;
        }
        return true;
    }

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalTitle>Từ chối đơn</ModalTitle>

            <ModalContentWrapper>
                Bạn có chắc muốn từ chối đơn hàng?

                <RadioWrapper>
                    <RadioGroup value={reason} name='reason' onChange={(e) => setReason(e.target.value)}>
                        {
                            reasons.map(reason => {
                                return <FormControlLabel 
                                    value={reason} key={reason}
                                    control={<Radio size="small" />} 
                                    label={<RadioLabel>{reason}</RadioLabel>} 
                                />
                            })
                        }

                        {
                            reason === 'Khác' ?
                            <TextField
                                fullWidth size="small" 
                                inputProps={{ maxLength: 250 }} 
                                value={reasonString} name='reasonString'
                                onChange={(e) => setReasonString(e.target.value)}
                                error={error !== ''}
                                helperText={error}
                            /> : null
                        }
                    </RadioGroup>
                </RadioWrapper>
            </ModalContentWrapper>
            
            <ModalButtonWrapper>
                <ModalButton color="red" onClick={handleReject}>Từ chối</ModalButton>
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default RejectModal;