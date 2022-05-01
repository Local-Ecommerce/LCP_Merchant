import React from 'react';
import styled from "styled-components";
import Modal from 'react-modal';

const ModalContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px;
    border: 1px solid rgba(0,0,0,0.5);
`;

const HelperText = styled.div`
    text-decoration: none;
    font-size: 18px;
    color: #383838;
    margin-top: 20px;
    text-align: center;
`;

const ImageWrapper = styled.div`
`;

const Image = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 5px;
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '30%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const LearnMoreAboutMenuModal = ({ display, toggle }) => {

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalContentWrapper>
                <ImageWrapper>
                    <Image src={"/images/learnAboutProduct.png"} />
                </ImageWrapper>

                <HelperText>
                    Tạo <b>Sản phẩm</b> và thêm vào <b>Bảng giá</b> giúp khách hàng thấy được sản phẩm của bạn khi bảng giá hoạt động.
                </HelperText>
            </ModalContentWrapper>
        </Modal>
    )
};

export default LearnMoreAboutMenuModal;