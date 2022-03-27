/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from "react-router-dom";
import { api } from "../RequestMethod";
import { toast } from 'react-toastify';
import { KeyboardBackspace, Warning } from '@mui/icons-material';
import { TextField, InputAdornment, FormControlLabel, Radio, RadioGroup, Checkbox } from '@mui/material';
import imageCompression from 'browser-image-compression';
import ProductOption from '../components/Product/ProductOption';
import ImageUpload from '../components/Product/ImageUpload';
import CategoryList from '../components/Product/CategoryList';

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

const RadioLabel = styled.span`
    font-size: 14px;
`;

const StyledLink = styled.a`
    color: #007bff;
    cursor: pointer;
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
        color: ${props => props.theme.orange};
        opacity: 0.9;
    }
`;

const HelperText = styled.div`
    margin-left: ${props => props.ml0 ? "0px" : "30px"};
    align-items: center;
    text-decoration: none;
    font-size: ${props => props.error ? "13px" : "14px"};
    margin-top: ${props => props.error ? "10px" : "0px"};
    margin-bottom: ${props => props.mb ? "15px" : "0px"};
    color: ${props => props.error ? props.theme.red : "#727272"};
`;

const WarningText = styled.span`
    font-size: 14px;
    padding: 5px;
    font-weight: 600;
    color: ${props => props.theme.orange};
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

const EditProduct = () => {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('USER'));

    const [item, setItem] = useState({});
    const [input, setInput] = useState({ name: '', description: '', shortDescription: '', category: {lv1: '', lv2: '', lv3: ''}, price: 0, colors: [], sizes: [],  weights: [], code: '' });
    const [error, setError] = useState({ name: '', category: '', price: '', colors: '', image: '', sizes: '', weights: ''});

    const [combination, setCombination] = useState([ { id: '', color: null, size: null, weight: null } ]);
    const [currentImages, setCurrentImages] = useState([]);
    const [images, setImages] = useState([ { name: 0, image: '' } ]);

    const [type, setType] = useState('Khác');
    const [loading, setLoading] = useState(false);
    const sort = '+syscategoryname';

    const [lv1Category, setLv1Category] = useState([]);
    const [filteredLv1Category, setFilteredLv1Category] = useState([]);
    const [lv2Category, setLv2Category] = useState([]);
    const [lv3Category, setLv3Category] = useState([]);

    useEffect(() => {
        setLoading(true);

        const fetchData = () => {
            api.get("categories?status=3001&sort=" + sort)
            .then(function (res1) {
                if (res1.data.ResultMessage === "SUCCESS") {
                    setLv1Category(res1.data.Data.List.filter((item) => {
                        return item.CategoryLevel === 1;
                    }));

                    api.get("products?id=" + id + "&include=related")
                    .then(function (res2) {
                        if (res2.data.ResultMessage === "SUCCESS") {
                            setItem(res2.data.Data.List[0]);

                            let colorArray = [...new Map(res2.data.Data.List[0].RelatedProducts.map(({ Color }) => ({ 
                                value: Color, error: '', old: true
                            })).map(item => [item['value'], item])).values()].filter(item => (item.value))
                            .map((item, index) => ({ name: index, ...item }));

                            let sizeArray = [...new Map(res2.data.Data.List[0].RelatedProducts.map(({ Size }) => ({ 
                                value: Size, error: '', old: true
                            })).map(item => [item['value'], item])).values()].filter(item => (item.value))
                            .map((item, index) => ({ name: index, ...item }));

                            let weightArray = [...new Map(res2.data.Data.List[0].RelatedProducts.map(({ Weight }) => ({ 
                                value: Weight, error: '', old: true
                            })).map(item => [item['value'], item])).values()].filter(item => (item.value))
                            .map((item, index) => ({ name: index, ...item }));

                            setCombination(res2.data.Data.List[0].RelatedProducts.map((item) => ({ 
                                id: item.ProductId, color: item.Color, size: item.Size, weight: item.Weight
                            })));

                            let images = res2.data.Data.List[0].Image.split("|").map((item, index) => (
                                { name: index, image: item }
                            ));

                            setImages(images);
                            setCurrentImages(images);

                            setInput(input => ({
                                ...input,
                                code: res2.data.Data.List[0].ProductCode,
                                name: res2.data.Data.List[0].ProductName,
                                description: res2.data.Data.List[0].Description,
                                shortDescription: res2.data.Data.List[0].BriefDescription,
                                price: res2.data.Data.List[0].DefaultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                                status: res2.data.Data.List[0].Status,
                                colors: colorArray,
                                sizes: sizeArray,
                                weights: weightArray,
                            }));

                            api.get("categories?id=" + res2.data.Data.List[0].SystemCategoryId + "&include=parent")
                            .then(function (res3) {
                                if (res3.data.ResultMessage === "SUCCESS") {
                                    if (res3.data.Data.List[0].CategoryLevel === 3) {
                                        setInput(input => ({
                                            ...input,
                                            category: {
                                                lv1: res3.data.Data.List[0].Parent.BelongTo,
                                                lv2: res3.data.Data.List[0].Parent.SystemCategoryId,
                                                lv3: res3.data.Data.List[0].SystemCategoryId
                                            }
                                        }));
                                        let lv2CategoryList = res1.data.Data.List.filter((item) => {
                                            return item.SystemCategoryId === res3.data.Data.List[0].Parent.BelongTo;
                                        })[0].Children;
                                        setLv2Category(lv2CategoryList);
                                        setLv3Category(lv2CategoryList.filter((item) => {
                                            return item.SystemCategoryId === res3.data.Data.List[0].Parent.SystemCategoryId;
                                        })[0].Children);
                                    } else if (res3.data.Data.List[0].CategoryLevel === 2) {
                                        setInput(input => ({
                                            ...input,
                                            category: {
                                                lv1: res3.data.Data.List[0].Parent.SystemCategoryId,
                                                lv2: res3.data.Data.List[0].SystemCategoryId,
                                                lv3: ''
                                            }
                                        }));
                                        let lv2CategoryList = res1.data.Data.List.filter((item) => {
                                            return item.SystemCategoryId === res3.data.Data.List[0].Parent.SystemCategoryId;
                                        })[0].Children;
                                        setLv2Category(lv2CategoryList);
                                    } else if (res3.data.Data.List[0].CategoryLevel === 1) {
                                        setInput(input => ({
                                            ...input,
                                            category: {
                                                lv1: res3.data.Data.List[0].SystemCategoryId,
                                                lv2: '',
                                                lv3: ''
                                            }
                                        }));
                                    }
                                    setType(res3.data.Data.List[0].Type);
                                    setLoading(false);
                                }
                            })
                        }
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
        }
        fetchData();
    }, []);

    useEffect(() => {   //filter based on category type
        const result = lv1Category.filter((item) => {
            return item.Type === type;
        })
        setFilteredLv1Category(result);
    }, [type, lv1Category]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
        setError(error => ({ ...error, [name]: '' }));
    };

    const handleSetPrice = (e) => {
        const { value } = e.target;
        if (value.replace(/\D/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").length + 1 <= 12) {
            setInput(input => ({ ...input, price: value.replace(/\D/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }));
        }
        setError(error => ({ ...error, price: '' }));
    }

    const handleSetType = (e) => {
        const { value } = e.target;
        setType(value);
        setLv2Category([]);
        setLv3Category([]);
    };

    const saveOption = (option, data) => {
        setError(error => ({ ...error, [option]: '' }));
        setInput(input => ({ ...input, [option]: data }));
    }

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
            const base64 = await toBase64(compressedFile);

            let newImages = [...images];
            let index = newImages.findIndex(obj => parseInt(obj.name) === parseInt(name));

            if (images.filter(item => item.image === base64.toString()).length === 0) {
                newImages[index] = { name: name, image: base64.toString() };
                setImages(newImages);
            } else {
                setError(error => ({ ...error, image: 'Ảnh trùng. Vui lòng chọn ảnh khác.' }));
            }
        }
    };

    const handleRemoveImage = (name) => {
        setError(error => ({ ...error, image: '' }));
        let newImages = [...images];
        let index = newImages.findIndex(obj => parseInt(obj.name) === parseInt(name));
        newImages[index] = { name: name, image: '' };
        setImages(newImages);
    };
    
    useEffect(() => {
        console.log(currentImages)
        console.log(images)
        let difference = currentImages.filter(o1 => !images.some(o2 => o1.image === o2.image))
        .concat(images.filter(o1 => !currentImages.some(o2 => o1.image === o2.image)))
        .filter(item => item.image !== '').map(item => item.image.includes(',') ? item.image.split(',')[1] : item.image)
        console.log(difference)
        //console.log(images.filter(item => item.image !== '').map(item => item.image.includes(',') ? item.image.split(',')[1] : item.image))
    }, [images])

    const handleEditItem = (event) => {
        event.preventDefault();

        if (checkValid()) {
            let newCombination = [];
            const arrayColors = input.colors.length ? input.colors : [{ value: null }];
            const arraySizes = input.sizes.length ? input.sizes : [{ value: null }];
            const arrayWeights = input.weights.length ? input.weights : [{ value: 0 }];
            
            arrayColors.forEach((color) => {
                arraySizes.forEach((size) => {
                    arrayWeights.forEach((weight) => {
                        newCombination.push({ id: null, color: color.value, size: size.value, weight: parseInt(weight.value) })
                    })
                })
            })
            const combinationDifference = newCombination.filter(
                    o1 => !combination.some(o2 => o1.color === o2.color && o1.size === o2.size && o1.weight === o2.weight))
                .concat(combination.filter(
                    o1 => !newCombination.some(o2 => o1.color === o2.color && o1.size === o2.size && o1.weight === o2.weight)
                )
            );

            let deleteArray = [];
            let insertArray = [];

            combinationDifference.forEach((item) => {
                if (item.id !== null) {
                    deleteArray.push(item.id);
                } else {
                    insertArray.push({
                        productCode: input.code,
                        productName: input.name,
                        briefDescription: input.shortDescription,
                        description: input.description,
                        defaultPrice: input.price.replace(/\D/g, ""),
                        size: item.size,
                        color: item.color,
                        weight: item.weight,
                        systemCategoryId: input.category.lv3 ? input.category.lv3 : input.category.lv2 ? input.category.lv2 : input.category.lv1,
                        image: []
                    });
                }
            });

            const imageDifference = currentImages.filter(o1 => !images.some(o2 => o1.image === o2.image))
            .concat(images.filter(o1 => !currentImages.some(o2 => o1.image === o2.image)))
            .filter(item => item.image !== '').map(item => item.image.includes(',') ? item.image.split(',')[1] : item.image);

            let APIarray = [];
            if (item.ProductCode !== input.code 
                || item.ProductName !== input.name 
                || item.Description !== input.description
                || item.BriefDescription !== input.shortDescription
                || item.DefaultPrice.toString().replace(/\D/g, "") !== input.price.replace(/\D/g, "")
                || imageDifference.length
            ) {
                if (imageDifference.length) {
                    APIarray.push(api.put("products", {
                        products: [
                            {
                                productCode: input.code,
                                productName: input.name,
                                briefDescription: input.shortDescription,
                                description: input.description,
                                defaultPrice: input.price.replace(/\D/g, ""),
                                systemCategoryId: input.category.lv3 ? input.category.lv3 : input.category.lv2 ? input.category.lv2 : input.category.lv1,
                                image: imageDifference,
                                productId: id
                            }
                        ]
                    }));
                } else {
                    APIarray.push(api.put("products", {
                        products: [
                            {
                                productCode: input.code,
                                productName: input.name,
                                briefDescription: input.shortDescription,
                                description: input.description,
                                defaultPrice: input.price.replace(/\D/g, ""),
                                systemCategoryId: input.category.lv3 ? input.category.lv3 : input.category.lv2 ? input.category.lv2 : input.category.lv1,
                                image: [],
                                productId: id
                            }
                        ]
                    }));
                }
            }
            if (deleteArray.length) {
                APIarray.push(api.delete("products", {
                    data: { productIds: deleteArray }
                }));
            }
            if (insertArray.length) {
                APIarray.push(api.post("products/" + item.ProductId + "/related", {
                    products: insertArray
                }));
            }

            const notification = toast.loading("Đang xử lí yêu cầu...");
            if (APIarray.length) {
                Promise.all(APIarray)
                .then(function (results) {
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
                    toast.update(notification, { render: "Cập nhật thành công!", type: "success", autoClose: 5000, isLoading: false });
                })
                .catch(function (error) {
                    console.log(error);
                    toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
                });
            } else {
                toast.update(notification, { render: "Vui lòng chỉnh sửa sản phẩm trước khi chọn cập nhật.", type: "info", autoClose: 5000, isLoading: false });
            }
        }
    }

    const checkValid = () => {
        let check = false;
        setError(error => ({ ...error, name: '', colors: '', sizes: '', weights: '', category: '', price: '' }));

        if (input.name === null || input.name === '') {
            setError(error => ({ ...error, name: 'Vui lòng nhập tên sản phẩm' }));
            check = true;
        }
        if (input.category.lv1 === null || input.category.lv1 === '') {
            setError(error => ({ ...error, category: 'Vui lòng chọn danh mục sản phẩm' }));
            check = true;
        }
        if (input.price === null || input.price === 0) {
            setError(error => ({ ...error, price: 'Vui lòng nhập giá' }));
            check = true;
        }
        if (images[0].image === '') {
            setError(error => ({ ...error, image: 'Xin hãy chọn ảnh bìa cho sản phẩm' }));
            check = true;
        }
        if (check) {
            return false;
        }

        return true;
    }

    return (
        <PageWrapper>
            <Row>
                <Link to="/products"><StyledBackIcon /></Link>
                <Title><TitleGrey>Danh sách sản phẩm </TitleGrey>/ {item.ProductName}</Title>
            </Row>
            
            <form onSubmit={handleEditItem} id="form">
                <ContainerWrapper error={error.name !== ''}>
                    <Row spacebetween>
                        <FormLabel>Tên sản phẩm</FormLabel>
                        <HelperText ml0>{input.name.length}/250 kí tự</HelperText>
                    </Row>
                    
                    <StyledTextFieldMb
                        fullWidth placeholder="Ví dụ: Bánh mì 2 trứng" 
                        inputProps={{ maxLength: 250, style: {fontSize: 14} }} 
                        value={loading ? "Đang tải..." : input.name} name='name'
                        onChange={handleChange}
                        error={error.name !== ''}
                        helperText={error.name}
                    />

                    <Row spacebetween>
                        <FormLabel>Mô tả chi tiết</FormLabel>
                        <HelperText ml0>{input.description.length}/500 kí tự</HelperText>
                    </Row>

                    <StyledTextFieldMb
                        fullWidth multiline rows={4}
                        placeholder="Khách hàng sẽ thấy mô tả này khi họ vào xem chi tiết sản phẩm." 
                        inputProps={{ maxLength: 250, style: {fontSize: 14} }}
                        value={loading ? "Đang tải..." : input.description} name='description'
                        onChange={handleChange}
                    />

                    <Row spacebetween>
                        <FormLabel>Mô tả ngắn gọn</FormLabel>
                        <HelperText ml0>{input.shortDescription.length}/500 kí tự</HelperText>
                    </Row>

                    <TextField
                        fullWidth multiline rows={2}
                        placeholder="Khách hàng sẽ thấy mô tả này khi họ nhấn xem sản phẩm." 
                        inputProps={{ maxLength: 250, style: {fontSize: 14} }}
                        value={loading ? "Đang tải..." : input.shortDescription} name='shortDescription'
                        onChange={handleChange}
                    />
                </ContainerWrapper>

                <ContainerWrapper error={error.category !== ''}>
                    <FormLabel>Danh mục</FormLabel>

                    <RadioGroup value={type} name='type' onChange={handleSetType}>
                        <FormControlLabel 
                            value="Tươi sống" 
                            control={<Radio />} 
                            label={<RadioLabel>Tươi sống</RadioLabel>} 
                        />
                        <HelperText>
                            Bảng giá thuộc lại tươi sống sẽ nằm bên mục&nbsp;<b>Tươi sống</b>. 
                            Tìm hiểu thêm về&nbsp;<StyledLink href="https://vi.wikipedia.org/wiki/Th%E1%BB%B1c_ph%E1%BA%A9m_t%C6%B0%C6%A1i_s%E1%BB%91ng"
                                                              target="_blank">danh mục tươi sống</StyledLink>
                        </HelperText>

                        <FormControlLabel 
                            value="Khác" 
                            control={<Radio />} 
                            label={<RadioLabel>Khác</RadioLabel>} 
                        />
                        <HelperText>
                            Bảng giá thuộc lại khác sẽ nằm bên mục&nbsp;<b>Khác</b>. 
                            Tìm hiểu thêm về&nbsp;<StyledLink href="https://vi.wikipedia.org/wiki/S%E1%BA%A3n_ph%E1%BA%A9m"
                                                              target="_blank">danh mục khác</StyledLink>
                        </HelperText>
                    </RadioGroup>

                    <Row spacebetween mt>
                        <CategoryList currentItems={filteredLv1Category} selected={input.category.lv1} handleGetCategory={handleGetCategoryLv1} />
                        <CategoryList currentItems={lv2Category} selected={input.category.lv2} handleGetCategory={handleGetCategoryLv2} />
                        <CategoryList currentItems={lv3Category} selected={input.category.lv3} handleGetCategory={handleGetCategoryLv3} />
                    </Row>
                    <HelperText error> {error.category} </HelperText>
                </ContainerWrapper>

                <ContainerWrapper p0 error={error.price !== '' || error.image !== ''}>
                    <FormLabel>Giá mặc định</FormLabel>
                    <StyledTextFieldMb
                        fullWidth
                        InputProps={{ inputMode: 'numeric', pattern: '[0-9]*', startAdornment: <InputAdornment position="start">vnđ</InputAdornment> }}
                        value={input.price} name='price'
                        onChange={handleSetPrice}
                        error={error.name !== ''}
                        helperText={error.name}
                    />

                    <FormLabel>Hình ảnh</FormLabel>
                    <HelperText ml0 mb>Chỉ hình ảnh đầu tiên được lưu nếu trùng lặp.</HelperText>
                    <HelperText ml0 mb error>{error.image}</HelperText>

                    {
                        loading ? 
                        null :
                        <ImageUpload
                            images={images}
                            setImages={setImages}
                            handleSetImage={handleSetImage}
                            handleRemoveImage={handleRemoveImage}
                        />
                    }
                </ContainerWrapper>


                <ContainerWrapper>
                    <FormLabel>Tùy chọn</FormLabel>
                    <OptionLabel>Thêm các tùy chọn của sản phẩm, như màu sắc, kích thước hay trọng lượng</OptionLabel>
                    
                    <ProductOption passedData={input.colors} savedData={input.colors} type='colors' saveOption={saveOption} editOption={editOption} />
                    <ProductOption passedData={input.sizes} savedData={input.sizes} type='sizes' saveOption={saveOption} editOption={editOption} />
                    <ProductOption passedData={input.weights} savedData={input.weights} type='weights' saveOption={saveOption} editOption={editOption} />
                </ContainerWrapper>

                <ContainerWrapper>
                    <Row spacebetween>
                        <FormLabel>Mã sản phẩm</FormLabel>
                        <HelperText ml0>{input.code.length}/200 kí tự</HelperText>
                    </Row>
                    
                    <TextField
                        fullWidth size="small" placeholder="Ví dụ: AP-001" 
                        inputProps={{ maxLength: 200, style: {fontSize: 14} }}
                        value={input.code ? input.code : ''} name='code'
                        onChange={handleChange}
                    />
                    <HelperText mt ml0>
                        Mã sản phẩm giúp người bán dễ dàng quẩn lí sản phẩm của mình. Để trống nếu bạn không rõ.
                    </HelperText>
                </ContainerWrapper>

                <FooterWrapper>
                    <FloatRight>
                        {
                            (error.colors !== '' || error.sizes !== '' || error.weights !== '') ?
                            <>
                                <StyledWarningIcon />
                                <WarningText>Bạn có tùy chọn chưa lưu!</WarningText>
                                <Button disabled>Cập nhật</Button>
                            </>
                            : (error.name !== '' || error.category !== '' || error.price !== '') ?
                            <>
                                <StyledWarningIcon error />
                                <WarningText error>Bạn có thông tin chưa điền!</WarningText>
                                <Button disabled>Cập nhật</Button>
                            </>
                            :
                            <Button>Cập nhật</Button>
                        }
                    </FloatRight>
                </FooterWrapper>
            </form>
        </PageWrapper>
    )
}

export default EditProduct;