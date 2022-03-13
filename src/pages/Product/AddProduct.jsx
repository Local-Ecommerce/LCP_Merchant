import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../RequestMethod";
import { toast } from 'react-toastify';
import { KeyboardBackspace, AddPhotoAlternate, Warning } from '@mui/icons-material';
import { TextField, InputAdornment, FormControlLabel, Radio, RadioGroup, Checkbox } from '@mui/material';
import ProductOption from './ProductOption';
import CategoryList from '../../components/Product/CategoryList';

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
        color: ${props => props.error ? props.theme.red : props.theme.orange};
        opacity: 0.9;
    }
`;

const HelperText = styled.div`
    margin-left: ${props => props.ml0 ? "0px" : "30px"};
    align-items: center;
    text-decoration: none;
    font-size: ${props => props.error ? "13px" : "14px"};
    margin-top: ${props => props.error ? "10px" : "0px"};
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

const ImageListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
`;

const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    margin: 0px 35px 20px 0px;
`;

const StyledPhotoIcon = styled(AddPhotoAlternate)`
    && {
        cursor: pointer;
        border: 2px dashed #727272;
        padding: 40px;
        border-radius: 5px;
        color: #383838;
        margin-bottom: 10px;

        &:active {
            border: 2px solid #727272;
        }

        &:hover {
            opacity: 0.8;
            background-color: #E8E8E8;
        }
    }
`;

const HiddenInputFile = styled.input`
    opacity: 0;
    position: absolute;
    z-index: -1;
`;

const OptionLabel = styled.div`
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: 10px;
    font-size: 14px;
`;

const AddProduct = () => {    
    let navigate = useNavigate();

    const [input, setInput] = useState({ name: '', description: '', shortDescription: '', category: {lv1: '', lv2: '', lv3: ''}, price: '', images: [], colors: [], sizes: [],  weights: [], code: 'AP-001' });
    const [error, setError] = useState({ name: '', category: '', price: '', colors: '', sizes: '', weights: '', code: '' });

    const [manual, setManual] = useState(false);
    const [type, setType] = useState('Khác');
    const sort = '+syscategoryname';

    const [lv1Category, setLv1Category] = useState([]);
    const [filteredLv1Category, setFilteredLv1Category] = useState([]);
    const [lv2Category, setLv2Category] = useState([]);
    const [lv3Category, setLv3Category] = useState([]);

    useEffect(() => {   //set systemCategory level 1
        let url = "categories"
                + "?limit=" + 100
                + "&status=" + 3001
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

    useEffect(() => {   //filter based on category type
        const result = lv1Category.filter((item) => {
            return item.Type === type;
        })
        setFilteredLv1Category(result);
    }, [type, lv1Category]);

    useEffect(() => {
        console.log(input.category.lv3 ? input.category.lv3 : input.category.lv2 ? input.category.lv2 : input.category.lv1)
    }, [input])

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

    const handleSetManual = () => {
        if (manual) {
            setInput(input => ({ ...input, code: 'AP-001' }));
        } else {
            setInput(input => ({ ...input, code: '' }));
        }
        setManual(!manual);
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

    const handleAddItem = (event) => {
        event.preventDefault();

        if (checkValid()) {
            const notification = toast.loading("Đang xử lí yêu cầu...");
            const addData = async () => {
                const colors = input.colors.length ? input.colors : [{ value: null }];
                const sizes = input.sizes.length ? input.sizes : [{ value: null }];
                const weights = input.weights.length ? input.weights : [{ value: 0 }];

                api.post("products", {
                    productCode: input.code,
                    productName: input.name,
                    briefDescription: input.shortDescription,
                    description: input.description,
                    defaultPrice: input.price.replace(/\D/g, ""),
                    systemCategoryId: input.category.lv3 ? input.category.lv3 : input.category.lv2 ? input.category.lv2 : input.category.lv1,
                    image: [
                        // "string"
                    ],
                    relatedProducts: 
                        (
                            sizes.map(size => { 
                                return colors.map(color => {
                                    return weights.map(weight => {
                                        return {
                                            productCode: input.code,
                                            productName: input.name,
                                            briefDescription: input.shortDescription,
                                            description: input.description,
                                            defaultPrice: input.price.replace(/\D/g, ""),
                                            size: size.value,
                                            color: color.value,
                                            weight: weight.value,
                                            systemCategoryId: input.category.lv3 ? input.category.lv3 : input.category.lv2 ? input.category.lv2 : input.category.lv1,
                                            image: [
                                                // "string"
                                            ]
                                        }
                                    })
                                }).reduce((total, value) => {
                                    return total.concat(value);
                                }, [])
                            }).reduce((total, value) => {
                                return total.concat(value);
                            }, [])
                        )
                    ,
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        navigate("/products");
                        toast.update(notification, { render: "Tạo sản phẩm thành công!", type: "success", autoClose: 5000, isLoading: false });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
                });
            };
            addData();
        }
    }

    const checkValid = () => {
        let check = false;
        setError(error => ({ ...error, name: '', colors: '', sizes: '', weights: '', category: '', price: '', code: '' }));

        if (input.name === null || input.name === '') {
            setError(error => ({ ...error, name: 'Vui lòng nhập tên sản phẩm' }));
            check = true;
        }
        if (input.category.lv1 === null || input.category.lv1 === '') {
            setError(error => ({ ...error, category: 'Vui lòng chọn danh mục sản phẩm' }));
            check = true;
        }
        if (input.price === null || input.price === '' || input.price === 0) {
            setError(error => ({ ...error, price: 'Vui lòng nhập giá' }));
            check = true;
        }
        if (input.code === null || input.code === '') {
            setError(error => ({ ...error, code: 'Vui lòng nhập mã sản phẩm' }));
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
                <ContainerWrapper>
                    <Row spacebetween>
                        <FormLabel>Tên sản phẩm</FormLabel>
                        <HelperText ml0>{input.name.length}/250 kí tự</HelperText>
                    </Row>
                    
                    <StyledTextFieldMb
                        fullWidth placeholder="Ví dụ: Bánh mì 2 trứng" 
                        inputProps={{ maxLength: 250, style: {fontSize: 14} }} 
                        value={input.name ? input.name : ''} name='name'
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
                        inputProps={{ maxLength: 250, style: {fontSize: 14} }}
                        value={input.shortDescription} name='shortDescription'
                        onChange={handleChange}
                    />
                </ContainerWrapper>

                <ContainerWrapper>
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


                <ContainerWrapper p0>
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
                    <ImageListWrapper>
                        <ImageWrapper><StyledPhotoIcon /> Ảnh bìa<HiddenInputFile type="file" id="upload-photo" /></ImageWrapper>
                        <ImageWrapper><StyledPhotoIcon /> Hình ảnh 1<HiddenInputFile type="file" id="upload-photo" /></ImageWrapper>
                        <ImageWrapper><StyledPhotoIcon /> Hình ảnh 2<HiddenInputFile type="file" id="upload-photo" /></ImageWrapper>
                        <ImageWrapper><StyledPhotoIcon /> Hình ảnh 3<HiddenInputFile type="file" id="upload-photo" /></ImageWrapper>
                        <ImageWrapper><StyledPhotoIcon /> Hình ảnh 4<HiddenInputFile type="file" id="upload-photo" /></ImageWrapper>
                        <ImageWrapper><StyledPhotoIcon /> Hình ảnh 5<HiddenInputFile type="file" id="upload-photo" /></ImageWrapper>
                        <ImageWrapper><StyledPhotoIcon /> Hình ảnh 6<HiddenInputFile type="file" id="upload-photo" /></ImageWrapper>
                        <ImageWrapper><StyledPhotoIcon /> Hình ảnh 7<HiddenInputFile type="file" id="upload-photo" /></ImageWrapper>
                        <ImageWrapper><StyledPhotoIcon /> Hình ảnh 8<HiddenInputFile type="file" id="upload-photo" /></ImageWrapper>
                    </ImageListWrapper>
                </ContainerWrapper>


                <ContainerWrapper>
                    <FormLabel>Tùy chọn</FormLabel>
                    <OptionLabel>Thêm các tùy chọn của sản phẩm, như màu sắc, kích thước hay trọng lượng</OptionLabel>
                    
                    <ProductOption savedData={input.colors} type='colors' saveOption={saveOption} editOption={editOption} />
                    <ProductOption savedData={input.sizes} type='sizes' saveOption={saveOption} editOption={editOption} />
                    <ProductOption savedData={input.weights} type='weights' saveOption={saveOption} editOption={editOption} />
                </ContainerWrapper>

                <ContainerWrapper>
                    <FormLabel>Mã sản phẩm</FormLabel>
                    <Row spacebetween>
                        <FormControlLabel
                            style={{ pointerEvents: "none" }}
                            control={
                                <Checkbox
                                    onClick={handleSetManual}
                                    style={{ pointerEvents: "auto" }}
                                />
                            }
                            label={<span style={{ fontSize: '14px' }}>Đặt thủ công</span>} 
                        />

                        {
                            manual ?
                            <HelperText ml0>{input.code.length}/200 kí tự</HelperText>
                            : null
                        }
                    </Row>
                    
                    {
                        manual ?
                        <TextField
                            fullWidth size="small" placeholder="Ví dụ: Bánh mì 2 trứng" 
                            inputProps={{ maxLength: 200, style: {fontSize: 14} }}
                            value={input.code ? input.code : ''} name='code'
                            onChange={handleChange}
                            error={error.code !== ''}
                            helperText={error.code}
                        />
                        :
                        <HelperText ml0>
                            Dựa trên tiền tố hiện tại, mã của sản phẩm này sẽ là AP-001. 
                            Cửa hàng có thể điều chỉnh tiền tố của mình trong cài đặt.
                        </HelperText>
                    }
                    
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
                            : (error.name !== '' || error.category !== '' || error.price !== '' || error.code !== '') ?
                            <>
                                <StyledWarningIcon error />
                                <WarningText error>Bạn có thông tin chưa điền!</WarningText>
                                <Button disabled>Tạo mới</Button>
                            </>
                            :
                            <Button>Tạo mới</Button>
                        }
                    </FloatRight>
                </FooterWrapper>
            </form>
        </PageWrapper>
    )
}

export default AddProduct;