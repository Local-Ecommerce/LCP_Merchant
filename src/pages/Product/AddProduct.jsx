import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../RequestMethod";
import { KeyboardBackspace, AddPhotoAlternate, Warning } from '@mui/icons-material';
import { TextField, InputAdornment, FormControlLabel, Radio, RadioGroup } from '@mui/material';

import Lv1Category from '../../mockdata/Lv1Category';
import Lv2Category from '../../mockdata/Lv2Category';
import Lv3Category from '../../mockdata/Lv3Category';
import ProductOption from '../../components/Product/ProductOption';
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
        color: ${props => props.theme.orange};
        opacity: 0.9;
    }
`;

const HelperText = styled.div`
    margin-left: 30px;
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
    border: 1px solid ${props => props.white ? props.theme.greyBorder : props.theme.blue};
    background: ${props => props.white ? "white" : props.theme.blue};
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


const AddMenu = () => {    
    let navigate = useNavigate();

    const [input, setInput] = useState({ name: '', description: '', shortDescription: '', category: {lv1: '', lv2: '', lv3: ''}, price: 0, images: [], color: [], size: [],  weight: [] });
    const [error, setError] = useState({ name: '', color: '', size: '', weight: '' });

    const [lv1Category, setLv1Category] = useState([]);
    const [lv2Category, setLv2Category] = useState([]);
    const [lv3Category, setLv3Category] = useState([]);
    const option = [{id: 1, name: 'Màu sắc'}, {id: 2, name: 'Kích thước'}, {id: 3, name: 'Trọng lượng'}];

    useEffect(() => {   //set systemCategory level 1
        setLv1Category(Lv1Category);
    }, []);

    useEffect(() => {   //console log input test
        console.log(input);
    }, [input]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    };

    const saveOption = (option, data) => {
        setError(error => ({ ...error, [option]: '' }));
        setInput(input => ({ ...input, [option]: data }));
    }

    const editOption = (option) => {
        setError(error => ({ ...error, [option]: 'Bạn có tùy chọn chưa lưu!' }));
        setInput(input => ({ ...input, [option]: [] }));
    }

    const handleGetCategoryLv1 = (id) => {
        setInput(input => ({ ...input, category: {lv1: id, lv2: '', lv3: ''} }));
        setLv2Category(Lv2Category);
    }

    const handleGetCategoryLv2 = (id) => {
        setInput(input => ({ ...input, category: {lv1: input.category.lv1, lv2: id, lv3: ''} }));
        setLv3Category(Lv3Category);
    }

    const handleGetCategoryLv3 = (id) => {
        setInput(input => ({ ...input, category: {lv1: input.category.lv1, lv2: input.category.lv2, lv3: id} }));
    }

    const handleAddMenu = (event) => {
        event.preventDefault();

        if (checkValid()) {

        }
    }

    const checkValid = () => {
        let check = false;
        setError(error => ({ ...error, name: '', color: '', size: '', weight: '' }));

        if (input.name === null || input.name === '') {
            setError(error => ({ ...error, name: 'Vui lòng nhập tiêu đề' }));
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
            
            <form onSubmit={handleAddMenu} id="form">
                <ContainerWrapper>
                    <FormLabel>Tên sản phẩm</FormLabel>
                    <StyledTextFieldMb
                        fullWidth placeholder="Ví dụ: Bánh mì 2 trứng" 
                        inputProps={{style: {fontSize: 14}}}
                        value={input.name ? input.name : ''} name='name'
                        onChange={handleChange}
                        error={error.name !== ''}
                        helperText={error.name}
                    />

                    <FormLabel>Mô tả chi tiết</FormLabel>
                    <StyledTextFieldMb
                        fullWidth multiline rows={4}
                        placeholder="Khách hàng sẽ thấy mô tả này khi họ vào xem chi tiết sản phẩm." 
                        inputProps={{style: {fontSize: 14}}}
                        value={input.description} name='description'
                        onChange={handleChange}
                    />

                    <FormLabel>Mô tả ngắn gọn</FormLabel>
                    <StyledTextFieldMb
                        fullWidth multiline rows={2}
                        placeholder="Khách hàng sẽ thấy mô tả này khi họ nhấn xem sản phẩm." 
                        inputProps={{style: {fontSize: 14}}}
                        value={input.shortDescription} name='shortDescription'
                        onChange={handleChange}
                    />

                    <FormLabel>Danh mục</FormLabel>
                    <Row spacebetween>
                        <CategoryList currentItems={lv1Category} selected={input.category.lv1} handleGetCategory={handleGetCategoryLv1} />
                        <CategoryList currentItems={lv2Category} selected={input.category.lv2} handleGetCategory={handleGetCategoryLv2} />
                        <CategoryList currentItems={lv3Category} selected={input.category.lv3} handleGetCategory={handleGetCategoryLv3} />
                    </Row>
                </ContainerWrapper>

                <ContainerWrapper>
                    <FormLabel>Loại sản phẩm</FormLabel>

                    <RadioGroup value={input.type} name='type' onChange={handleChange}>
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
                </ContainerWrapper>


                <ContainerWrapper p0>
                    <FormLabel>Giá mặc định</FormLabel>
                    <StyledTextFieldMb
                        fullWidth type="number"
                        InputProps={{ inputMode: 'numeric', pattern: '[0-9]*', startAdornment: <InputAdornment position="start">vnđ</InputAdornment> }}
                        value={input.price ? input.price : 0} name='price'
                        onChange={handleChange}
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
                    
                    <ProductOption savedData={input.color} type='color' saveOption={saveOption} editOption={editOption} />
                    <ProductOption savedData={input.size} type='size' saveOption={saveOption} editOption={editOption} />
                    <ProductOption savedData={input.weight} type='weight' saveOption={saveOption} editOption={editOption} />
                </ContainerWrapper>


                <FooterWrapper>

                    <FloatRight>
                        {
                            (error.color !== '' || error.size !== '' || error.weight !== '') ?
                            <>
                                <StyledWarningIcon />
                                <WarningText>Bạn có tùy chọn chưa lưu!</WarningText>
                            </>
                            : null
                        }
                        <Button>Tạo mới</Button>
                    </FloatRight>
                </FooterWrapper>
            </form>
        </PageWrapper>
    )
}

export default AddMenu;