import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';

import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

const ModalContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 30px;
    border: 1px solid rgba(0,0,0,0.5);
`;

const HelperText = styled.div`
    text-decoration: none;
    font-size: 16px;
    color: #383838;
    margin-top: ${props => props.mt0 ? null : "30px"};
    text-align: center;
    line-height: 1.2;
`;

const HelperTitle = styled(HelperText)`
    text-decoration: none;
    font-size: 18px;
    font-weight: 600;
    color: #383838;
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: center;
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

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '20%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const LearnMoreAboutMenuModal = ({ display, toggle }) => {
    const images = ([
        {index: 0, image: '/images/learnAboutMenu1.png'},
        {index: 1, image: '/images/learnAboutMenu2.png'},
        {index: 2, image: '/images/learnAboutMenu3.png'}
    ]);
    const [index, setIndex] = useState(1);

    useEffect(() => {
        if (display) {
            setIndex(0);
        }
    }, [display])

    useEffect(() => {
        console.log(index)
    }, [index])

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
                        {images.map((item, index) => {
                            return <SwiperSlide key={index}>
                                <ImageContainer>
                                    <Image src={item.image} />
                                </ImageContainer>

                                    {
                                        item.index === 0 ?
                                        <>
                                            <HelperTitle>B???ng gi?? c?? b???n</HelperTitle>
                                            <HelperText mt0>
                                                L?? b???ng gi?? n???n c???a c???a h??ng.
                                                <br/>C??c s???n ph???m m???i t???o s??? ???????c ????a v??o b???ng gi?? n??y v???i gi?? m???c ?????nh.
                                            </HelperText>
                                        </>
                                        : item.index === 1 ?
                                        <>
                                            <HelperTitle>B???ng gi?? theo gi???</HelperTitle>
                                            <HelperText mt0>
                                                M???i c???a h??ng c?? th??? s??? h???u nhi???u b???ng gi?? theo gi???.
                                                <br/>Gi??? ho???t ?????ng c???a c??c b???ng gi?? theo gi??? kh??ng ???????c tr??ng nhau.
                                                <br/>C??c s???n ph???m trong b???ng gi?? theo gi??? c?? th??? ???????c c???p nh???t gi?? b??n m???i.
                                            </HelperText>
                                        </>
                                        : item.index === 2 ? 
                                        <HelperText>
                                            Khi ?????n gi??? ho???t ?????ng c???a <b>b???ng gi?? theo gi???</b>, n???u <b>"t??ch h???p b???ng gi?? c?? b???n"</b> ???????c ch???n, 
                                            <br/>c??c s???n ph???m thu???c <b>b???ng gi?? c?? b???n</b> v?? n???m ngo??i <b>b???ng gi?? theo gi???</b> v???n s??? ti???p t???c ho???t ?????ng.
                                        </HelperText>
                                        : null
                                    }
                            </SwiperSlide>
                        })}
                        ...
                    </Swiper>
                </ImageWrapper>
            </ModalContentWrapper>
        </Modal>
    )
};

export default LearnMoreAboutMenuModal;