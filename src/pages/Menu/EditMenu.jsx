import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from "react-router-dom";
import { api } from "../../RequestMethod";
import { toast } from 'react-toastify';
import { KeyboardBackspace, ArrowRight, Search, AddBox } from '@mui/icons-material';
import { TextField, Radio, RadioGroup, FormControlLabel, CircularProgress } from '@mui/material';
import { TimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DateTime } from 'luxon';

import Products from '../../mockdata/Products';
import Menus from '../../mockdata/Menus';
import AddItemModal from './AddItemModal';
import ConfirmModal from './ConfirmModal';
import ProductList from '../../components/Product/ProductList';

const PageWrapper = styled.form`
    min-width: 720px;
    max-width: 1080px;
    margin: 40px auto;
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
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

const Center = styled.div`
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    top: 45%;
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
    background-color: ${props => props.theme.blue};
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
    align-items: center; 
    justify-content: center;
`;

const StyledArrowIcon = styled(ArrowRight)`
    && {
    margin: 5px;
    }
`;

const FormLabel = styled.div`
    font-weight: 700;
    font-size: 15px;
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

const NoProductWrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    height: auto;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
`;

const NoProductTitle = styled.div`
    margin: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 18px;
    font-weight: 600;
    color: ${props => props.theme.grey};
`;

const NoProductButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    background-color: ${props => props.theme.blue};
    color: white;
    font-weight: 600;
    margin-top: 10px;

    &:active {
    transform: translateY(1px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const EditMenu = () => {
    const { id } = useParams();
    const [confirmModal, setConfirmModal] = useState(false);
    const toggleConfirmModal = () => { setConfirmModal(!confirmModal); }
    const [addItemModal, setAddItemModal] = useState(false);
    const toggleAddItemModal = () => { setAddItemModal(!addItemModal); }
    const [stockItems, setStockItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    const [menu, setMenu] = useState([]);
    const [products, setProducts] = useState([]);

    const [input, setInput] = useState({ id: '', name: '', description: '', startTime: '', endTime: '' });
    const [repeatDay, setRepeatDay] = useState({ t2:true, t3:true, t4:true, t5:true, t6:true, t7:true, cn:true });
    const [error, setError] = useState({ 'name': '', 'timeError': '' });

    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState(0);
    const [change, setChange] = useState(false);

    useEffect(() => {
        setLoading(true);
        let url = "menus?id=" + id;
        const fetchData = () => {
            api.get(url)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    setMenu(res.data.Data.List[0]);
                    setProducts(res.data.Data.List[0].ProductInMenus);
                    setInput({
                        id: res.data.Data.List[0].MenuId, 
                        name: res.data.Data.List[0].MenuName, 
                        description: res.data.Data.List[0].MenuDescription, 
                        startTime: DateTime.fromFormat(res.data.Data.List[0].TimeStart, 'TT').toUTC().toISO(),
                        endTime: DateTime.fromFormat(res.data.Data.List[0].TimeEnd, 'TT').toUTC().toISO(),
                    });
                    setRepeatDay({
                        t2: res.data.Data.List[0].RepeatDate.includes('2') ? true : false,
                        t3: res.data.Data.List[0].RepeatDate.includes('3') ? true : false,
                        t4: res.data.Data.List[0].RepeatDate.includes('4') ? true : false,
                        t5: res.data.Data.List[0].RepeatDate.includes('5') ? true : false,
                        t6: res.data.Data.List[0].RepeatDate.includes('6') ? true : false,
                        t7: res.data.Data.List[0].RepeatDate.includes('7') ? true : false,
                        cn: res.data.Data.List[0].RepeatDate.includes('8') ? true : false
                    });
                    setLoading(false);
                }
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
        }
        fetchData();
    }, [change]);

    useEffect(() => {
        setStockItems(Products);
    }, []);
    
    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
    }

    function handleToggleDate(e) {
        const { name, checked } = e.target;
        setRepeatDay(date => ({ ...date, [name]: !checked }));
    }
    
    const handleEditItem = (event) => {
        event.preventDefault();

        if (checkValid()) {
            const notification = toast.loading("Đang xử lí yêu cầu...");
            const url = "menus?id=" + id;
            const addData = async () => {
                api.put(url, {
                    menuName: input.name,
                    menuDescription: input.description,
                    timeStart: DateTime.fromISO(input.startTime).toFormat('TT'),
                    timeEnd: DateTime.fromISO(input.endTime).toFormat('TT'),
                    repeatDate: (repeatDay.t2 ? '2' : '') 
                                + (repeatDay.t3 ? '3' : '') 
                                + (repeatDay.t4 ? '4' : '') 
                                + (repeatDay.t5 ? '5' : '') 
                                + (repeatDay.t6 ? '6' : '') 
                                + (repeatDay.t7 ? '7' : '') 
                                + (repeatDay.cn ? '8' : '')
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        toast.update(notification, { render: "Cập nhật bảng giá thành công!", type: "success", autoClose: 5000, isLoading: false });
                        setChange(!change);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
                });
            };
            addData();
            toggleConfirmModal();
        }
    }

    const checkValid = () => {
        let check = false;
        setError(error => ({ ...error, name: '', timeError: '' }));

        if (input.title === null || input.title === '') {
            setError(error => ({ ...error, name: 'Vui lòng nhập tiêu đề' }));
            check = true;
        }
        if (input.startTime >= input.endTime) {
            setError(error => ({ ...error, timeError: 'Giờ bắt đầu không được lớn hơn giờ kết thúc' }));
            check = true;
        }
        if (check) {
            return false;
        }
        
        return true;
    }

    const checkValidBeforeConfirm = () => {
        if (checkValid()) {
            toggleConfirmModal();
        }
    }

    const handleGetNewProducts = (products) => {
        setProducts(products);
    }

    const handleDeleteItem = (deleteItem) => {
        setMenuItems(menuItems.filter(item => item.ProductId !== deleteItem.ProductId));
        setProducts(products.filter(item => item.ProductId !== deleteItem.ProductId));
        stockItems.push(deleteItem);
    }

    return (
        <PageWrapper>
            <Row>
                <Link to="/menus"><StyledBackIcon /></Link>
                <Title><TitleGrey>Bảng giá </TitleGrey>/ {menu.MenuName}</Title>
            </Row>

            <FlexWrapper>
                <ProductWrapper>
                    <SpaceBetween>
                        <FormLabel>Sản phẩm</FormLabel>
                        {
                            (products && products.length) ?
                            <AddButton type="button" onClick={toggleAddItemModal}> 
                                <StyledAddIcon />
                                Thêm sản phẩm 
                            </AddButton>
                            : 
                            null
                        }
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
                        {
                            products && products.length ?
                            <ProductList 
                                currentItems={products} 
                                handleDeleteItem={handleDeleteItem}
                            />
                            : 
                            <NoProductWrapper>
                                <NoProductTitle> Bảng giá chưa có sản phẩm</NoProductTitle>
                                <NoProductButton type="button" onClick={toggleAddItemModal}> Thêm sản phẩm </NoProductButton>
                            </NoProductWrapper>
                        }
                    </ProductListWrapper>
                </ProductWrapper>
                
                <MenuWrapper>
                    <FormLabel>Tiêu đề</FormLabel>
                    <TextField
                        fullWidth size="small" placeholder="Ví dụ: Thịt cá các loại, đồ gia dụng, etc" 
                        inputProps={{style: {fontSize: 14}}}
                        value={loading ? 'Loading ...' : input.name} name='name'
                        onChange={handleChange}
                        error={error.name !== ''}
                        helperText={error.name}
                    />

                    <FormLabel>Mô tả</FormLabel>
                    <TextField
                        fullWidth size="small" multiline rows={3}
                        inputProps={{style: {fontSize: 14}}}
                        value={loading ? 'Loading ...' : input.description} name='description'
                        onChange={handleChange}
                    />

                    <FormLabel>Ngày hoạt động</FormLabel>
                    <DatePickerWrapper>
                        <WeekDayCheckbox type="button" checked={repeatDay.t2} name='t2' onClick={handleToggleDate}>T2</WeekDayCheckbox>
                        <WeekDayCheckbox type="button" checked={repeatDay.t3} name='t3' onClick={handleToggleDate}>T3</WeekDayCheckbox>
                        <WeekDayCheckbox type="button" checked={repeatDay.t4} name='t4' onClick={handleToggleDate}>T4</WeekDayCheckbox>
                        <WeekDayCheckbox type="button" checked={repeatDay.t5} name='t5' onClick={handleToggleDate}>T5</WeekDayCheckbox>
                        <WeekDayCheckbox type="button" checked={repeatDay.t6} name='t6' onClick={handleToggleDate}>T6</WeekDayCheckbox>
                        <WeekDayCheckbox type="button" checked={repeatDay.t7} name='t7' onClick={handleToggleDate}>T7</WeekDayCheckbox>
                        <WeekDayCheckbox type="button" checked={repeatDay.cn} name='cn' onClick={handleToggleDate}>CN</WeekDayCheckbox>
                    </DatePickerWrapper>

                    <FormLabel>Thời gian hoạt động</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePickerWrapper>
                            <TimePicker 
                                value={input.startTime} ampm={false}
                                onChange={time => handleChange({ target: { value: time.toISOString(), name: 'startTime' } })} 
                                renderInput={(params) => <TextField {...params} size="small" error={error.timeError !== ''} helperText={error.timeError} />} />

                            <StyledArrowIcon />

                            <TimePicker 
                                value={input.endTime} ampm={false}
                                onChange={time => handleChange({ target: { value: time.toISOString(), name: 'endTime' } })} 
                                renderInput={(params) => <TextField {...params} size="small" error={error.timeError !== ''} helperText={error.timeError} />} />
                        </TimePickerWrapper>
                    </LocalizationProvider>
                </MenuWrapper>
            </FlexWrapper>
            
            <FooterWrapper>
                <FloatRight>
                    <Button type="button" onClick={checkValidBeforeConfirm}>Cập nhật</Button>
                </FloatRight>
            </FooterWrapper>

            <AddItemModal 
                display={addItemModal} 
                toggle={toggleAddItemModal}
                stockItems={stockItems}
                menuItems={menuItems}
                setStockItems={setStockItems}
                setMenuItems={setMenuItems}
                getNewProducts={handleGetNewProducts}
            />

            <ConfirmModal
                display={confirmModal} 
                toggle={toggleConfirmModal}
                name={menu.MenuName}
                handleEditItem={handleEditItem}
            />
        </PageWrapper>
    )
}

export default EditMenu;