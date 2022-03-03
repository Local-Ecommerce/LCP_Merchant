import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../RequestMethod";
import { toast } from 'react-toastify';
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
    font-size: ${props => props.error ? "13px" : "14px"};
    margin-top: ${props => props.error ? "10px" : "0px"};
    color: ${props => props.error ? props.theme.red : "#727272"};
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
    background-color: ${props => props.theme.blue};
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
    const user = JSON.parse(localStorage.getItem('USER'));
    const [storeId, setStoreId] = useState('');
    const [menuId, setMenuId] = useState('');

    const [input, setInput] = useState({ name: '', description: '', type: 'Khác', startTime: DateTime.now().toUTC().toISO(), endTime: DateTime.now().toUTC().toISO(), status: 9001 });
    const [repeatDay, setRepeatDay] = useState({ t2:false, t3:false, t4:false, t5:false, t6:false, t7:false, cn:false });
    const [error, setError] = useState({ 'name': '', 'time': '' });

    useEffect(() => {   //get store id
        const fetchData = () => {
            api.get("stores")
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    setStoreId(res.data.Data.List[0].MerchantStoreId);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        fetchData();
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    }

    function handleToggleDate(e) {
        const { name, checked } = e.target;
        setRepeatDay(date => ({ ...date, [name]: checked }));
    }

    function handleToggleAllDate(e) {
        const { checked } = e.target;
        setRepeatDay({ t2:checked, t3:checked, t4:checked, t5:checked, t6:checked, t7:checked, cn:checked });
    }

    const handleAddMenu = (event) => {
        event.preventDefault();

        if (checkValid()) {
            const addData = async () => {
                api.post("menus", {
                    menuName: input.name,
                    menuDescription: input.description,
                    residentId: user.Residents[0].ResidentId
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        setMenuId(res.data.Data.MenuId);
                        return api.post("store-menus", [{
                            timeStart: {
                                "ticks": 0,
                                "days": 0,
                                "hours": 0,
                                "milliseconds": 0,
                                "minutes": 0,
                                "seconds": 0
                            },
                            timeEnd: {
                                "ticks": 0,
                                "days": 0,
                                "hours": 0,
                                "milliseconds": 0,
                                "minutes": 0,
                                "seconds": 0
                            },
                            repeatDate: (repeatDay.t2 ? '2' : '') 
                                        + (repeatDay.t3 ? '3' : '') 
                                        + (repeatDay.t4 ? '4' : '') 
                                        + (repeatDay.t5 ? '5' : '') 
                                        + (repeatDay.t6 ? '6' : '') 
                                        + (repeatDay.t7 ? '7' : '') 
                                        + (repeatDay.cn ? '8' : ''),
                            menuId: menuId,
                            merchantStoreId: storeId
                        }])
                    }
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        const notify = () => toast.success("Tạo thành công bảng giá mới!", {
                            position: toast.POSITION.TOP_CENTER
                        });
                        notify();
                        navigate("/menus");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            };
            addData();
        }
    }

    const checkValid = () => {
        let check = false;
        setError(error => ({ ...error, name: '', time: '', repeatDay: '' }));

        if (input.name === null || input.name === '') {
            setError(error => ({ ...error, name: 'Vui lòng nhập tiêu đề' }));
            check = true;
        }
        if (repeatDay.t2 === false && repeatDay.t3 === false && repeatDay.t4 === false 
            && repeatDay.t5 === false && repeatDay.t6 === false && repeatDay.t7 === false && repeatDay.cn === false) {
            setError(error => ({ ...error, repeatDay: 'Không được để trống ngày hoạt động' }));
            check = true;
        }
        if (input.startTime >= input.endTime) {
            setError(error => ({ ...error, time: 'Giờ bắt đầu không được lớn hơn giờ kết thúc' }));
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
                <Link to="/menus"><StyledBackIcon /></Link>
                <Title><TitleGrey>Bảng giá </TitleGrey>/ Tạo bảng giá mới</Title>
            </Row>
            
            <form onSubmit={handleAddMenu} id="form">
                <ContainerWrapper>
                    <StyledFormLabel>Tiêu đề</StyledFormLabel>
                    <StyledTextFieldMb
                        fullWidth placeholder="Ví dụ: Thịt cá các loại, đồ gia dụng, etc" 
                        inputProps={{style: {fontSize: 14}}}
                        value={input.name ? input.name : ''} name='name'
                        onChange={handleChange}
                        error={error.name !== ''}
                        helperText={error.name}
                    />

                    <StyledFormLabel>Mô tả</StyledFormLabel>
                    <TextField
                        fullWidth multiline rows={4}
                        inputProps={{style: {fontSize: 14}}}
                        value={input.description ? input.description : ''} name='description'
                        onChange={handleChange}
                    />
                </ContainerWrapper>

                <ContainerWrapper>
                    <StyledFormLabel>Loại bảng giá</StyledFormLabel>

                    <RadioGroup value={input.type} name='type' onChange={handleChange}>
                        <FormControlLabel 
                            value="Tươi sống" 
                            control={<Radio />} 
                            label={<RadioLabel>Tươi sống</RadioLabel>} 
                        />
                        <HelperText>
                            Bảng giá thuộc lại tươi sống sẽ nằm bên mục&nbsp;<b>Tươi sống</b>. 
                            Tìm hiểu thêm về&nbsp;<StyledLink to="/menus">danh mục tươi sống</StyledLink>
                        </HelperText>

                        <FormControlLabel 
                            value="Khác" 
                            control={<Radio />} 
                            label={<RadioLabel>Khác</RadioLabel>} 
                        />
                        <HelperText>
                            Bảng giá thuộc lại khác sẽ nằm bên mục&nbsp;<b>Khác</b>. 
                            Tìm hiểu thêm về&nbsp;<StyledLink to="/menus">danh mục khác</StyledLink>
                        </HelperText>
                    </RadioGroup>
                </ContainerWrapper>

                <ContainerWrapper>
                    <StyledFormLabel>Ngày hoạt động</StyledFormLabel>
                    
                    <DatePickerWrapper>
                        <FormControlLabel checked={repeatDay.t2 && repeatDay.t3 && repeatDay.t4 && repeatDay.t5 && repeatDay.t6 && repeatDay.t7 && repeatDay.cn} onClick={handleToggleAllDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Chọn toàn bộ</span>} labelPlacement="top" />
                        <FormControlLabel checked={repeatDay.t2} name='t2' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Thứ 2</span>} labelPlacement="top" />
                        <FormControlLabel checked={repeatDay.t3} name='t3' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Thứ 3</span>} labelPlacement="top" />
                        <FormControlLabel checked={repeatDay.t4} name='t4' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Thứ 4</span>} labelPlacement="top" />
                        <FormControlLabel checked={repeatDay.t5} name='t5' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Thứ 5</span>} labelPlacement="top" />
                        <FormControlLabel checked={repeatDay.t6} name='t6' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Thứ 6</span>} labelPlacement="top" />
                        <FormControlLabel checked={repeatDay.t7} name='t7' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Thứ 7</span>} labelPlacement="top" />
                        <FormControlLabel checked={repeatDay.cn} name='cn' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>C.Nhật</span>} labelPlacement="top" />
                    </DatePickerWrapper>

                    <HelperText error>{error.repeatDay}</HelperText>
                </ContainerWrapper>

                <ContainerWrapper>
                    <StyledFormLabel>Thời gian hoạt động</StyledFormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePickerWrapper>
                            <TimePicker 
                                    value={input.startTime}
                                    onChange={time => handleChange({ target: { value: time.toISOString(), name: 'startTime' } })} 
                                    renderInput={(params) => <TextField {...params} error={error.time !== ''} helperText={error.time} />} />

                                <StyledArrowIcon />

                                <TimePicker 
                                    value={input.endTime}
                                    onChange={time => handleChange({ target: { value: time.toISOString(), name: 'endTime' } })} 
                                    renderInput={(params) => <TextField {...params} error={error.time !== ''} helperText={error.time} />} />
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