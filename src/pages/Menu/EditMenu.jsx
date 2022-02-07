import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../../RequestMethod";
import { KeyboardBackspace, ArrowRight, Search, AddBox } from '@mui/icons-material';
import { TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { TimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DateTime } from 'luxon';

import Products from '../../mockdata/Products';
import Menus from '../../mockdata/Menus';
import ProductList from '../../components/Product/ProductList';

const PageWrapper = styled.form`
    width: 1080px;
    margin: 40px auto;
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: flex-start;
`;

const ProductWrapper = styled.div`
    flex: 2;
    padding: 0px 20px 30px 20px;
    margin-right: 30px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: #fff;
    border-radius: 5px;
`;

const ProductListWrapper = styled.div`
    margin-top: 25px;
    border-top: 1px solid #dee2e6;
    
`;

const MenuWrapper = styled.div`
    flex: 1;
    padding: 0px 20px 30px 20px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: #fff;
    border-radius: 5px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
`;

const SpaceBetween = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
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

const StyledSearchIcon = styled(Search)`
    && {
        color: grey;
    }
`;

const SearchBar = styled.div`
    display: flex;
    width: 70%;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #D8D8D8;
    border-style: solid;
    border-width: thin;
    height: 44px;
    padding: 0px 3px 0px 8px;
    background-color: #ffffff;
    margin-right: 2%;
`;

const Input = styled.input`
    padding: 4px;
    flex-grow: 1;
    background-color: transparent;
    outline: none;
    border: none;
    margin-right: 8px;

    &:focus {
    outline: 0;
    }
`;

const AddButton = styled.button`
    display: flex;
    padding: 6px 10px;
    margin: 20px 0px 15px 0px;
    background-color: #17a2b8;
    border-style: none;
    border-radius: 5px;
    color: #fff;
    font-size: 13px;
    align-items: center;

    &:active {
    transform: translateY(1px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const StyledAddIcon = styled(AddBox)`
    && {
        font-size: 18px;
        margin-right: 4px;
    }
`;

const DropdownWrapper = styled.div`
    display: flex;
    width: ${props => props.width};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #D8D8D8;
    border-style: solid;
    border-width: thin;
    height: 44px;
    padding: 0px 3px 0px 8px;
    background-color: #ffffff;
`;

const Select = styled.select`
    padding: 4px;
    flex-grow: 1;
    background-color: transparent;
    outline: none;
    border: none;

    &:focus {
    outline: 0;
    }
`;

const DatePickerWrapper = styled.div`
    margin: 20px 0px 0px 0px;
    display: flex;
    justify-content: center;
`;

const WeekDayCheckbox = styled.button`
    padding: 7px 13px;
    margin-right: 1px;
    border: 1px solid ${props => props.checked === true ? "#c7c7c7" : "#c7c7c7"};
    background-color: ${props => props.checked === true ? "#E0E0E0" : "#fff"};
    border-radius: 2px;
    font-size: 13px;

    &:active {
    transform: translateY(1px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const TimePickerWrapper = styled.div`
    margin: 20px 0px 0px 0px;
    display: flex;
    justify-content: center;
`;

const StyledArrowIcon = styled(ArrowRight)`
    && {
    margin: 16px 5px;
    }
`;

const StyledFormLabel = styled.div`
    font-weight: 700;
    margin: 30px 0px 10px 0px;
`;

const RadioLabel = styled.span`
    font-size: 14px;
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

const EditMenu = () => {
    let navigate = useNavigate();

    const [menu, setMenu] = useState([]);
    const [products, setProducts] = useState([]);

    const [input, setInput] = useState({
        'title': '',
        'description': '',
        'type': 'Tươi sống',
        'startTime': '',
        'endTime': '',
        'status': 0
    });
    const [dateOfWeek, setDateOfWeek] = useState({ t2:true, t3:false, t4:false, t5:false, t6:false, t7:false, cn:false });

    const [error, setError] = useState({ 'titleError': '', 'timeError': '' });
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState(0);
    const [change, setChange] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    }

    function handleToggleDate(e) {
        const { name, checked } = e.target;
        setDateOfWeek(date => ({ ...date, [name]: !checked }));
    }

    useEffect(() => {
        //const url = "menu/1";

        const fetchData = async () => {
            try {
                /*const res = await fetch(publicRequest(url), { method: 'GET' });
                const json = await res.json();*/
                setMenu(Menus[0]);
            } catch (error) { }
        };
        fetchData();
    }, [change]);

    useEffect(() => {
        //const url = "menu/1";

        const fetchData = async () => {
            try {
                /*const res = await fetch(publicRequest(url), { method: 'GET' });
                const json = await res.json();*/
                setProducts(Products);
            } catch (error) { }
        };
        fetchData();
    }, [change]);

    useEffect(() => {
        setInput({
            'title': menu.MenuName, 
            'description': menu.Description, 
            'type': menu.Type, 
            'startTime': DateTime.fromISO(menu.StartTime), 
            'endTime': DateTime.fromISO(menu.EndTime), 
            'status': menu.Status
        });
    }, [menu]);

    useEffect(() => {
        let string = '';
        if (dateOfWeek.t2 === true) {
            string = string.concat('2');
        }
        if (dateOfWeek.t3 === true) {
            string = string.concat('3');
        }
        if (dateOfWeek.t4 === true) {
            string = string.concat('4');
        }
        if (dateOfWeek.t5 === true) {
            string = string.concat('5');
        }
        if (dateOfWeek.t6 === true) {
            string = string.concat('6');
        }
        if (dateOfWeek.t7 === true) {
            string = string.concat('7');
        }
        if (dateOfWeek.cn === true) {
            string = string.concat('8');
        }
        console.log(string);
    }, [dateOfWeek]);

    const handleEditMenu = (event) => {
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
                            startTime: DateTime.fromISO(input.StartTime).toFormat('HH:mm:ss'),
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
        <PageWrapper onSubmit={handleEditMenu} id="form">
            <Row>
                <Link to="/menus"><StyledBackIcon /></Link>
                <Title><TitleGrey>Bảng giá </TitleGrey>/ Thịt cá các loại</Title>
            </Row>

            <FlexWrapper>
                <ProductWrapper>
                    <SpaceBetween>
                        <StyledFormLabel>Sản phẩm</StyledFormLabel>
                        <AddButton>
                            <StyledAddIcon />
                            Thêm sản phẩm
                        </AddButton>
                    </SpaceBetween>

                    <Row>
                        <SearchBar>
                            <StyledSearchIcon />
                            <Input id="search" placeholder="Tìm kiếm sản phẩm" onChange={event => setSearch(event.target.value)}/>
                        </SearchBar>

                        <DropdownWrapper width="30%">
                            <Select value={sort} onChange={event => setSort(event.target.value)}>
                                <option value="0">Sắp xếp: Mới nhất</option>
                                <option value="1">Sắp xếp: Cũ nhất</option>
                                <option value="2">Sắp xếp: Giá cao nhất</option>
                                <option value="3">Sắp xếp: Giá thấp nhất</option>
                            </Select>
                        </DropdownWrapper>
                    </Row>
                    
                    <ProductListWrapper>
                        <ProductList currentItems={products} />
                    </ProductListWrapper>
                </ProductWrapper>
                
                <MenuWrapper>
                    <StyledFormLabel>Tiêu đề</StyledFormLabel>
                    <TextField
                        fullWidth placeholder="Ví dụ: Thịt cá các loại, đồ gia dụng, etc" 
                        inputProps={{style: {fontSize: 14}}}
                        value={input.title ? input.title : ''} name='title'
                        onChange={handleChange}
                        error={error.titleError !== ''}
                        helperText={error.titleError}
                    />

                    <StyledFormLabel>Mô tả</StyledFormLabel>
                    <TextField
                        fullWidth multiline rows={3}
                        inputProps={{style: {fontSize: 14}}}
                        value={input.description ? input.description : ''} name='description'
                        onChange={handleChange}
                    />

                    <StyledFormLabel>Loại bảng giá</StyledFormLabel>

                    <RadioGroup value={input.type ? input.type : 'Tươi sống'} name='type' onChange={handleChange}>
                        <FormControlLabel value='Tươi sống' control={<Radio />} label={<RadioLabel>Tươi sống</RadioLabel>} />
                        <FormControlLabel value='Khác' control={<Radio />} label={<RadioLabel>Khác</RadioLabel>} />
                    </RadioGroup>

                    <StyledFormLabel>Ngày hoạt động</StyledFormLabel>
                    
                    <DatePickerWrapper>
                        <WeekDayCheckbox checked={dateOfWeek.t2} name='t2' onClick={handleToggleDate}>T2</WeekDayCheckbox>
                        <WeekDayCheckbox checked={dateOfWeek.t3} name='t3' onClick={handleToggleDate}>T3</WeekDayCheckbox>
                        <WeekDayCheckbox checked={dateOfWeek.t4} name='t4' onClick={handleToggleDate}>T4</WeekDayCheckbox>
                        <WeekDayCheckbox checked={dateOfWeek.t5} name='t5' onClick={handleToggleDate}>T5</WeekDayCheckbox>
                        <WeekDayCheckbox checked={dateOfWeek.t6} name='t6' onClick={handleToggleDate}>T6</WeekDayCheckbox>
                        <WeekDayCheckbox checked={dateOfWeek.t7} name='t7' onClick={handleToggleDate}>T7</WeekDayCheckbox>
                        <WeekDayCheckbox checked={dateOfWeek.cn} name='cn' onClick={handleToggleDate}>CN</WeekDayCheckbox>
                    </DatePickerWrapper>

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
                </MenuWrapper>
            </FlexWrapper>

            
            <FooterWrapper>
                <FloatRight>
                    <Button>Lưu</Button>
                </FloatRight>
            </FooterWrapper>
        </PageWrapper>
    )
}

export default EditMenu;