import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { api } from "../RequestMethod";
import { toast } from 'react-toastify';
import { KeyboardBackspace, Warning } from '@mui/icons-material';
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

const StyledLink = styled.a`
    color: #007bff;
    cursor: pointer;
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
        toBaseMenu: true
    });
    const [images, setImages] = useState([ { name: 0, image: '' } ]);
    const [error, setError] = useState({ name: '', category: '', price: '', image: '', colors: '', sizes: '', weights: '' });

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


    const handleSetPrice = (e) => {
        const { value } = e.target;
        if (value.replace(/\D/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").length + 1 <= 12) {
            setInput(input => ({ ...input, price: value.replace(/\D/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }));
        }
        setError(error => ({ ...error, price: '' }));
    }

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
        setProcessing(true);
        if (checkValid()) {
            const notification = toast.loading("Đang xử lí yêu cầu...");
            const addData = async () => {
                const colors = input.colors.length ? input.colors : [{ value: null }];
                const sizes = input.sizes.length ? input.sizes : [{ value: null }];
                const weights = input.weights.length ? input.weights : [{ value: 0 }];
                let skipRelated = false;
                if (colors.length === 1 && colors[0].value === null 
                    && sizes.length === 1 && sizes[0].value === null 
                    && weights.length === 1 && weights[0].value === 0 ) {
                        skipRelated = true;
                };

                api.post("products", {
                    productCode: input.code,
                    productName: input.name,
                    briefDescription: input.shortDescription,
                    description: input.description,
                    defaultPrice: input.price.replace(/\D/g, ""),
                    systemCategoryId: input.category.lv3 ? input.category.lv3 : input.category.lv2 ? input.category.lv2 : input.category.lv1,
                    image: images.filter(item => item.image !== '').map(item => item.image.split(',')[1]),
                    toBaseMenu: input.toBaseMenu,
                    relatedProducts: 
                        skipRelated ? [] : sizes.map(size => { 
                            return colors.map(color => {
                                return weights.map(weight => {
                                    return {
                                        defaultPrice: input.price.replace(/\D/g, ""),
                                        size: size.value,
                                        color: color.value,
                                        weight: weight.value,
                                        image: []
                                    }
                                })
                            }).reduce((total, value) => {
                                return total.concat(value);
                            }, [])
                        }).reduce((total, value) => {
                            return total.concat(value);
                        }, [])
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
        if (input.price === null || input.price === '' || input.price < 500) {
            setError(error => ({ ...error, price: 'Vui lòng nhập giá trên 500 vnđ' }));
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
                <Title><TitleGrey>Danh sách sản phẩm </TitleGrey>/ Tạo mới sản phẩm</Title>
            </Row>
            
            <form onSubmit={handleAddItem} id="form">
                <ContainerWrapper error={error.name !== ''}>
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

                <ContainerWrapper error={error.category !== ''}>
                    <FormLabel>Danh mục</FormLabel>

                    <Row spacebetween mt>
                        <CategoryList currentItems={lv1Category} selected={input.category.lv1} handleGetCategory={handleGetCategoryLv1} />
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
                        error={error.price !== ''}
                        helperText={error.price}
                    />

                    <FormLabel>Hình ảnh</FormLabel>
                    <HelperText ml0 mb>Chỉ hình ảnh đầu tiên được lưu nếu trùng lặp.</HelperText>
                    <HelperText ml0 mb error>{error.image}</HelperText>

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

                <ContainerWrapper pt0>
                    <FormControlLabel 
                        checked={input.toBaseMenu} name='toBaseMenu' 
                        onClick={handleToggleToBaseMenu} 
                        control={<Checkbox />} 
                        label={<span style={{ fontSize: '14px' }}>Tự động thêm sản phẩm vào bảng giá cơ bản</span>} 
                    />
                    <HelperText>
                        Tìm hiểu thêm về&nbsp;<StyledLink href="https://vi.wikipedia.org/wiki/Th%E1%BB%B1c_ph%E1%BA%A9m_t%C6%B0%C6%A1i_s%E1%BB%91ng"
                                            target="_blank">các loại bảng giá</StyledLink>
                    </HelperText>
                </ContainerWrapper>

                <FooterWrapper>
                    <FloatRight>
                        {
                            (error.colors !== '' || error.sizes !== '' || error.weights !== '') ?
                            <>
                                <StyledWarningIcon />
                                <WarningText>Bạn có tùy chọn chưa lưu!</WarningText>
                                <Button disabled>Tạo mới</Button>
                            </>
                            : (error.name !== '' || error.category !== '' || error.price !== '') ?
                            <>
                                <StyledWarningIcon error />
                                <WarningText error>Bạn có thông tin chưa điền!</WarningText>
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