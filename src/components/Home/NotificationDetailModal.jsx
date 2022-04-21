/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { DateTime } from 'luxon';
import * as Constant from '../../Constant';

import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

const ModalContentWrapper = styled.div`
    border-bottom: 1px solid #cfd2d4;
    padding: 20px;
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
        right: '50%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const Invisible = styled.div`
    min-width: 80px;
`;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const ImageContainer = styled.div`
    width: 100%;
    padding-top: 30%;
    position: relative;
    border-bottom: 1px solid rgba(0,0,0,0.1);
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

const Title = styled.div`
    font-size: 24px;
    font-weight: 600;
`;

const Type = styled.span`
    margin-right: 8px;
    display: inline-flex;
    align-items: center;
    padding: 3px 5px;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    border-radius: 20px;
    color: ${props => props.theme.white};
    background-color: ${props => 
        props.type === Constant.NEWS_TYPE_01 ? props.theme.orange
      : props.type === Constant.NEWS_TYPE_02 ? props.theme.blue
      : props.type === Constant.PINNED ? props.theme.red
      : props.theme.disabled};
`;

const Date = styled.div`
    font-size: 14px;
    color: ${props => props.theme.grey};
    margin: 10px 0;
`;

const Text = styled.div`
    font-size: 16px;
`;

const DetailModal = ({ display, toggle, detailItem }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (display) {
            setImages([]);

            let imageList = detailItem.Image ? detailItem.Image.split("|").filter(item => item).map((item) => (
                { image: item }
            )) : [];
            setImages(imageList);
        }
    }, [display])

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalContentWrapper>
                <ImageWrapper>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                    >
                        {images.map((item) => {
                            return <SwiperSlide>
                                <ImageContainer>
                                    <Image src={item.image} />
                                </ImageContainer>
                            </SwiperSlide>
                        })}
                        ...
                    </Swiper>
                </ImageWrapper>

                <Title>
                    <Type type={detailItem.Type}>{detailItem.Type}</Type>
                    {detailItem.Title}
                </Title>

                <Date>{DateTime.fromISO(detailItem.ReleaseDate).toFormat('dd/MM/yyyy t')}</Date>

                <Text>{detailItem.Text}</Text>
            </ModalContentWrapper>

            <ModalButtonWrapper>
                <Invisible />
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default DetailModal;