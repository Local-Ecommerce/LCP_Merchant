import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../../RequestMethod";
import { ArrowRight } from '@mui/icons-material';
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
    width: 100%;
    align-items: center;
    justify-content: space-between;
`;

const ContainerWrapper = styled.div`
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

const HeaderWrapper = styled.div`
    padding: 20px;
    border-bottom: 1px solid #D8D8D8;
`;

const Header = styled.div`
    font-weight: 600;
`;

const StyledHyperlink = styled.a`
    font-size: 14px;
    color: #007bff;
    cursor: pointer;
`;

const ContentWrapper = styled.div`
    padding: 20px;
`;

const StyledFormLabel = styled.div`
    font-weight: 400;
    font-size: 14px;
    margin-top: ${props => props.mt ? "20px" : "0px"};
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
        'title': 'Tên',
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
            <form onSubmit={handleAddMenu} id="form">
                <ContainerWrapper>
                    <HeaderWrapper>
                        <Row>
                            <Header>Thông tin cơ bản</Header>
                            <StyledHyperlink>Sửa</StyledHyperlink>
                        </Row>
                    </HeaderWrapper>

                    <ContentWrapper>
                        <StyledFormLabel>Tên cửa hàng</StyledFormLabel>
                        <TextField
                            fullWidth size="small" disabled
                            inputProps={{style: {fontSize: 14}}}
                            value={input.title} name='title'
                            onChange={handleChange}
                            error={error.titleError !== ''}
                            helperText={error.titleError}
                        />

                        <StyledFormLabel mt>Điện thoại</StyledFormLabel>
                        <TextField
                            fullWidth size="small" disabled
                            inputProps={{style: {fontSize: 14}}}
                            value={input.title} name='title'
                            onChange={handleChange}
                            error={error.titleError !== ''}
                            helperText={error.titleError}
                        />

                        <StyledFormLabel mt>Email</StyledFormLabel>
                        <TextField
                            fullWidth size="small" disabled
                            inputProps={{style: {fontSize: 14}}}
                            value={input.title} name='title'
                            onChange={handleChange}
                            error={error.titleError !== ''}
                            helperText={error.titleError}
                        />
                    </ContentWrapper>
                </ContainerWrapper>

                <ContainerWrapper>
                    <HeaderWrapper>
                        <Row>
                            <Header>Địa chỉ</Header>
                            <StyledHyperlink>Sửa</StyledHyperlink>
                        </Row>
                    </HeaderWrapper>

                    <ContentWrapper>
                        <StyledFormLabel>Chung cư</StyledFormLabel>
                        <TextField
                            fullWidth size="small" disabled
                            inputProps={{style: {fontSize: 14}}}
                            value={input.title} name='title'
                            onChange={handleChange}
                            error={error.titleError !== ''}
                            helperText={error.titleError}
                        />

                        <StyledFormLabel mt>Căn hộ</StyledFormLabel>
                        <TextField
                            fullWidth size="small" disabled
                            inputProps={{style: {fontSize: 14}}}
                            value={input.title} name='title'
                            onChange={handleChange}
                            error={error.titleError !== ''}
                            helperText={error.titleError}
                        />
                    </ContentWrapper>
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