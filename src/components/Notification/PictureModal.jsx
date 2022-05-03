import React from 'react';
import styled from "styled-components";
import Modal from 'react-modal';

const ModalContentWrapper = styled.div`
    font-size: 15px;
    color: #212529;
`;

const BigImageWrapper = styled.div`
    width: 100%;
    padding-top: 100%;
    position: relative;
    margin-bottom: 15px;
`;

const Image = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
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

const WarnStoreModal = ({ display, toggle, url }) => {

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalContentWrapper>
                <BigImageWrapper>
                    <Image src={url} />
                </BigImageWrapper>
            </ModalContentWrapper>
        </Modal>
    )
};

export default WarnStoreModal;