/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';

const ModalContentWrapper = styled.div`
    border-bottom: 1px solid #cfd2d4;
    padding: 20px;
`;

const ModalButtonWrapper = styled.div`
    margin: 20px;
    display: flex;
    justify-content: space-between;
`;

const ModalButton = styled.button`
    padding: 8px 10px;
    margin-left: 10px;
    background: ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.white};
    color: ${props => props.red || props.blue ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.greyBorder};
    border-radius: 6px;
    text-align: center;
    font-size: 14px;
    display: inline-flex;
    align-items: center;

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

const Invisible = styled.div`
    min-width: 80px;
`;

const DetailLabel = styled.div`
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 10px;
`;;

const TextArea = styled.textarea`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 5px;
    padding: 10px;
    outline: none;
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.greyBorder};
    border-radius: 3px;
    font-size: 14px;
    resize: none;

    &:disabled {
        color: ${props => props.theme.black};
        background-color: ${props => props.theme.white};
    }
`;

const ImageListWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    margin: 0px 25px 0px 0px;
    position: relative;
`;

const Image = styled.img`
    object-fit: contain;
    width: 88px;
    height: 88px;
    margin-bottom: 10px;
    display: ${(props) => (props.display === "true" ? null : "none")};
    cursor: pointer;
`;

const FeedbackDetailModal = ({ display, toggle, feedback, handleGetPicItem }) => {
    const [images, setImages] = useState([]);
    const [feedbackDetail, setFeedbackDetail] = useState('');

    useEffect(() => {
        if (display) {
            setImages([]); setFeedbackDetail('');

            let imageList = feedback.data.feedbackImage ? feedback.data.feedbackImage.split("|").filter(item => item).map((item) => (
                { image: item }
            )) : [];
            setImages(imageList);

            setFeedbackDetail(feedback.data.feedbackReason);
        }
    }, [display]);

    const handleSetPicItem = (url) => {
        handleGetPicItem(url);
    }

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalContentWrapper>
                <DetailLabel>Lí do cảnh cáo</DetailLabel>
                <TextArea
                    disabled rows="10"
                    type="text" value={feedbackDetail}
                />

                <ImageListWrapper>
                    {images.map((image, index) => {
                        return (
                            <ImageWrapper key={index}>
                                <Image
                                    id={image.name}
                                    src={image.image}
                                    display={image.image === "" ? "false" : "true"}
                                    onClick={() => handleSetPicItem(image.image)}
                                />
                                <small>Ảnh đính kèm {index + 1}</small>
                            </ImageWrapper>
                        );
                    })}
                </ImageListWrapper>
            </ModalContentWrapper>

            <ModalButtonWrapper>
                <Invisible />
                <div>
                    <ModalButton onClick={toggle}>Quay lại</ModalButton>
                </div>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default FeedbackDetailModal;