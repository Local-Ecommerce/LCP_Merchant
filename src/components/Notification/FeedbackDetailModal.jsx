/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { api } from "../../RequestMethod";
import { Person, Inventory } from '@mui/icons-material';

const ModalTitle = styled.h4`
    border-bottom: 1px solid #cfd2d4;
    margin: 0px;
    padding: 20px;
    color: #212529;
`;

const ModalContentWrapper = styled.div`
    border-bottom: 1px solid #cfd2d4;
    padding: 20px;
    display: flex;
`;

const LeftWrapper = styled.div`
    flex: 1;
    margin-right: 30px;
`;

const RightWrapper = styled.div`
    flex: 2;
    max-height: 65vh;
    overflow: auto;
    overflow-x: hidden;
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
        right: '40%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const Invisible = styled.div`
    min-width: 80px;
`;

const EntityWrapper = styled.div`
    flex: 1;
    display: flex;
    margin-top: ${props => props.mt ? "30px" : null};
`;

const StyledPersonIcon = styled(Person)`
    && {
        padding: 10px;
        border-radius: 50%;
        background-color: #e9f0fe;
        color: #2f69e7;
        margin-right: 15px;
    }
`;

const StyledInventoryIcon = styled(Inventory)`
    && {
        padding: 10px;
        border-radius: 50%;
        background-color: #e9f0fe;
        color: #2f69e7;
        margin-right: 15px;
    }
`;

const DetailWrapper = styled.div`
`;

const DetailLabel = styled.div`
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 10px;
`;

const DetailText = styled.div`
    font-size: 14px;
    margin-bottom: 5px;
`;

const DetailHyperlink = styled.span`
    font-size: 14px;
    margin-top: 10px;
    color: ${props => props.disabled ? props.theme.grey : props.theme.blue};
    cursor: ${props => props.disabled ? null : "pointer"};
`;

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

const FeedbackDetailModal = ({ display, toggle, feedbackId, handleGetResidentItem, handleGetProductItem, handleGetPicItem }) => {
    const [images, setImages] = useState([]);
    const [productOption, setProductOption] = useState('');
    const [feedback, setFeedback] = useState({});

    useEffect(() => {
        if (display) {
            setImages([]); setProductOption(''); setFeedback({});

            const fetchData = () => {
                console.log(feedbackId)
                api.get("feedbacks?id=" + feedbackId + "&include=resident&include=product")
                .then(function (res) {
                    console.log(res.data.Data.List[0])
                    setFeedback(res.data.Data.List[0]);

                    let imageList = res.data.Data.List[0].Image ? res.data.Data.List[0].Image.split("|").filter(item => item).map((item) => (
                        { image: item }
                    )) : [];
                    setImages(imageList);
        
                    let option = (res.data.Data.List[0].Product.Color ? res.data.Data.List[0].Product.Color : '')
                                + (res.data.Data.List[0].Product.Color && (res.data.Data.List[0].Product.Size || res.data.Data.List[0].Product.Weight) ? " / " : '')
                                + (res.data.Data.List[0].Product.Size ? res.data.Data.List[0].Product.Size : '')
                                + (res.data.Data.List[0].Product.Size && res.data.Data.List[0].Product.Weight ? " / " : '')
                                + (res.data.Data.List[0].Product.Weight ? res.data.Data.List[0].Product.Weight + " kg" : '');
                    setProductOption(option);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
            fetchData();
        }
    }, [display]);

    const handleSetResidentItem = () => {
        handleGetResidentItem(feedback.Resident);
    }

    const handleSetProductItem = () => {
        handleGetProductItem(feedback.Product);
    }

    const handleSetPicItem = (url) => {
        handleGetPicItem(url);
    }

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalTitle>Chi tiết phản hồi</ModalTitle>

            <ModalContentWrapper>
                <LeftWrapper>
                    <EntityWrapper>
                        <StyledPersonIcon />
                        
                        <DetailWrapper>
                            <DetailLabel>Khách hàng</DetailLabel>
                            <DetailText>{feedback.Resident && feedback.Resident.ResidentName}</DetailText>
                            <DetailText>{feedback.Resident && feedback.Resident.PhoneNumber ? feedback.Resident.PhoneNumber.slice(0, 4) + " " + feedback.Resident.PhoneNumber.slice(4, 7) + " " + feedback.Resident.PhoneNumber.slice(7) : '-'}</DetailText>
                            <DetailHyperlink onClick={handleSetResidentItem}>Xem chi tiết</DetailHyperlink>
                        </DetailWrapper>
                    </EntityWrapper>

                    <EntityWrapper mt={1}>
                        <StyledInventoryIcon />
                        
                        <DetailWrapper>
                            <DetailLabel>Sản phẩm được phản hồi</DetailLabel>
                            <DetailText>{feedback.Product && feedback.Product.ProductName}</DetailText>
                            <DetailText>{productOption}</DetailText>
                            <DetailHyperlink onClick={handleSetProductItem}>Xem chi tiết</DetailHyperlink>
                        </DetailWrapper>
                    </EntityWrapper>
                </LeftWrapper>

                <RightWrapper>
                    <DetailLabel>Nội dung phản hồi</DetailLabel>
                    <TextArea
                        disabled rows="10"
                        type="text" value={feedback.FeedbackDetail}
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
                </RightWrapper>
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