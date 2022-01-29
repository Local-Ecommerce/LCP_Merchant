import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../../RequestMethod";
import { KeyboardBackspace, ArrowRight } from '@mui/icons-material';
import { TextField, Checkbox, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { TimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const PageWrapper = styled.div`
    width: 720px;
    margin: 40px auto;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
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
    padding: 30px 20px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: #fff;
    border-radius: 5px;
`;

const DatePickerWrapper = styled.div`
    margin: 20px 0px 0px 0px;
    display: flex;
    justify-content: center;
`;

const TimePickerWrapper = styled.div`
    margin: 30px 20px 0px 20px;
    display: flex;
    justify-content: center;
`;

const StyledArrowIcon = styled(ArrowRight)`
    && {
    margin: 16px 20px;
    }
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

const RadioLabel = styled.span`
    font-size: 14px;
`;

const HelperText = styled.div`
    margin-left: 30px;
    align-items: center;
    text-decoration: none;
    font-size: 14px;
    color: #727272;
`;

const StyledLink = styled(Link)`
    color: #007bff;
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
    border-radius: 5px;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    background-color: #17a2b8;
    color: white;
    font-weight: 600;

    &:active {
    transform: translateY(1px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const AddMenu = () => {
    let navigate = useNavigate();

    const [createTitle, setCreateTitle] = useState(null);
    const [createText, setCreateText] = useState(null);
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleAddMenu = (event) => {
        event.preventDefault();
        if (checkValid(createTitle)) {
            const url = "menu/create";

            const addMenu = async () => {
                try {
                    const res = await fetch(publicRequest(url), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            title: createTitle,
                            text: createText,
                            residentId: null,
                        })
                    });
                    const json = await res.json();
                    if (json.ResultMessage === "SUCCESS") {
                        navigate('/menu', {name: createTitle} );
                    }
                } catch (error) { }
            };
            addMenu();
        }
    }

    const checkValid = (title) => {
        if (title === null || title === '') {
            setCreateTitle('');
            return false;
        }
        return true;
    }

    return (
        <PageWrapper>
            <Row>
                <Link to="/menus"><StyledBackIcon /></Link>
                <Title><TitleGrey>Bảng giá </TitleGrey>/ Tạo bảng giá mới</Title>
            </Row>
            
            <form onSubmit={handleAddMenu} id="form">
                <ContainerWrapper>
                    <StyledFormLabel>Tiêu đề</StyledFormLabel>
                    <StyledTextFieldMb
                        fullWidth placeholder="Ví dụ: Thịt cá các loại, đồ gia dụng, etc" 
                        inputProps={{style: {fontSize: 14}}}
                        value={createTitle}
                        onChange={event => setCreateTitle(event.target.value)}
                        error={createTitle === ''}
                        helperText={createTitle === '' ? 'Vui lòng nhập tiêu đề' : ''}
                    />

                    <StyledFormLabel>Mô tả</StyledFormLabel>
                    <TextField
                        fullWidth multiline rows={4}
                        inputProps={{style: {fontSize: 14}}}
                        value={createText}
                        onChange={event => setCreateText(event.target.value)}
                    />
                </ContainerWrapper>

                <ContainerWrapper>
                    <StyledFormLabel>Loại bảng giá</StyledFormLabel>

                    <RadioGroup defaultValue="2">
                        <FormControlLabel value="1" control={<Radio />} label={<RadioLabel>Tươi sống</RadioLabel>} />
                        <HelperText>
                            Bảng giá thuộc lại tươi sống sẽ nằm bên mục&nbsp;<b>Tươi sống</b>. 
                            Tìm hiểu thêm về&nbsp;<StyledLink to="/menus">danh mục tươi sống</StyledLink>
                        </HelperText>
                        <FormControlLabel value="2" control={<Radio />} label={<RadioLabel>Khác</RadioLabel>} />
                        <HelperText>
                            Bảng giá thuộc lại khác sẽ nằm bên mục&nbsp;<b>Khác</b>. 
                            Tìm hiểu thêm về&nbsp;<StyledLink to="/menus">danh mục khác</StyledLink>
                        </HelperText>
                    </RadioGroup>
                </ContainerWrapper>

                <ContainerWrapper>
                    <StyledFormLabel>Ngày hoạt động</StyledFormLabel>
                    
                    <DatePickerWrapper>
                        <FormControlLabel value="monday" control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Chọn toàn bộ</span>} labelPlacement="top" />
                        <FormControlLabel value="monday" control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Thứ 2</span>} labelPlacement="top" />
                        <FormControlLabel value="tuesday" control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Thứ 3</span>} labelPlacement="top" />
                        <FormControlLabel value="wednesday" control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Thứ 4</span>} labelPlacement="top" />
                        <FormControlLabel value="thursday" control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Thứ 5</span>} labelPlacement="top" />
                        <FormControlLabel value="friday" control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Thứ 6</span>} labelPlacement="top" />
                        <FormControlLabel value="saturday" control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Thứ 7</span>} labelPlacement="top" />
                        <FormControlLabel value="sunday" control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>C.Nhật</span>} labelPlacement="top" />
                    </DatePickerWrapper>
                </ContainerWrapper>

                <ContainerWrapper>
                    <StyledFormLabel>Thời gian hoạt động</StyledFormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePickerWrapper>
                            <TimePicker label="Giờ mở cửa" value={value} onChange={handleChange} renderInput={(params) => <TextField {...params} />} />
                            <StyledArrowIcon />
                            <TimePicker label="Giờ đóng cửa" value={value} onChange={handleChange} renderInput={(params) => <TextField {...params} />} />
                        </TimePickerWrapper>
                    </LocalizationProvider>
                </ContainerWrapper>

                <FooterWrapper>
                    <FloatRight>
                        <Button>Lưu</Button>
                    </FloatRight>
                </FooterWrapper>
            </form>
        </PageWrapper>
    )
}

export default AddMenu;