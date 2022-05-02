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
    font-size: 16px;
    color: #383838;
    margin-top: 20px;
    text-align: center;
    line-height: 1.3;
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

const IncludeBaseMenuModal = ({ display, toggle }) => {

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalContentWrapper>
                <ImageWrapper>
                    <Image src={"/images/learnAboutMenu3.png"} />
                </ImageWrapper>

                <HelperText>
                    Khi đến giờ hoạt động của <b>bảng giá theo giờ</b>, nếu <b>"tích hợp bảng giá cơ bản"</b> được chọn, 
                    <br/>các sản phẩm thuộc <b>bảng giá cơ bản</b> và nằm ngoài <b>bảng giá theo giờ</b> vẫn sẽ tiếp tục hoạt động.
                </HelperText>
            </ModalContentWrapper>
        </Modal>
    )
};

export default IncludeBaseMenuModal;