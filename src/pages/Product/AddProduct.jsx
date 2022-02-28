import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../RequestMethod";
import { KeyboardBackspace, AddPhotoAlternate, AddCircleOutline } from '@mui/icons-material';
import { TextField, InputAdornment, FormControlLabel } from '@mui/material';

import Lv1Category from '../../mockdata/Lv1Category';
import Lv2Category from '../../mockdata/Lv2Category';
import Lv3Category from '../../mockdata/Lv3Category';
import ProductOption from '../../components/Product/ProductOption';
import CategoryList from '../../components/Product/CategoryList';

const PageWrapper = styled.div`
    min-width: 720px;
    max-width: 1080px;
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

const StyledFormLabel = styled.div`
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
`;

const Button = styled.button`
    display: block;
    border-radius: 5px;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border: 1px solid ${props => props.white ? props.theme.greyBorder : props.theme.bg};
    background: ${props => props.white ? "white" : props.theme.bg};
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
    const theme = { bg: "#17a2b8", grey: '#2b2b2b', greyBorder: '#c2c2c2' };
    
    let navigate = useNavigate();

    const [input, setInput] = useState({
        'title': '',
        'description': '',
        'status': 0
    });
    const [dateOfWeek, setDateOfWeek] = useState({ t2:true, t3:false, t4:false, t5:false, t6:false, t7:false, cn:false });
    const [error, setError] = useState({ 'titleError': '', 'timeError': '' });

    const [lv1Category, setLv1Category] = useState([]);
    const [lv2Category, setLv2Category] = useState([]);
    const [lv3Category, setLv3Category] = useState([]);
    const option = [{id: 1, name: 'Màu sắc'}, {id: 2, name: 'Kích thước'}, {id: 3, name: 'Trọng lượng'}];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    }

    useEffect(() => {
        setLv1Category(Lv1Category);
    }, []);

    const handleGetSubCategory2 = () => {
        setLv2Category(Lv2Category);
    }

    const handleGetSubCategory3 = () => {
        setLv3Category(Lv3Category);
    }

    const handleAddMenu = (event) => {
        //
    }

    const checkValid = () => {
        let check = false;
        if (input.title === null || input.title === '') {
            setError(error => ({ ...error, titleError: 'Vui lòng nhập tiêu đề' }));
            check = true;
        }
        if (input.startTime >= input.endTime) {
            setError(error => ({ ...error, timeError: 'Giờ bắt đầu không được lớn hơn giờ kết thúc' }));
            check = true;
        }
        if (check) {
            return false;
        }
        setError(error => ({ ...error, titleError: '', timeError: '' }));
        return true;
    }

    return (
        <ThemeProvider theme={theme}>
        <PageWrapper>
            <Row>
                <Link to="/products"><StyledBackIcon /></Link>
                <Title><TitleGrey>Danh sách sản phẩm </TitleGrey>/ Tạo mới sản phẩm</Title>
            </Row>
            
            <form onSubmit={handleAddMenu} id="form">
                <ContainerWrapper>
                    <StyledFormLabel>Tên sản phẩm</StyledFormLabel>
                    <StyledTextFieldMb
                        fullWidth placeholder="Ví dụ: Bánh mì 2 trứng" 
                        inputProps={{style: {fontSize: 14}}}
                        value={input.title} name='title'
                        onChange={handleChange}
                        error={error.titleError !== ''}
                        helperText={error.titleError}
                    />

                    <StyledFormLabel>Mô tả sản phẩm</StyledFormLabel>
                    <StyledTextFieldMb
                        fullWidth multiline rows={4} 
                        inputProps={{style: {fontSize: 14}}}
                        value={input.title} name='title'
                        onChange={handleChange}
                    />

                    <StyledFormLabel>Danh mục</StyledFormLabel>
                    <Row spacebetween>
                        <CategoryList currentItems={lv1Category} handleGetSubCategory={handleGetSubCategory2} />
                        <CategoryList currentItems={lv2Category} handleGetSubCategory={handleGetSubCategory3} />
                        <CategoryList currentItems={lv3Category} />
                    </Row>
                </ContainerWrapper>


                <ContainerWrapper p0>
                    <StyledFormLabel>Giá mặc định</StyledFormLabel>
                    <StyledTextFieldMb
                        fullWidth
                        InputProps={{ startAdornment: <InputAdornment position="start">vnđ</InputAdornment> }}
                        value={input.title} name='title'
                        onChange={handleChange}
                        error={error.titleError !== ''}
                        helperText={error.titleError}
                    />

                    <StyledFormLabel>Hình ảnh</StyledFormLabel>
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
                    <StyledFormLabel>Tùy chọn</StyledFormLabel>
                    <OptionLabel>Thêm các tùy chọn của sản phẩm, như màu sắc, kích thước hay trọng lượng</OptionLabel>
                    
                    <ProductOption type='1' />
                    <ProductOption type='2' />
                    <ProductOption type='3' />

                </ContainerWrapper>


                <FooterWrapper>
                    <FloatRight>
                        <Button>Tạo mới</Button>
                    </FloatRight>
                </FooterWrapper>
            </form>
        </PageWrapper>
        </ThemeProvider>
    )
}

export default AddMenu;