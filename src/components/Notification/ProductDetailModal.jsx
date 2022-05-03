/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { api } from "../../RequestMethod";
import { Palette, SquareFoot, Scale } from '@mui/icons-material';

const ModalContentWrapper = styled.div`
    border-bottom: 1px solid #cfd2d4;
    padding: 0;
    display: flex;
    justify-content: center;
`;

const LeftWrapper = styled.div`
    flex: 1;
    padding: 30px 30px 30px 40px;
`;

const RightWrapper = styled.div`
    flex: 1;
    padding: 30px 40px 30px 0px;
    max-height: 50vh;
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

const BigImageWrapper = styled.div`
    width: 100%;
    padding-top: 100%;
    position: relative;
    margin-bottom: 15px;
    border: 1px solid rgba(0,0,0,0.2);
`;

const SmallImageWrapper = styled.div`
    width: 100%;
`;

const SmallImageScroller = styled.div`
    overflow: auto;
    width: 100%;
    display: flex;
    align-items: center;
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

const SmallImage = styled.img`
    object-fit: contain;
    width: 15%;
    height: 15%;
    max-width: 40px;
    max-height: 40px;
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0.2);
    margin-right: 5px;
    opacity: ${props => props.blur ? "0.4" : "1"};
`;

const ProductCode = styled.div`
    font-size: 16px;
    color: ${props => props.theme.grey};
    margin: 5px 0;
`;

const ProductName = styled.div`
    font-size: 28px;
    font-weight: 600;
`;

const ProductCategory = styled.div`
    font-size: 16px;
    color: ${props => props.theme.grey};
    margin: 5px 0;
`;

const ProductPrice = styled.div`
    font-size: 28px;
    font-weight: 600;
    color: ${props => props.theme.red};
    margin: 20px 0;
`;

const Label = styled.div`
    font-size: 18px;
    font-weight: 600;
`;

const ProductDescription = styled.div`
    font-size: 14px;
    color: ${props => props.theme.grey};
    margin: 10px;
`;

const OptionWrapper = styled.div`
    margin: 20px 0;
`;

const Option = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin: 10px 0;
`;

const OptionLabel = styled.div`
    font-size: 14px;
    font-weight: 600;
    margin-right: 5px;
`;

const OptionName = styled.div`
    font-size: 14px;
`;

const StyledColorIcon = styled(Palette)`
    && {
        font-size: 16px;
        margin-right: 5px;
        color: ${props => props.theme.red};
    }
`;

const StyledSizeIcon = styled(SquareFoot)`
    && {
        font-size: 16px;
        margin-right: 5px;
        color: ${props => props.theme.red};
    }
`;

const StyledWeightIcon = styled(Scale)`
    && {
        font-size: 16px;
        margin-right: 5px;
        color: ${props => props.theme.red};
    }
`;

const DetailModal = ({ display, toggle, detailItem }) => {
    const [loading, setLoading] = useState(true);

    const [images, setImages] = useState([]);
    const [imageSrc, setImageSrc] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (display) {
            setLoading(true);
            setImages([]); setImageSrc(''); setCategory('');

            let imageList = detailItem.BaseProduct.Image.split("|").filter(item => item).map((item) => (
                { image: item }
            ));
            setImages(imageList);
            setImageSrc(imageList.length ? imageList[0].image : '');

            api.get("categories?id=" + detailItem.SystemCategoryId + "&include=parent")
            .then(function (res) {
                setCategory(res.data.Data.List[0].SysCategoryName);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
        }
    }, [display]);

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalContentWrapper>
                <LeftWrapper>
                    <BigImageWrapper>
                        <Image src={imageSrc} />
                    </BigImageWrapper>

                    <SmallImageWrapper>
                        <SmallImageScroller>
                        {
                            images.map((item, index) => {
                                return <SmallImage key={index}
                                    src={item.image} blur={item.image !== imageSrc} 
                                    onClick={() => setImageSrc(item.image)} 
                                />
                            })
                        }
                        </SmallImageScroller>
                    </SmallImageWrapper>                  
                </LeftWrapper>

                <RightWrapper>
                    <ProductCode>{loading ? '' : detailItem.BaseProduct.ProductCode}</ProductCode>
                    <ProductName>{loading ? '' : detailItem.BaseProduct.ProductName}</ProductName>
                    <ProductCategory>{loading ? '' : category}</ProductCategory>
                    <ProductPrice>{loading ? '' : detailItem.DefaultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</ProductPrice>
                    <Label>Miêu tả</Label>
                    <ProductDescription>{loading ? '' : detailItem.BaseProduct.Description}</ProductDescription>
                    <ProductDescription>{loading ? '' : detailItem.BaseProduct.BriefDescription}</ProductDescription>

                    {
                        detailItem.Color || detailItem.Size || detailItem.Weight ?
                        <OptionWrapper>
                            {
                                detailItem.Color ?
                                <Option>
                                    <StyledColorIcon />
                                    <OptionLabel>Màu sắc:</OptionLabel>
                                    <OptionName>{detailItem.Color}</OptionName>
                                </Option>
                                : null
                            }

                            {
                                detailItem.Size ?
                                <Option>
                                    <StyledSizeIcon />
                                    <OptionLabel>Kích thước:</OptionLabel>
                                    <OptionName>{detailItem.Size}</OptionName>
                                </Option>
                                : null
                            }

                            {
                                detailItem.Weight ?
                                <Option>
                                    <StyledWeightIcon />
                                    <OptionLabel>Trọng lượng:</OptionLabel>
                                    <OptionName>{detailItem.Weight} kg</OptionName>
                                </Option>
                                : null
                            }
                        </OptionWrapper>
                        : null
                    }
                </RightWrapper>
            </ModalContentWrapper>

            <ModalButtonWrapper>
                <Invisible />
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default DetailModal;