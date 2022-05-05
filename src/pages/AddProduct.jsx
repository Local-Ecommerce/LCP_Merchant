/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { api } from "../RequestMethod";
import { toast } from 'react-toastify';
import * as Constant from '../Constant';
import { KeyboardBackspace, Warning, Help } from '@mui/icons-material';
import { TextField, InputAdornment, Checkbox, FormControlLabel } from '@mui/material';
import ProductOption from '../components/Product/ProductOption';
import ImageUpload from '../components/Product/ImageUpload';
import CategoryList from '../components/Product/CategoryList';
import imageCompression from 'browser-image-compression';

import { db } from "../firebase";
import { ref, push } from "firebase/database";

const PageWrapper = styled.div`
    min-width: 600px;
    max-width: 900px;
    margin: 50px auto;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.spacebetween ? "space-between" : null};
    margin-top: ${props => props.mt ? "20px" : null};
`;

const StyledBackIcon = styled(KeyboardBackspace)`
    && {
        color: #727272;
        padding: 5px;
        border: 1px solid #727272;
        border-radius: 4px;
    }
`;

const TitleGrey = styled.span`
    color: #727272;
`;

const Title = styled.h1`
    font-size: 16px;
    color: #383838;
    margin: 20px;
`;

const ContainerWrapper = styled.div`
    padding: ${props => props.p0 ? "30px 30px 1px 30px" : "30px 30px"};
    padding-top: ${props => props.pt0 ? "10px" : null};
    padding-bottom: ${props => props.pb0 ? "10px" : null};
    margin-bottom: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: #fff;
    border-radius: 5px;
    border: ${props => props.error ? "2px solid " + props.theme.red : null};
`;

const StyledTextFieldMb = styled(TextField)`
    && {
    margin-bottom: 30px;
    }
`;

const FormLabel = styled.div`
    font-weight: 700;
    margin-bottom: 10px;
`;

const FooterWrapper = styled.div`
    border-top: 1px solid #d6d6d6;
    padding-top: 20px;
    height: 100px;
`;

const FloatRight = styled.div`
    float: right;
    display: flex;
    align-items: center;
`;

const StyledWarningIcon = styled(Warning)`
    && {
        font-size: 22px;
        color: ${props => props.error ? props.theme.red : props.theme.orange};
        opacity: 0.9;
    }
`;

const HelperText = styled.div`
    margin-left: ${props => props.ml0 ? "0px" : "30px"};
    align-items: center;
    text-decoration: none;
    font-size: 13px;
    margin-top: ${props => props.error || props.mt ? "10px" : "0px"};
    margin-bottom: ${props => props.mb30 ? "30px" : props.mb ? "15px" : "0px"};
    color: ${props => props.error ? props.theme.red : "#727272"};
`;

const WarningText = styled.span`
    font-size: 14px;
    padding: 5px;
    font-weight: 600;
    color: ${props => props.error ? props.theme.red : props.theme.orange};
    opacity: 0.9;
    margin-right: 20px;
`;

const Button = styled.button`
    display: inline-block;
    border-radius: 5px;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border: 1px solid ${props => props.disabled ? props.theme.disabled : props.white ? props.theme.greyBorder : props.theme.blue};
    background-color: ${props => props.disabled ? props.theme.disabled : props.white ? "white" : props.theme.blue};
    color: ${props => props.white ? props.theme.grey : "white"};
    font-weight: 600;

    &:active {
    transform: translateY(1px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const OptionLabel = styled.div`
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: 10px;
    font-size: 14px;
`;

const VariantWrapper = styled.div`
    font-size: 14px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dee2e6;
    text-decoration: none;
    cursor: pointer;
    background-color: #fff;

    &:hover {
    opacity: 0.9;
    background-color: #F5F5F5;
    }

    &:focus {
    outline: 0;
    }

    &:active {
    transform: translateY(1px);
    }
`;

const CombinationListWrapper = styled.div`
    margin-top 20px;
    width: 65%;
`;

const TextWrapper = styled.div`
    flex: ${props => props.isBaseMenu ? "11" : "8"};
    width: 1px; //constraint width
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0px 20px;
    display: flex;
    align-items: center;
`;

const PriceWrapper = styled.div`
    flex: 3;
    display: flex;
    justify-content: center;
    margin-right: 15px;
    opacity: ${props => props.disabled ? "0" : null};
`;

const Currency = styled.span`
    font-size: 14px;
    padding: 5px;
    color: #999;
    border: 1px solid ${props => props.error ? props.theme.red : "#ccc"};
    border-radius: 0 3px 3px 0;
    background: rgba(0,0,0,0.01);
`;

const PriceField = styled.input`
    width: 100%;
    padding: 5px;
    outline: none;
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.greyBorder};
    border-right: 0;
    border-radius: 3px 0 0 3px;
    font-size: 14px;
    background-color: ${props => props.theme.white};
    color: ${props => props.grey ? "#BEBEBE" : props.theme.black};
`;

const SmallLabel = styled.div`
    margin-top: ${props => props.mt ? "13px" : "0px"};
    margin-bottom: 7px;
    font-size: 13px;
    color: #6c6c6c;
`;

const FlexibleTextField = styled(TextField)`
    && {
        width: ${props => props.width};
    }
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
`;

const StyledHelpIcon = styled(Help)`
    && {
        font-size: 22px;
        color: ${props => props.theme.grey};
        opacity: 0.5;
        cursor: pointer;

        &:hover {
            opacity: 1.0;
        }
    }
`;

const StoreMessage = styled.div`
    font-size: 14px;
    color: ${props => props.theme.orange};
    margin-bottom: 5px;
`;

const AddProduct = () => {    
    let navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('USER'));
    const [processing, setProcessing] = useState(false);

    const [input, setInput] = useState({ 
        name: '', 
        description: '', 
        shortDescription: '', 
        category: {lv1: '', lv2: '', lv3: ''}, 
        price: '', 
        colors: [], 
        sizes: [], 
        weights: [], 
        code: '',
        toBaseMenu: true,
        quantity: 0,
        maxBuy: 1,
        applyBasePrice: false
    });
    const [combination, setCombination] = useState([]);
    const [combiChange, setcombiChange] = useState(false);
    const [images, setImages] = useState([ { name: 0, image: '' } ]);
    const [error, setError] = useState({ 
        name: '', 
        category: '', 
        price: '', 
        image: '', 
        colors: '', 
        sizes: '', 
        weights: '', 
        optionPrice: '',
        maxBuy: '',
        quantity: ''
    });

    const sort = '+syscategoryname';
    const [lv1Category, setLv1Category] = useState([]);
    const [lv2Category, setLv2Category] = useState([]);
    const [lv3Category, setLv3Category] = useState([]);

    useEffect(() => {   //set systemCategory level 1
        let url = "categories"
                + "?status=" + 3001
                + "&sort=" + sort;
        const fetchData = () => {
            api.get(url)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    setLv1Category(res.data.Data.List.filter((item) => {
                        return item.CategoryLevel === 1;
                    }));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
        setError(error => ({ ...error, [name]: '' }));
    };

    function handleToggleToBaseMenu(e) {
        const { checked } = e.target;
        setInput(input => ({ ...input, toBaseMenu: checked }));
    }

    const saveOption = (option, data) => {
        setError(error => ({ ...error, [option]: '' }));
        setError(error => ({ ...error, optionPrice: '' }));
        setInput(input => ({ ...input, [option]: data }));
        setcombiChange(!combiChange);
    }

    const handleSetPrice = (e) => {
        setError(error => ({ ...error, price: '' }));
        const { value } = e.target;

        if (value.replace(/\D/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").length + 1 <= 11) {
            setInput(input => ({ ...input, price: value.replace(/\D/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }));
        }
        if (input.applyBasePrice) {
            setCombination(combination.map((combination) => {
                return Object.assign({}, combination, {
                    price: input.price
                })
            }));
        }
    }

    const handleSetMaxBuy = (e) => {
        setError(error => ({ ...error, maxBuy: '' }));
        const { value } = e.target;

        let pattern = /^([0-9]*)$/;
        if (value.length + 1 <= 4 && pattern.test(value)) {
            setInput(input => ({ ...input, maxBuy: value}));
        }
    }

    const handleSetQuantity = (e) => {
        setError(error => ({ ...error, quantity: '' }));
        const { value } = e.target;

        let pattern = /^([0-9]*)$/;
        if (value.length + 1 <= 8 && pattern.test(value)) {
            setInput(input => ({ ...input, quantity: value}));
        }
    }

    const handleSetOptionPrice = (e, color, size, weight) => {
        setError(error => ({ ...error, optionPrice: '' }));
        const { value } = e.target;

        if (value.replace(/\D/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").length + 1 <= 11) {
            let newCombination = [...combination];
            let index = newCombination.findIndex(obj => obj.color === color && obj.size === size && obj.weight === weight);
            let inputPrice = value.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            newCombination[index] = { color: color, size: size, weight: weight, price: inputPrice, error: '' };
            setCombination(newCombination);
        };
    }

    useEffect(() => {
        const colors = input.colors.length ? input.colors : [{ value: null }];
        const sizes = input.sizes.length ? input.sizes : [{ value: null }];
        const weights = input.weights.length ? input.weights : [{ value: 0 }];

        if (!(colors.length === 1 && colors[0].value === null 
        && sizes.length === 1 && sizes[0].value === null 
        && weights.length === 1 && weights[0].value === 0)) {
            const newCombination = sizes.map(size => { 
                return colors.map(color => {
                    return weights.map(weight => {
                        return {
                            color: color.value, size: size.value, weight: weight.value, price: '', error: ''
                        }
                    })
                }).reduce((total, value) => {
                    return total.concat(value);
                }, [])
            }).reduce((total, value) => {
                return total.concat(value);
            }, []);

            const sameCombination = combination.filter(
                o1 => newCombination.some(o2 => o1.color === o2.color && o1.size === o2.size && o1.weight === o2.weight));

            sameCombination.forEach((item) => {
                let index = newCombination.findIndex(obj => obj.color === item.color && obj.size === item.size && obj.weight === item.weight);
                newCombination[index] = { color: item.color, size: item.size, weight: item.weight, price: item.price, error: '' };
            });
            setCombination(newCombination);
        } else {
            setCombination([]);
        };
        setInput(input => ({ ...input, applyBasePrice: false }));
    }, [combiChange]);

    function handleToggleApplyBasePrice(e) {
        const { checked } = e.target;
        setError(error => ({ ...error, optionPrice: '' }));
        setInput(input => ({ ...input, applyBasePrice: checked }));
    }

    useEffect(() => {
        if (input.applyBasePrice && combination && combination.length) {
            setCombination(combination.map((combination) => {
                return Object.assign({}, combination, {
                    price: input.price
                })
            }));
        }
    }, [input.price, input.applyBasePrice]);

    const editOption = (option, display) => {
        if (display) {
            setError(error => ({ ...error, [option]: '' }));
        } else {
            setError(error => ({ ...error, [option]: 'Bạn có tùy chọn chưa lưu!' }));
        }
        setInput(input => ({ ...input, [option]: [] }));
    }

    const handleGetCategoryLv1 = (id) => {
        setError(error => ({ ...error, category: '' }));
        setInput(input => ({ ...input, category: {lv1: id, lv2: '', lv3: ''} }));
        setLv2Category(lv1Category.filter((item) => {
            return item.SystemCategoryId === id;
        })[0].Children);
        setLv3Category([]);
        setError(error => ({ ...error, category: '' }));
    }

    const handleGetCategoryLv2 = (id) => {
        setInput(input => ({ ...input, category: {lv1: input.category.lv1, lv2: id, lv3: ''} }));
        setLv3Category(lv2Category.filter((item) => {
            return item.SystemCategoryId === id;
        })[0].Children);
    }

    const handleGetCategoryLv3 = (id) => {
        setInput(input => ({ ...input, category: {lv1: input.category.lv1, lv2: input.category.lv2, lv3: id} }));
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleSetImage = async (e) => {
        setError(error => ({ ...error, image: '' }));
        const { name } = e.target;
        const [file] = e.target.files;
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 640,
            fileType: "image/jpg"
        }
        if (file) {
            const compressedFile = await imageCompression(file, options);
            let base64 = await toBase64(compressedFile);

            let newImages = [...images];
            let index = newImages.findIndex(obj => parseInt(obj.name) === parseInt(name));
            newImages[index] = { name: name, image: base64.toString() };
            setImages(newImages);
        }
    };

    const handleRemoveImage = (name) => {
        setError(error => ({ ...error, image: '' }));
        let newImages = [...images];
        let index = newImages.findIndex(obj => parseInt(obj.name) === parseInt(name));
        newImages[index] = { name: name, image: '' };
        setImages(newImages);
    };

    const handleAddItem = (event) => {
        event.preventDefault();
        if (validCheck()) {
            setProcessing(true);
            const notification = toast.loading("Đang xử lí yêu cầu...");
            const addData = async () => {                
                api.post("products", {
                    productCode: input.code,
                    productName: input.name,
                    briefDescription: input.shortDescription,
                    description: input.description,
                    defaultPrice: input.price.replace(/\D/g, ""),
                    systemCategoryId: input.category.lv3 ? input.category.lv3 : input.category.lv2 ? input.category.lv2 : input.category.lv1,
                    image: images.filter(item => item.image !== '').map(item => item.image.split(',')[1]),
                    toBaseMenu: input.toBaseMenu,
                    quantity: input.quantity,
                    maxBuy: input.maxBuy,
                    relatedProducts: 
                        combination.length === 0 ? [] : combination.map(combination => {
                            return {
                                defaultPrice: combination.price.replace(/\D/g, ""),
                                size: combination.size,
                                color: combination.color,
                                weight: combination.weight,
                                systemCategoryId: input.category.lv3 ? input.category.lv3 : input.category.lv2 ? input.category.lv2 : input.category.lv1,
                                image: []
                            }
                        })
                    ,
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        push(ref(db, `Notification/` + user.Residents[0].ApartmentId), {
                            createdDate: Date.now(),
                            data: {
                                name: input.name
                            },
                            read: 0,
                            receiverId: user.Residents[0].ApartmentId,
                            senderId: user.Residents[0].ResidentId,
                            type: '003'
                        });
                        navigate("/products");
                        toast.update(notification, { render: "Tạo sản phẩm thành công!", type: "success", autoClose: 5000, isLoading: false });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    setProcessing(false);
                    toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
                });
            };
            addData();
        } else {
            setProcessing(false);
        }
    }

    const validCheck = () => {
        let check = false;
        setError(error => ({ ...error, name: '', colors: '', sizes: '', weights: '', category: '', price: '', optionPrice: '' }));

        if (input.name === null || input.name === '') {
            setError(error => ({ ...error, name: 'Vui lòng nhập tên sản phẩm' }));
            check = true;
        }
        if (input.category.lv1 === null || input.category.lv1 === '') {
            setError(error => ({ ...error, category: 'Vui lòng chọn danh mục sản phẩm' }));
            check = true;
        }
        if (input.price === null || input.price === '' || parseFloat(input.price.replace(/\D/g, "")) < 1000) {
            setError(error => ({ ...error, price: 'Vui lòng nhập giá trên 1000 vnđ' }));
            check = true;
        }
        if (images[0].image === '') {
            setError(error => ({ ...error, image: 'Xin hãy chọn ảnh bìa cho sản phẩm' }));
            check = true;
        }
        combination.forEach((item) => {
            if (item.price === '' || item.price === null || parseFloat(item.price.replace(/\D/g, "")) < 1000) {
                let newCombination = [...combination];
                let index = newCombination.findIndex(obj => obj.color === item.color && obj.size === item.size && obj.weight === item.weight);
                let error = "Vui lòng nhập giá tùy chọn trên 1000 vnđ";
                newCombination[index] = { color: item.color, size: item.size, weight: item.weight, price: item.price, error: error };
                setCombination(newCombination);

                setError(error => ({ ...error, optionPrice: 'Vui lòng nhập giá tùy chọn trên 1000 vnđ' }));
                check = true;
            }
        })
        if (input.maxBuy === null || input.maxBuy === '' || parseInt(input.maxBuy) >= 1000) {
            setError(error => ({ ...error, maxBuy: 'Vui lòng nhập hạn mức mua' }));
            check = true;
        }
        if (input.quantity === null || input.quantity === '' || parseInt(input.quantity) >= 9999999) {
            setError(error => ({ ...error, quantity: 'Vui lòng nhập số lượng' }));
            check = true;
        }
        if (check) {
            return false;
        }

        return true;
    }

    return (
        <PageWrapper>
            {
                user.Residents[0].Status === Constant.UNVERIFIED_RESIDENT ? 
                <StoreMessage>Tài khoản của bạn đang được xác thực bởi người quản lí chợ, vui lòng chờ đợi...</StoreMessage> 
                : null
            }

            <Row>
                <Link to="/products"><StyledBackIcon /></Link>
                <Title><TitleGrey>Danh sách sản phẩm </TitleGrey>/ Tạo mới sản phẩm</Title>
            </Row>
            
            <form onSubmit={handleAddItem} id="form">
                <ContainerWrapper>
                    <Row spacebetween>
                        <FormLabel>Tên sản phẩm</FormLabel>
                        <HelperText ml0>{input.name.length}/100 kí tự</HelperText>
                    </Row>
                    
                    <StyledTextFieldMb
                        fullWidth placeholder="Ví dụ: Bánh mì 2 trứng" 
                        inputProps={{ maxLength: 100, style: {fontSize: 14} }} 
                        value={input.name ? input.name : ''} name='name'
                        onChange={handleChange}
                        error={error.name !== ''}
                        helperText={error.name}
                    />

                    <Row spacebetween>
                        <FormLabel>Mã sản phẩm</FormLabel>
                        <HelperText ml0>{input.code.length}/200 kí tự</HelperText>
                    </Row>
                    
                    <TextField
                        fullWidth placeholder="Ví dụ: AP-001" 
                        inputProps={{ maxLength: 200, style: {fontSize: 14} }}
                        value={input.code ? input.code : ''} name='code'
                        onChange={handleChange}
                    />
                    <HelperText mt ml0 mb30>
                        Mã sản phẩm giúp người bán dễ dàng quẩn lí sản phẩm của mình. Để trống nếu bạn không rõ.
                    </HelperText>

                    <Row spacebetween>
                        <FormLabel>Mô tả chi tiết</FormLabel>
                        <HelperText ml0>{input.description.length}/500 kí tự</HelperText>
                    </Row>

                    <StyledTextFieldMb
                        fullWidth multiline rows={4}
                        placeholder="Khách hàng sẽ thấy mô tả này khi họ vào xem chi tiết sản phẩm." 
                        inputProps={{ maxLength: 500, style: {fontSize: 14} }}
                        value={input.description} name='description'
                        onChange={handleChange}
                    />

                    <Row spacebetween>
                        <FormLabel>Mô tả ngắn gọn</FormLabel>
                        <HelperText ml0>{input.shortDescription.length}/500 kí tự</HelperText>
                    </Row>

                    <TextField
                        fullWidth multiline rows={2}
                        placeholder="Khách hàng sẽ thấy mô tả này khi họ nhấn xem sản phẩm." 
                        inputProps={{ maxLength: 500, style: {fontSize: 14} }}
                        value={input.shortDescription} name='shortDescription'
                        onChange={handleChange}
                    />
                </ContainerWrapper>

                <ContainerWrapper>
                    <FormLabel>Danh mục</FormLabel>

                    <Row spacebetween mt>
                        <CategoryList currentItems={lv1Category} selected={input.category.lv1} handleGetCategory={handleGetCategoryLv1} />
                        <CategoryList currentItems={lv2Category} selected={input.category.lv2} handleGetCategory={handleGetCategoryLv2} />
                        <CategoryList currentItems={lv3Category} selected={input.category.lv3} handleGetCategory={handleGetCategoryLv3} />
                    </Row>
                    <HelperText error={1}> {error.category} </HelperText>
                </ContainerWrapper>


                <ContainerWrapper p0>
                    <FormLabel>Hình ảnh</FormLabel>
                    <HelperText ml0 mb error={1}>{error.image}</HelperText>

                    <ImageUpload
                        images={images}
                        setImages={setImages}
                        handleSetImage={handleSetImage}
                        handleRemoveImage={handleRemoveImage}
                    />
                </ContainerWrapper>


                <ContainerWrapper>
                    <FormLabel>Tùy chọn</FormLabel>
                    <OptionLabel>Thêm các tùy chọn của sản phẩm, như màu sắc, kích thước hay trọng lượng</OptionLabel>
                    
                    <ProductOption savedData={input.colors} type='colors' saveOption={saveOption} editOption={editOption} />
                    <ProductOption savedData={input.sizes} type='sizes' saveOption={saveOption} editOption={editOption} />
                    <ProductOption savedData={input.weights} type='weights' saveOption={saveOption} editOption={editOption} />
                </ContainerWrapper>

                <ContainerWrapper>
                    <FormLabel>Giá mặc định</FormLabel>
                    <FlexibleTextField
                        width={"65%"}
                        InputProps={{ style: {fontSize: 14}, startAdornment: <InputAdornment position="start">vnđ</InputAdornment> }}
                        value={input.price} name='price'
                        onChange={handleSetPrice}
                        error={error.price !== ''}
                        helperText={error.price}    
                    />

                    {
                        combination && combination.length ?
                        <CombinationListWrapper>
                            
                            <FormControlLabel 
                                checked={input.applyBasePrice} name='applyBasePrice' 
                                onChange={handleToggleApplyBasePrice} 
                                control={<Checkbox />} 
                                label={<span style={{ fontSize: '14px' }}>Áp dụng giá mặc định vào toàn bộ tùy chọn sản phẩm.</span>} 
                            />

                            <HelperText error={1}> {error.optionPrice} </HelperText>
                            {combination.map((item, index) => {
                                return <VariantWrapper key={index}>
                                    <TextWrapper>
                                        {item.color ? item.color : ''}
                                        {item.color && (item.size || item.weight) ? " / " : ''}
                                        {item.size ? item.size : ''}
                                        {item.size && item.weight ? " / " : ''}
                                        {item.weight ? item.weight + "kg " : ''}
                                    </TextWrapper>

                                    <PriceWrapper>
                                        <PriceField 
                                            type="text" disabled={input.applyBasePrice}
                                            value={item.price} name='price'
                                            onChange={(e) => handleSetOptionPrice(e, item.color, item.size, item.weight)}
                                            error={item.error !== ''}
                                        />
                                        <Currency error={item.error !== ''}>đ</Currency>
                                    </PriceWrapper>
                                </VariantWrapper>
                            })}
                        </CombinationListWrapper>
                        :
                        null
                    }
                </ContainerWrapper>

                <ContainerWrapper pt0={1} pb0={!input.toBaseMenu}>
                    <Flex>
                        <FormControlLabel 
                            checked={input.toBaseMenu} name='toBaseMenu' 
                            onChange={handleToggleToBaseMenu} 
                            control={<Checkbox />} 
                            label={<span style={{ fontSize: '14px' }}>Tự động thêm sản phẩm vào bảng giá cơ bản</span>} 
                        />
                        <StyledHelpIcon />
                    </Flex>

                    {
                        input.toBaseMenu ? 
                        <>
                            <SmallLabel mt>Hạn mức mua</SmallLabel>
                            <FlexibleTextField
                                size="small" width={"65%"}
                                InputProps={{ style: {fontSize: 14} }}
                                value={input.maxBuy} name='maxBuy'
                                onChange={handleSetMaxBuy}
                                error={error.maxBuy !== ''}
                                helperText={error.maxBuy}    
                            />

                            <SmallLabel mt>Số lượng</SmallLabel>
                            <FlexibleTextField
                                size="small" width={"65%"}
                                InputProps={{ style: {fontSize: 14} }}
                                value={input.quantity} name='quantity'
                                onChange={handleSetQuantity}
                                error={error.quantity !== ''}
                                helperText={error.quantity}    
                            />
                        </>
                        : null
                    }
                </ContainerWrapper>

                <FooterWrapper>
                    <FloatRight>
                        {
                            user.Residents[0].Status === Constant.UNVERIFIED_RESIDENT ?
                            <>
                                <StyledWarningIcon />
                                <WarningText>Tài khoản của bạn đang được xác thực bởi người quản lí chợ, vui lòng chờ đợi</WarningText>
                                <Button disabled>Tạo mới</Button>
                            </>
                            :
                            (error.colors !== '' || error.sizes !== '' || error.weights !== '') ?
                            <>
                                <StyledWarningIcon />
                                <WarningText>Bạn có tùy chọn chưa lưu!</WarningText>
                                <Button disabled>Tạo mới</Button>
                            </>
                            : (error.name !== '' || error.category !== '' || error.price !== '' || error.optionPrice || error.image || error.maxBuy || error.quantity) ?
                            <>
                                <StyledWarningIcon error />
                                <WarningText error={1}>Bạn có thông tin chưa điền!</WarningText>
                                <Button disabled>Tạo mới</Button>
                            </>
                            :
                            <Button disabled={processing}>Tạo mới</Button>
                        }
                    </FloatRight>
                </FooterWrapper>
            </form>
        </PageWrapper>
    )
}

export default AddProduct;