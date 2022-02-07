import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../../RequestMethod";
import { KeyboardBackspace, ArrowRight } from '@mui/icons-material';
import { TextField, Checkbox, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { TimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DateTime } from 'luxon';

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

    const [input, setInput] = useState({
        'title': '',
        'description': '',
        'type': 'Tươi sống',
        'startTime': DateTime.now().toISO(),
        'endTime': DateTime.now().toISO(),
        'status': 0
    });
    const [dateOfWeek, setDateOfWeek] = useState({ t2:true, t3:false, t4:false, t5:false, t6:false, t7:false, cn:false });
    const [error, setError] = useState({ 'titleError': '', 'timeError': '' });

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    }

    function handleToggleDate(e) {
        const { name, checked } = e.target;
        setDateOfWeek(date => ({ ...date, [name]: checked }));
    }

    function handleToggleAllDate(e) {
        const { checked } = e.target;
        setDateOfWeek({ t2:checked, t3:checked, t4:checked, t5:checked, t6:checked, t7:checked, cn:checked });
    }

    const handleAddMenu = (event) => {
        event.preventDefault();
        if (checkValid()) {
            const url = "menu/create";

            const addMenu = async () => {
                try {
                    const res = await fetch(publicRequest(url), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            title: input.title,
                        })
                    });
                    const json = await res.json();
                    if (json.ResultMessage === "SUCCESS") {
                        navigate('/menu', {name: input.title} );
                    }
                } catch (error) { }
            };
            addMenu();
        }
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
                        value={input.title} name='title'
                        onChange={handleChange}
                        error={error.titleError !== ''}
                        helperText={error.titleError}
                    />

                    <StyledFormLabel>Mô tả</StyledFormLabel>
                    <TextField
                        fullWidth multiline rows={4}
                        inputProps={{style: {fontSize: 14}}}
                        value={input.description} name='description'
                        onChange={handleChange}
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
                        <FormControlLabel checked={dateOfWeek.t2 && dateOfWeek.t3 && dateOfWeek.t4 && dateOfWeek.t5 && dateOfWeek.t6 && dateOfWeek.t7 && dateOfWeek.cn} onClick={handleToggleAllDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Chọn toàn bộ</span>} labelPlacement="top" />
                        <FormControlLabel checked={dateOfWeek.t2} name='t2' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Thứ 2</span>} labelPlacement="top" />
                        <FormControlLabel checked={dateOfWeek.t3} name='t3' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Thứ 3</span>} labelPlacement="top" />
                        <FormControlLabel checked={dateOfWeek.t4} name='t4' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Thứ 4</span>} labelPlacement="top" />
                        <FormControlLabel checked={dateOfWeek.t5} name='t5' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Thứ 5</span>} labelPlacement="top" />
                        <FormControlLabel checked={dateOfWeek.t6} name='t6' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Thứ 6</span>} labelPlacement="top" />
                        <FormControlLabel checked={dateOfWeek.t7} name='t7' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Thứ 7</span>} labelPlacement="top" />
                        <FormControlLabel checked={dateOfWeek.cn} name='cn' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>C.Nhật</span>} labelPlacement="top" />
                    </DatePickerWrapper>
                </ContainerWrapper>

                <ContainerWrapper>
                    <StyledFormLabel>Thời gian hoạt động</StyledFormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePickerWrapper>
                            <TimePicker 
                                    value={input.startTime}
                                    onChange={time => handleChange({ target: { value: time, name: 'startTime' } })} 
                                    renderInput={(params) => <TextField {...params} error={error.timeError !== ''} helperText={error.timeError} />} />

                                <StyledArrowIcon />

                                <TimePicker 
                                    value={input.endTime}
                                    onChange={time => handleChange({ target: { value: time, name: 'endTime' } })} 
                                    renderInput={(params) => <TextField {...params} error={error.timeError !== ''} helperText={error.timeError} />} />
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