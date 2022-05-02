import React from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

const ModalContentWrapper = styled.div`
    display: flex;
    padding: 40px;
`;

const LeftWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
`;

const RightWrapper = styled.div`
    flex: 1;
`;

const NoItemTitle = styled.div`
    text-decoration: none;
    font-size: 26px;
    font-weight: 600;
    color: #383838;
    margin: 15px 0;
`;

const NoItemText = styled.div`
    text-decoration: none;
    font-size: 15px;
    color: #383838;
    line-height: 1.5;
`;

const NoItemButton = styled.button`
    border-radius: 20px;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    background-color: ${props => props.theme.blue};
    color: white;
    font-size: 13px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 30px;

    &:active {
    transform: translateY(1px);
    }

    &:hover {
    opacity: 0.8;
    }
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
        right: '55%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const FirstTimePopupModal = ({ display, toggle }) => {

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalContentWrapper>
                <LeftWrapper>
                    <NoItemTitle>
                        Chào mừng đến LCP!
                    </NoItemTitle>

                    <NoItemText>
                        Hãy bắt đầu với việc tạo sản phẩm đầu tiên cho cửa hàng của bạn.
                    </NoItemText>

                    <Link to="/products">
                        <NoItemButton>
                            Tạo sản phẩm
                        </NoItemButton>
                    </Link>
                </LeftWrapper>

                <RightWrapper>
                    <BigImageWrapper>
                        <Image src={"/images/welcomePopup.png"} />
                    </BigImageWrapper>
                </RightWrapper>
            </ModalContentWrapper>
        </Modal>
    )
};

export default FirstTimePopupModal;