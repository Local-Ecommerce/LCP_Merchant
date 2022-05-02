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
                                            <HelperTitle>Bảng giá cơ bản</HelperTitle>
                                            <HelperText mt0>
                                                Là bảng giá nền của cửa hàng.
                                                <br/>Các sản phẩm mới tạo sẽ được đưa vào bảng giá này với giá mặc định.
                                            </HelperText>
                                        </>
                                        : item.index === 1 ?
                                        <>
                                            <HelperTitle>Bảng giá theo giờ</HelperTitle>
                                            <HelperText mt0>
                                                Mỗi cửa hàng có thể sở hữu nhiều bảng giá theo giờ.
                                                <br/>Giờ hoạt động của các bảng giá theo giờ không được trùng nhau.
                                                <br/>Các sản phẩm trong bảng giá theo giờ có thể được cập nhật giá bán mới.
                                            </HelperText>
                                        </>
                                        : item.index === 2 ? 
                                        <HelperText>
                                            Khi đến giờ hoạt động của <b>bảng giá theo giờ</b>, nếu <b>"tích hợp bảng giá cơ bản"</b> được chọn, 
                                            <br/>các sản phẩm thuộc <b>bảng giá cơ bản</b> và nằm ngoài <b>bảng giá theo giờ</b> vẫn sẽ tiếp tục hoạt động.
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