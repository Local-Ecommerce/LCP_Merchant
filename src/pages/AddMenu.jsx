import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { api } from "../RequestMethod";
import { toast } from 'react-toastify';
import { KeyboardBackspace, ArrowRight } from '@mui/icons-material';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';
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
    margin: 10px 20px 0px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledArrowIcon = styled(ArrowRight)`
    && {
    margin: 20px;
    }
`;

const StyledTextFieldMb30px = styled(TextField)`
    && {
    margin-bottom: 30px;
    }
`;

const StyledTextFieldMb20px = styled(TextField)`
    && {
    margin-bottom: 20px;
    }
`;

const FormLabel = styled.div`
    font-weight: 700;
    margin-bottom: 10px;
`;

const HelperText = styled.div`
    margin-left: ${props => props.ml0 ? "0px" : "30px"};
    align-items: center;
    text-decoration: none;
    font-size: ${props => props.error ? "13px" : "14px"};
    line-height: 1.5;
    margin-top: ${props => props.error ? "10px" : "0px"};
    color: ${props => props.error ? props.theme.red : "#727272"};
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

const StyledLink = styled.a`
    color: #007bff;
    cursor: pointer;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
    && {
        margin-left: 40px;
    }
`;

const AddMenu = () => {
    let navigate = useNavigate();
    const [storeId, setStoreId] = useState('');

    const [input, setInput] = useState({ 
        name: '', 
        description: '',
        includeBaseMenu: true,
        startTime: DateTime.fromFormat('00:00:00', 'TT').toUTC().toISO(), 
        endTime: DateTime.fromFormat('00:00:00', 'TT').toUTC().toISO(), 
        status: 9001 
    });
    const [repeatDay, setRepeatDay] = useState({ t2:false, t3:false, t4:false, t5:false, t6:false, t7:false, cn:false });
    const [twentyfour, setTwentyfour] = useState(false);
    const [error, setError] = useState({ name: '', repeatDate: '', time: '' });

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
        if (name === 'startTime' || name === 'endTime') {
            setError(error => ({ ...error, time: '' }));
        } else {
            setError(error => ({ ...error, [name]: '' }));
        }
    }

    function handleToggleIncludeBaseMenu(e) {
        const { checked } = e.target;
        setInput(input => ({ ...input, includeBaseMenu: checked }));
    }

    function handleToggleDate(e) {
        setError(error => ({ ...error, repeatDay: '' }));
        const { name, checked } = e.target;
        setRepeatDay(date => ({ ...date, [name]: checked }));
    }

    function handleToggleAllDate(e) {
        setError(error => ({ ...error, repeatDay: '' }));
        const { checked } = e.target;
        setRepeatDay({ t2:checked, t3:checked, t4:checked, t5:checked, t6:checked, t7:checked, cn:checked });
    }

    const handleSetTime = () => {
        setError(error => ({ ...error, time: '' }));
        setTwentyfour(!twentyfour);
    }

    useEffect(() => {
        console.log(input)
    }, [input])

    const handleAddMenu = (event) => {
        event.preventDefault();

        if (checkValid()) {
            const notification = toast.loading("Đang xử lí yêu cầu...");
            const addData = async () => {
                api.post("menus", {
                    menuName: input.name,
                    menuDescription: input.description,
                    timeStart: twentyfour ? '00:00:00' : DateTime.fromISO(input.startTime).toFormat('TT'),
                    timeEnd: twentyfour || DateTime.fromISO(input.endTime).toFormat('TT') === '00:00:00' ?
                             '23:59:59': DateTime.fromISO(input.endTime).toFormat('TT'),
                    repeatDate: (repeatDay.cn ? '0' : '')
                              + (repeatDay.t2 ? '1' : '') 
                              + (repeatDay.t3 ? '2' : '') 
                              + (repeatDay.t4 ? '3' : '') 
                              + (repeatDay.t5 ? '4' : '') 
                              + (repeatDay.t6 ? '5' : '') 
                              + (repeatDay.t7 ? '6' : ''),
                    includeBaseMenu: input.includeBaseMenu,
                    merchantStoreId: storeId
                })
                .then(function (res) {
                    console.log(res)
                    if (res.data.ResultMessage === "SUCCESS") {
                        navigate("/menus");
                        toast.update(notification, { render: "Tạo bảng giá thành công!", type: "success", autoClose: 5000, isLoading: false });
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
        if (!twentyfour && DateTime.fromISO(input.endTime).toFormat('TT') !== '00:00:00' && input.startTime >= input.endTime) {
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
                    <Row spacebetween>
                        <FormLabel>Tiêu đề</FormLabel>
                        <HelperText ml0>{input.name.length}/250 kí tự</HelperText>
                    </Row>
                    
                    <StyledTextFieldMb30px
                        fullWidth placeholder="Ví dụ: Thịt cá các loại, đồ gia dụng, etc" 
                        inputProps={{ maxLength: 250, style: {fontSize: 14} }}
                        value={input.name ? input.name : ''} name='name'
                        onChange={handleChange}
                        error={error.name !== ''}
                        helperText={error.name}
                    />

                    <Row spacebetween>
                        <FormLabel>Mô tả</FormLabel>
                        <HelperText ml0>{input.description.length}/500 kí tự</HelperText>
                    </Row>

                    <StyledTextFieldMb20px
                        fullWidth multiline rows={4} placeholder="Mô tả giúp khách hàng hình dung và hiểu rõ hơn sản phẩm thuộc bảng giá."
                        inputProps={{ maxLength: 500, style: {fontSize: 14}}}
                        value={input.description ? input.description : ''} name='description'
                        onChange={handleChange}
                    />

                    <FormControlLabel 
                        checked={input.includeBaseMenu} name='includeBaseMenu' 
                        onClick={handleToggleIncludeBaseMenu} 
                        control={<Checkbox />} 
                        label={<span style={{ fontSize: '14px' }}>Tích hợp bảng giá cơ bản</span>} 
                    />
                    <HelperText>
                        Các sản phẩm thuộc bảng giá cơ bản vẫn sẽ tiếp tục bán khi đến giờ hoạt động của bảng giá này.<br/>
                        Tìm hiểu thêm về&nbsp;<StyledLink href="https://vi.wikipedia.org/wiki/Th%E1%BB%B1c_ph%E1%BA%A9m_t%C6%B0%C6%A1i_s%E1%BB%91ng"
                                            target="_blank">các loại bảng giá</StyledLink>
                    </HelperText>
                </ContainerWrapper>

                <ContainerWrapper>
                    <FormLabel>Ngày hoạt động</FormLabel>
                    
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
                    <FormLabel>Thời gian hoạt động</FormLabel>
                    <StyledFormControlLabel 
                        style={{ pointerEvents: "none" }}
                        control={
                            <Checkbox
                                onClick={handleSetTime}
                                style={{ pointerEvents: "auto" }}
                            />
                        }
                        label={<span style={{ fontSize: '14px' }}>Hoạt động 24h</span>} 
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePickerWrapper>
                            <TimePicker 
                                disabled={twentyfour ? true : false} ampm={false}
                                label={twentyfour ? "00:00:00" : "Thời gian bắt đầu"}
                                value={twentyfour ? null :input.startTime}
                                onChange={time => handleChange({ target: { value: time.toISOString(), name: 'startTime' } })} 
                                renderInput={(params) => <TextField disabled {...params} error={error.time !== ''} helperText={error.time} />} 
                            />

                            <StyledArrowIcon />

                            <TimePicker 
                                disabled={twentyfour ? true : false} ampm={false}
                                label={twentyfour ? "00:00:00" : "Thời gian kết thúc"}
                                value={twentyfour ? null :input.endTime}
                                onChange={time => handleChange({ target: { value: time.toISOString(), name: 'endTime' } })} 
                                renderInput={(params) => <TextField disabled {...params} error={error.time !== ''} helperText={error.time} />} 
                            />
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