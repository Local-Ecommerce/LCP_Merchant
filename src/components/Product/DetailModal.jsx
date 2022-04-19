/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { api } from "../../RequestMethod";
import { toast } from 'react-toastify';
import { Palette, SquareFoot, Scale, RemoveCircle, CheckCircle, ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

import MenuInProductDetailItem from './MenuInProductDetailItem';
import DeleteModal from './DeleteModal';

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
        right: '35%',
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

const Align = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.spacebetween ? "space-between" : null};
    border-bottom: ${props => props.spacebetween ? "1px solid rgba(0,0,0,0.1)" : null};
    cursor: ${props => props.spacebetween ? "pointer" : null};
    margin-top: ${props => props.mt ? "20px" : null};

    &:hover {
        opacity: ${props => props.spacebetween ? "0.7" : null};
    }
`;

const MenuLabel = styled.div`
    font-size: 15px;
    font-weight: 600;
`;

const StyledNoMenuIcon = styled(RemoveCircle)`
    && {
        font-size: 16px;
        margin-right: 5px;
        color: ${props => props.theme.red};
    }
`;

const StyledCheckIcon = styled(CheckCircle)`
    && {
        font-size: 16px;
        margin-right: 5px;
        color: ${props => props.theme.green};
    }
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
    const [loading, setLoading] = useState(false);
    const [change, setChange] = useState(false);

    const [item, setItem] = useState({});
    const [images, setImages] = useState([]);
    const [imageSrc, setImageSrc] = useState('');
    const [prices, setPrices] = useState([]);
    const [category, setCategory] = useState('');
    const [menus, setMenus] = useState([]);

    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [weights, setWeights] = useState([]);
    const [selected, setSelected] = useState({ id: '', color: null, size: null, weight: 0, price: '' });

    const [dropdown, setDropdown] = useState(false);
    const toggleDropdown = () => { setDropdown(!dropdown); }

    const [deleteItem, setDeleteItem] = useState({id: '', name: '', type: ''});
    const [deletePimModal, setDeletePimModal] = useState(false);
    const toggleDeletePimModal = () => { setDeletePimModal(!deletePimModal) };

    useEffect(() => {
        if (display) {
            setLoading(true);
            setImages([]); setImageSrc(''); setPrices([]); setCategory('');
            setColors([]); setSizes([]); setWeights([]); setMenus([]);
            setDropdown(false);
            setSelected({ id: '', color: null, size: null, weight: 0, price: '' });

            const fetchData = async () => {
                api.get("products?id=" + detailItem.id + "&include=related")
                .then(function (res) {
                    setItem(res.data.Data.List[0]);

                    let imageList = res.data.Data.List[0].Image.split("|").filter(item => item).map((item) => (
                        { image: item }
                    ));
                    setImages(imageList);
                    setImageSrc(imageList.length ? imageList[0].image : '');
                    
                    if (res.data.Data.List[0].RelatedProducts.length > 0) {
                        setPrices(res.data.Data.List[0].RelatedProducts.map((item) => (item.DefaultPrice)));
        
                        setColors([...new Map(res.data.Data.List[0].RelatedProducts.map(({ Color }) => ({ 
                            value: Color
                        })).map(item => [item['value'], item])).values()].filter(item => (item.value))
                        .sort((a, b) => a.value.localeCompare(b.value)));
        
                        setSizes([...new Map(res.data.Data.List[0].RelatedProducts.map(({ Size }) => ({ 
                            value: Size
                        })).map(item => [item['value'], item])).values()].filter(item => (item.value))
                        .sort((a, b) => a.value.localeCompare(b.value)));
        
                        setWeights([...new Map(res.data.Data.List[0].RelatedProducts.map(({ Weight }) => ({ 
                            value: Weight
                        })).map(item => [item['value'], item])).values()].filter(item => (item.value))
                        .sort((a, b) => a.value - b.value));
                    } else {
                        setPrices([res.data.Data.List[0].DefaultPrice]);
                    }

                    api.get("categories?id=" + res.data.Data.List[0].SystemCategoryId + "&include=parent")
                    .then(function (res2) {
                        setCategory(res2.data.Data.List[0].SysCategoryName);

                        api.get("menus?productid=" + detailItem.id)
                        .then(function (res3) {
                            setMenus(res3.data.Data.List.filter(item => item.ProductInMenus.length));
                            setLoading(false);
                        })
                    })
                })
                .catch(function (error) {
                    console.log(error);
                    setLoading(false);
                });
            };
            fetchData();
        }
    }, [display, change]);

    const handleGetDeletePim = (id, name) => {
        setDeleteItem({id: id, name: name, type: 'pim'});
        toggleDeletePimModal();
    }

    const handleDeletePim = (e) => {
        e.preventDefault();

        const deletePim = async () => {
            const notification = toast.loading("Đang xử lí yêu cầu...");

            api.delete("menu-products", {
                data: [ deleteItem.id ]
            })
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    setChange(!change);
                    toast.update(notification, { render: "Xóa sản phẩm khỏi bảng giá thành công!", type: "success", autoClose: 5000, isLoading: false });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        };
        deletePim();
        toggleDeletePimModal();
    };

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
                    <ProductCode>{loading ? '' : item.ProductCode ? item.ProductCode : null}</ProductCode>
                    <ProductName>{loading ? '' : item.ProductName}</ProductName>
                    <ProductCategory>{loading ? '' : category}</ProductCategory>
                    
                    {
                        prices.length === 1 || (prices.length > 1 && Math.min(...prices) === Math.max(...prices)) ?
                        <ProductPrice>{prices[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ"}</ProductPrice>
                        : selected && selected.price !== '' ?
                        <ProductPrice>{selected.price} đ</ProductPrice>
                        : prices.length > 1 ?
                        <ProductPrice>
                            {Math.min(...prices).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ - "} 
                            {Math.max(...prices).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ"}
                        </ProductPrice>
                        : null
                    }
                    
                    <Label>Miêu tả</Label>
                    <ProductDescription>{loading ? '' : item.Description}</ProductDescription>
                    <ProductDescription>{loading ? '' : item.BriefDescription}</ProductDescription>

                    {
                        colors.length || sizes.length || weights.length ?
                        <OptionWrapper>
                            {
                                colors.length ?
                                <Option>
                                    <StyledColorIcon />
                                    <OptionLabel>Màu sắc:</OptionLabel>

                                    {colors.map((item, index) => {
                                        return (
                                            <OptionName key={index}>{index > 0 ? ', ' : null}{item.value}</OptionName>
                                        );
                                    })}
                                </Option>
                                : null
                            }

                            {
                                sizes.length ?
                                <Option>
                                    <StyledSizeIcon />
                                    <OptionLabel>Kích thước:</OptionLabel>

                                    {sizes.map((item, index) => {
                                        return (
                                            <OptionName key={index}>{index > 0 ? ', ' : null}{item.value}</OptionName>
                                        );
                                    })}
                                </Option>
                                : null
                            }

                            {
                                weights.length ?
                                <Option>
                                    <StyledWeightIcon />
                                    <OptionLabel>Trọng lượng:</OptionLabel>

                                    {weights.map((item, index) => {
                                        return (
                                            <OptionName key={index}>{index > 0 ? ', ' : null}{item.value} kg</OptionName>
                                        );
                                    })}
                                </Option>
                                : null
                            }
                        </OptionWrapper>
                        : null
                    }

                    {
                        menus.length ?
                        <>
                            <Align spacebetween mt onClick={toggleDropdown}>
                                <Align>
                                    <StyledCheckIcon />
                                    <MenuLabel>Sản phẩm đang thuộc {menus.length} bảng giá.</MenuLabel>
                                </Align>

                                {
                                    !dropdown ?
                                    <ArrowDropDown />
                                    : <ArrowDropUp />
                                }
                            </Align>

                            {
                                dropdown ?
                                <>{menus.map((menu, index) => {
                                    return <MenuInProductDetailItem 
                                        item={menu} 
                                        key={index}
                                        index={index}
                                        handleGetDeletePim={handleGetDeletePim}
                                    />
                                })}</>
                                : null
                            }
                        </>
                        :
                        <Align mt>
                            <StyledNoMenuIcon />
                            <MenuLabel>Sản phẩm không nằm trong bảng giá nào.</MenuLabel>
                        </Align>                        
                    }
                </RightWrapper>
            </ModalContentWrapper>

            <ModalButtonWrapper>
                <Invisible />
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
            </ModalButtonWrapper>

            <DeleteModal 
                display={deletePimModal}
                toggle={toggleDeletePimModal}
                deleteItem={deleteItem}
                handleDeleteItem={handleDeletePim}
            />
        </Modal>
    )
};

export default DetailModal;