
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams, useNavigate } from "react-router-dom";
import { api } from "../RequestMethod";
import { toast } from 'react-toastify';
import { KeyboardBackspace, ArrowRight, Search, AddBox, CalendarToday } from '@mui/icons-material';
import { TextField, CircularProgress, Checkbox, FormControlLabel } from '@mui/material';
import { MobileTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DateTime } from 'luxon';
import Modal from 'react-modal';
import * as Constant from '../Constant';

import AddItemModal from '../components/Menu/AddItemModal';
import ConfirmModal from '../components/Menu/ConfirmModal';
import ProductInMenuList from '../components/Menu/ProductInMenuList';
import MenuSchedule from '../components/Menu/MenuSchedule';

const PageWrapper = styled.form`
    min-width: 720px;
    max-width: 1200px;
    margin: 40px auto;
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

const ProductWrapper = styled.div`
    flex: 3;
    padding: 0px 20px 30px 20px;
    margin-right: 30px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: #fff;
    border-radius: 5px;
`;

const ProductListWrapper = styled.div`
    margin-top: 25px;    
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
    justify-content: ${props => props.spacebetween ? "space-between" : null};
    margin-top: ${props => props.mt ? "20px" : null};
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
    padding: 7px 10px;
    margin-right: 1px;
    border: 1px solid ${props => props.checked === true ? props.theme.blue : "rgba(0,0,0,0.2)"};
    background-color: ${props => props.checked === true ? props.theme.lightblue : props.theme.white};
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
        margin: 0px;
    }
`;

const FormLabel = styled.div`
    font-weight: 700;
    font-size: 15px;
    margin: 25px 0px 10px 0px;
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

const HelperText = styled.div`
    margin-left: ${props => props.ml0 ? "0px" : "30px"};
    align-items: center;
    text-decoration: none;
    font-size: ${props => props.error ? "13px" : "14px"};
    margin-top: ${props => props.mt ? "20px" : props.error ? "10px" : "0px"};
    color: ${props => props.error ? props.theme.red : "#727272"};
`;

const StyledCircularProgress = styled(CircularProgress)`
    && {
        margin: 30px;
    }
`;

const StyledTextFieldMb20px = styled(TextField)`
    && {
    margin-bottom: 20px;
    }
`;

const DangerText = styled.div`
    color: #762a36;
    padding: 10px 20px;
    background: #f8d7da;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 5px;
    font-size: 14px;
`;

const StyledCalendarIcon = styled(CalendarToday)`
    && {
        font-size: 16px;
        padding: 8px;
        border: 1px solid rgba(0,0,0,0.2);
        color: ${props => props.theme.black};
        background-color: ${props => props.theme.white};
        cursor: pointer;
        margin: 30px 0px 0px 0px;

        &:hover {
            background-color: ${props => props.theme.hover};
        }
    }
`;

const ModalWrapper = styled.div`
`;

const ModalContentWrapper = styled.div`
    min-height: 200px;
    max-height: 80vh;
    overflow-y: auto;
`;

const ModalButtonWrapper = styled.div`
    border-top: 1px solid #cfd2d4;
    padding: 20px;
    display: flex;
    justify-content: flex-end;
`;

const ModalButton = styled.button`
    min-width: 80px;
    padding: 10px;
    margin-left: 10px;
    background: ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.white};
    color: ${props => props.red || props.blue ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.greyBorder};
    border-radius: 4px;
    text-align: center;
    font-size: 1rem;
    font-size: 14px;
    font-weight: 600;

    &:hover {
    opacity: 0.8;
    }

    &:focus {
    outline: 0;
    }

    &:active {
    transform: translateY(1px);
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '20%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const EditMenu = () => {
    const { id } = useParams();
    let navigate = useNavigate();
    const [confirmModal, setConfirmModal] = useState(false);
    const toggleConfirmModal = () => { setConfirmModal(!confirmModal); }
    const [addItemModal, setAddItemModal] = useState(false);
    const toggleAddItemModal = () => { setAddItemModal(!addItemModal); }
    const [menuModal, setMenuModal] = useState(false);
    const toggleMenuModal = () => { setMenuModal(!menuModal) };
    const [menuSchedule, setMenuSchedule] = useState([]);

    const [menu, setMenu] = useState([]);
    const [products, setProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);
    const [stock, setStock] = useState([]);

    const [input, setInput] = useState({ id: '', name: '', description: '', includeBaseMenu: false, startTime: '', endTime: '' });
    const [repeatDay, setRepeatDay] = useState({ t2:true, t3:true, t4:true, t5:true, t6:true, t7:true, cn:true });
    const [twentyfour, setTwentyfour] = useState(false);
    const [error, setError] = useState({ 'name': '', 'time': '', price: '' });

    const [pimLoading, setPimLoading] = useState(false);
    const [menuLoading, setMenuLoading] = useState(false);
    const [productLoading, setProductLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('+createddate');
    const [change, setChange] = useState(false);

    useEffect(() => {   //get menu
        setPimLoading(true);
        setMenuLoading(true);
        setProductLoading(true);

        const fetchData = () => {
            api.get("menus?id=" + id)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    if (res.data.Data.List[0]) {
                        setMenu(res.data.Data.List[0]);
                        setInput({
                            id: res.data.Data.List[0].MenuId, 
                            name: res.data.Data.List[0].MenuName || '', 
                            description: res.data.Data.List[0].MenuDescription || '', 
                            includeBaseMenu: res.data.Data.List[0].IncludeBaseMenu,
                            startTime: DateTime.fromFormat(res.data.Data.List[0].TimeStart, 'TT').toUTC().toISO(),
                            endTime: res.data.Data.List[0].TimeEnd === '23:59:59' ?
                                DateTime.fromFormat('00:00:00', 'TT').toUTC().toISO() 
                                : DateTime.fromFormat(res.data.Data.List[0].TimeEnd, 'TT').toUTC().toISO()
                        });
                        setRepeatDay({
                            t2: res.data.Data.List[0].RepeatDate.includes('1') ? true : false,
                            t3: res.data.Data.List[0].RepeatDate.includes('2') ? true : false,
                            t4: res.data.Data.List[0].RepeatDate.includes('3') ? true : false,
                            t5: res.data.Data.List[0].RepeatDate.includes('4') ? true : false,
                            t6: res.data.Data.List[0].RepeatDate.includes('5') ? true : false,
                            t7: res.data.Data.List[0].RepeatDate.includes('6') ? true : false,
                            cn: res.data.Data.List[0].RepeatDate.includes('0') ? true : false
                        });
                        setTwentyfour(
                            res.data.Data.List[0].TimeStart === '00:00:00'
                            && res.data.Data.List[0].TimeEnd === '23:59:59' ?
                            true : false
                        );

                        api.get("menus?status=" + Constant.ACTIVE_MENU)
                        .then(function (res1) {
                            let array = [];
        
                            res1.data.Data.List.forEach(item => {
                                if (!item.BaseMenu) {
                                    let repeatDate = item.RepeatDate;
                                    if (repeatDate.includes('0')) {
                                        repeatDate = repeatDate.substr(1) + '7';
                                    }
        
                                    let repeatDateArray = [];
                                    for (var i = 0; i < repeatDate.length; i++) {
                                        let string = repeatDate.charAt(i);
                                        if (repeatDateArray.length && repeatDateArray[repeatDateArray.length - 1].includes(parseInt(string) - 1)) {
                                            repeatDateArray[repeatDateArray.length - 1] = repeatDateArray[repeatDateArray.length - 1] + string;
                                        } else {
                                            repeatDateArray.push(string);
                                        }
                                    }
        
                                    repeatDateArray.forEach(date => {
                                        array.push({
                                            MenuId: item.MenuId,
                                            MenuName: item.MenuName,
                                            RepeatDate: date, 
                                            TimeStart: item.TimeStart.slice(0,5),
                                            TimeEnd: item.TimeEnd !== '23:59:59' ? item.TimeEnd.slice(0,5) : '24:00',
                                            TimeStartMillis: milliseconds(item.TimeStart.split(":")[0], item.TimeStart.split(":")[1], 0), 
                                            TimeEndMillis: item.TimeEnd !== '23:59:59' ? 
                                            milliseconds(item.TimeEnd.split(":")[0], item.TimeEnd.split(":")[1], 0)
                                            : milliseconds(24, 0, 0),
                                            Status: item.Status,
                                            Focus: item.MenuId === id ? true : false
                                        });
                                    })
                                }
                            })
                            setMenuSchedule(array);
                            setMenuLoading(false);
                        })

                        let url2 = "menu-products" 
                            + "?menuid=" + id
                            + "&status=" + Constant.ACTIVE_PRODUCT_IN_MENU
                            + "&sort=" + sort
                            + "&include=product";
                        api.get(url2).then(function (res2) {
                            if (res2.data.ResultMessage === "SUCCESS") {
                                setProducts(res2.data.Data);
                                setNewProducts(res2.data.Data.map((item) => ({ 
                                    ...item, 
                                    Price: item.Price.toString().replace(/\D/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                                    RelatedProductInMenu: item.RelatedProductInMenu.map((related) => ({
                                        ...related,
                                        Price: related.Price.toString().replace(/\D/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }))
                                })));
                                setPimLoading(false);
                        
                                let url3 = "products"
                                    + "?sort=" + sort
                                    + "&status=" + Constant.VERIFIED_PRODUCT
                                    + "&status=" + Constant.UNVERIFIED_PRODUCT
                                    + "&status=" + Constant.REJECTED_PRODUCT
                                    + "&include=related";
                                api.get(url3).then(function (res3) {
                                    if (res3.data.ResultMessage === "SUCCESS") {
                                        const tempStock = res3.data.Data.List.map((item) => (
                                            {
                                                Product: item, 
                                                RelatedProductInMenu: item.RelatedProducts.map((related) => ({
                                                    Product: related,
                                                    Price: related.DefaultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                                                    ProductInMenuId: null,
                                                    checked: false,
                                                    MaxBuy: 1,
                                                    Quantity: 0
                                                })),
                                                Price: item.DefaultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 
                                                ProductInMenuId: null,
                                                checked: false,
                                                MaxBuy: 1,
                                                Quantity: 0
                                            }
                                        ));
                                        const productExistInStock = res2.data.Data.filter(o1 => tempStock.some(o2 => o1.ProductId === o2.Product.ProductId));
                                        productExistInStock.forEach((item) => {
                                            let index = tempStock.findIndex(obj => item.ProductId === obj.Product.ProductId);
                                            let product = tempStock[index].Product;
                                            tempStock[index] = {
                                                Product: product,
                                                RelatedProductInMenu: product.RelatedProducts.map((related) => ({
                                                    Product: related,
                                                    Price: item.Price.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                                                    ProductInMenuId: item.ProductInMenuId,
                                                    checked: true,
                                                    MaxBuy: product.MaxBuy,
                                                    Quantity: product.Quantity
                                                })),
                                                Price: item.Price.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","), 
                                                ProductInMenuId: item.ProductInMenuId,
                                                checked: true,
                                                MaxBuy: item.MaxBuy,
                                                Quantity: item.Quantity
                                            };
                                        });
                                        setStock(tempStock);
                                        setProductLoading(false);
                                    }
                                })
                            }
                        })
                    } else {
                        navigate("/404");
                        setPimLoading(false);
                        setMenuLoading(false);
                        setProductLoading(false);
                    }
                }
            })
            .catch(function (error) {
                navigate("/404");
                setPimLoading(false);
                setMenuLoading(false);
                setProductLoading(false);
            });
        }
        fetchData();
    }, [change]);

    const milliseconds = (h, m, s) => ((h*60*60+m*60+s)*1000);

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
        setError(error => ({ ...error, [name]: '' }));
    }

    function handleToggleIncludeBaseMenu(e) {
        const { checked } = e.target;
        setInput(input => ({ ...input, includeBaseMenu: checked }));
    }

    function handleToggleDate(e) {
        const { name, checked } = e.target;
        setRepeatDay(date => ({ ...date, [name]: !checked }));
    }

    const handleSetTime = () => {
        setError(error => ({ ...error, time: '' }));
        setTwentyfour(!twentyfour);
    }

    const handleSetSort = (sort) => {
        setSort(sort);
        if (sort === '+createddate') {
            newProducts.sort((a, b) => new Date(b.Product.CreatedDate) - new Date(a.Product.CreatedDate));
            stock.sort((a, b) => new Date(b.Product.CreatedDate) - new Date(a.Product.CreatedDate));
        } else if (sort === '-createddate') {
            newProducts.sort((a, b) => new Date(a.Product.CreatedDate) - new Date(b.Product.CreatedDate));
            stock.sort((a, b) => new Date(a.Product.CreatedDate) - new Date(b.Product.CreatedDate));
        } else if (sort === '+price') {
            newProducts.sort((a, b) => parseFloat(b.Price.replace(/\D/g, "")) - parseFloat(a.Price.replace(/\D/g, "")));
            stock.sort((a, b) => parseFloat(b.Price.replace(/\D/g, "")) - parseFloat(a.Price.replace(/\D/g, "")));
        } else if (sort === '-price') {
            newProducts.sort((a, b) => parseFloat(a.Price.replace(/\D/g, "")) - parseFloat(b.Price.replace(/\D/g, "")));
            stock.sort((a, b) => parseFloat(a.Price.replace(/\D/g, "")) - parseFloat(b.Price.replace(/\D/g, "")));
        }
    }

    const handleEditItem = (event) => {
        event.preventDefault();

        if (validCheck()) {
            let deleteArray = [];
            let updateArray = [];
            let insertArray = [];

            let flattenProducts = [...products];
            products.forEach((item) => {
                if (item.RelatedProductInMenu && item.RelatedProductInMenu.length > 0) {
                    item.RelatedProductInMenu.forEach((related) => {
                        flattenProducts.push(related);
                    })
                }
            })

            let flattenNewProducts = [...newProducts];
            newProducts.forEach((item) => {
                if (item.RelatedProductInMenu && item.RelatedProductInMenu.length > 0) {
                    item.RelatedProductInMenu.forEach((related) => {
                        flattenNewProducts.push(related);
                    })
                }
            })
            let differenceArray = flattenProducts.filter(
                o1 => !flattenNewProducts.some(o2 => o1.Product.ProductId === o2.Product.ProductId))
                .concat(flattenNewProducts.filter(
                    o1 => !flattenProducts.some(o2 => o1.Product.ProductId === o2.Product.ProductId)
                )
            );

            differenceArray.forEach((item) => {
                if (item.ProductInMenuId !== null) {
                    deleteArray.push(item.ProductInMenuId);
                } else {
                    insertArray.push({
                        productId: item.Product.ProductId,
                        price: item.Price.replace(/\D/g, ""),
                        quantity: item.Quantity,
                        maxBuy: item.MaxBuy
                    });
                }
            });
            updateArray = flattenNewProducts.filter(
                o1 => flattenProducts.some(o2 => o1.Product.ProductId === o2.Product.ProductId
                    && (o1.Price.toString().replace(/\D/g, "") !== o2.Price.toString().replace(/\D/g, "")
                    || o1.Quantity !== o2.Quantity || o1.MaxBuy !== o2.MaxBuy))
            ).map((item) => ({
                productInMenuId: item.ProductInMenuId,
                price: item.Price.replace(/\D/g, ""),
                status: 10001,
                quantity: item.Quantity,
                maxBuy: item.MaxBuy
            }));
            console.log(insertArray)
            let APIarray = [];
            if (menu.MenuName !== input.name 
                || menu.MenuDescription !== input.description
                || menu.RepeatDate !== (repeatDay.t2 ? '2' : '') + (repeatDay.t3 ? '3' : '') + (repeatDay.t4 ? '4' : '') 
                + (repeatDay.t5 ? '5' : '') + (repeatDay.t6 ? '6' : '') + (repeatDay.t7 ? '7' : '') + (repeatDay.cn ? '8' : '')
                || menu.TimeStart !== DateTime.fromISO(input.startTime).toFormat('TT')
                || menu.TimeEnd !== DateTime.fromISO(input.endTime).toFormat('TT')
                || menu.IncludeBaseMenu !== input.includeBaseMenu
                || (twentyfour && (menu.TimeStart !== '00:00:00' || menu.TimeEnd !== '23:59:59'))
            ) {
                APIarray.push();
            }
            if (deleteArray.length) {
                APIarray.push(api.delete("menu-products", {
                    data: deleteArray
                }));
            }
            if (updateArray.length) {
                APIarray.push(api.put("menu-products", {
                    productInMenus: updateArray
                }));
            }
            if (insertArray.length) {
                APIarray.push(api.post("menu-products?menuid=" + id, 
                    insertArray
                ));
            }

            const notification = toast.loading("??ang x??? l?? y??u c???u...");
            api.put("menus?id=" + id, {
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
            })
            .then(function (results) {
                if (APIarray.length) {
                    Promise.all(APIarray)
                    .then(function (results) {
                        setChange(!change);
                        toast.update(notification, { render: "C???p nh???t th??nh c??ng!", type: "success", autoClose: 5000, isLoading: false });
                    })
                } else {
                    setChange(!change);
                    toast.update(notification, { render: "C???p nh???t th??nh c??ng!", type: "success", autoClose: 5000, isLoading: false });
                }
            })
            .catch(function (error) {
                if (error.response.data.ResultMessage) {
                    toast.update(notification, { render: error.response.data.ResultMessage, type: "error", autoClose: 5000, isLoading: false });
                } else {
                    toast.update(notification, { render: "???? x???y ra l???i khi x??? l?? y??u c???u.", type: "error", autoClose: 5000, isLoading: false });
                }
            });
            toggleConfirmModal();
        }
    }

    const validCheck = () => {
        let check = false;
        setError(error => ({ ...error, name: '', time: '', price: '' }));

        if (input.name.trim() === null || input.name.trim() === '') {
            setError(error => ({ ...error, name: 'Vui l??ng nh???p ti??u ?????' }));
            check = true;
        }

        let startTime = DateTime.fromISO(input.startTime).toFormat('T');
        let endTime = DateTime.fromISO(input.endTime).toFormat('T');

        if (!twentyfour) {
            if (endTime === '00:00') {
                if (DateTime.fromFormat(endTime, 'T').toMillis() + 86400000 - DateTime.fromFormat(startTime, 'T').toMillis() >= 0
                && DateTime.fromFormat(endTime, 'T').toMillis() + 86400000 - DateTime.fromFormat(startTime, 'T').toMillis() < 3600000) {
                    setError(error => ({ ...error, time: 'Gi??? b???t ?????u v?? gi??? k???t th??c ph???i c??ch nhau ??t nh???t 1 gi???' }));
                    check = true;
                } else if (DateTime.fromFormat(endTime, 'T').toMillis() + 86400000 - DateTime.fromFormat(startTime, 'T').toMillis() < 0) {
                    setError(error => ({ ...error, time: 'Gi??? b???t ?????u kh??ng ???????c l???n h??n gi??? k???t th??c' }));
                    check = true;
                }
            } 
            else if (DateTime.fromFormat(endTime, 'T').toMillis() - DateTime.fromFormat(startTime, 'T').toMillis() >= 0
            && DateTime.fromFormat(endTime, 'T').toMillis() - DateTime.fromFormat(startTime, 'T').toMillis() < 3600000) {
                setError(error => ({ ...error, time: 'Gi??? b???t ?????u v?? gi??? k???t th??c ph???i c??ch nhau ??t nh???t 1 gi???' }));
                check = true;
            } else if (DateTime.fromFormat(endTime, 'T').toMillis() - DateTime.fromFormat(startTime, 'T').toMillis() < 0) {
                setError(error => ({ ...error, time: 'Gi??? b???t ?????u kh??ng ???????c l???n h??n gi??? k???t th??c' }));
                check = true;
            }
        }

        let flattenNewProducts = [...newProducts];
        newProducts.forEach((item) => {
            if (item.RelatedProductInMenu && item.RelatedProductInMenu.length > 0) {
                item.RelatedProductInMenu.forEach((related) => {
                    flattenNewProducts.push(related);
                })
            }
        })
        flattenNewProducts.forEach((item) => {
            if (item.Price === null || item.Price === '' || item.Price === '0' 
                || item.Price === 0 || parseFloat(item.Price.replace(/\D/g, "")) < 1000) {
                setError(error => ({ ...error, price: 'Vui l??ng nh???p gi?? tr??n 1000 vn??' }));
                check = true;
            }
            if (item.Quantity === null || item.Quantity === '') {
                setError(error => ({ ...error, price: 'Vui l??ng nh???p s??? l?????ng' }));
                check = true;
            }
            if (item.MaxBuy === null || item.MaxBuy === '' || item.MaxBuy === '0' 
                || item.MaxBuy === 0) {
                setError(error => ({ ...error, price: 'Vui l??ng nh???p m???c mua t???i ??a tr??n 0' }));
                check = true;
            }
        })
        
        if (check) {
            return false;
        }
        
        return true;
    }

    const validCheckBeforeConfirm = () => {
        if (validCheck()) {
            toggleConfirmModal();
        }
    }

    const handleSaveItem = (productList) => {
        setNewProducts(productList);
    }

    const handleToggleChecked = (id, checked) => {
        let index = stock.findIndex((item) => item.Product.ProductId === id);
        let newArray = [...stock];
        newArray[index].checked = !checked;
        setStock(newArray);
    }

    const handleSetPrice = (id, value) => {
        setError(error => ({ ...error, price: '' }));
        if (value.replace(/\D/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").length + 1 <= 11) {
            let index = newProducts.findIndex((item) => item.Product.ProductId === id);
            let newArray = [...newProducts];
            newArray[index].Price = value.replace(/\D/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if (newArray[index].RelatedProductInMenu.length) {
                newArray[index].RelatedProductInMenu.forEach((related) => {
                    related.Price = value.replace(/\D/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                })
            }
            setNewProducts(newArray);
            setStock(newArray);
        }
    }

    const handleSetPriceRelated = (belongToId, id, value) => {
        setError(error => ({ ...error, price: '' }));
        if (value.replace(/\D/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").length + 1 <= 11) {
            let index = newProducts.findIndex((item) => item.Product.ProductId === belongToId);
            let childIndex = newProducts[index].RelatedProductInMenu.findIndex((item) => item.Product.ProductId === id);
            let newArray = [...newProducts];
            newArray[index].RelatedProductInMenu[childIndex].Price = value.replace(/\D/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            setNewProducts(newArray);
            setStock(newArray);
        }
    }

    const handleSetMaxBuy = (id, value) => {
        setError(error => ({ ...error, price: '' }));
        let pattern = /^([0-9]*)$/;
        if (value.length + 1 <= 4 && pattern.test(value.trim())) {
            let index = newProducts.findIndex((item) => item.Product.ProductId === id);
            let newArray = [...newProducts];
            newArray[index].MaxBuy = value;
            if (newArray[index].RelatedProductInMenu.length) {
                newArray[index].RelatedProductInMenu.forEach((related) => {
                    related.MaxBuy = value;
                })
            }
            setNewProducts(newArray);
            setStock(newArray);
        }
    }

    const handleSetMaxBuyRelated = (belongToId, id, value) => {
        setError(error => ({ ...error, price: '' }));
        let pattern = /^([0-9]*)$/;
        if (value.length + 1 <= 4 && pattern.test(value.trim())) {
            let index = newProducts.findIndex((item) => item.Product.ProductId === belongToId);
            let childIndex = newProducts[index].RelatedProductInMenu.findIndex((item) => item.Product.ProductId === id);
            let newArray = [...newProducts];
            newArray[index].RelatedProductInMenu[childIndex].MaxBuy = value;
            setNewProducts(newArray);
            setStock(newArray);
        }
    }

    const handleSetQuantity = (id, value) => {
        setError(error => ({ ...error, price: '' }));
        let pattern = /^([0-9]*)$/;
        if (value.length + 1 <= 8 && pattern.test(value.trim())) {
            let index = newProducts.findIndex((item) => item.Product.ProductId === id);
            let newArray = [...newProducts];
            newArray[index].Quantity = value;
            if (newArray[index].RelatedProductInMenu.length) {
                newArray[index].RelatedProductInMenu.forEach((related) => {
                    related.Quantity = value;
                })
            }
            setNewProducts(newArray);
            setStock(newArray);
        }
    }

    const handleSetQuantityRelated = (belongToId, id, value) => {
        setError(error => ({ ...error, price: '' }));
        let pattern = /^([0-9]*)$/;
        if (value.length + 1 <= 8 && pattern.test(value.trim())) {
            let index = newProducts.findIndex((item) => item.Product.ProductId === belongToId);
            let childIndex = newProducts[index].RelatedProductInMenu.findIndex((item) => item.Product.ProductId === id);
            let newArray = [...newProducts];
            newArray[index].RelatedProductInMenu[childIndex].Quantity = value;
            setNewProducts(newArray);
            setStock(newArray);
        }
    }

    const handleDeleteItem = (id) => {
        let index = stock.findIndex((item) => item.Product.ProductId === id);
        let newArray = [...stock];
        newArray[index].checked = false;
        setStock(newArray);
        setNewProducts(newProducts.filter(item => item.Product.ProductId !== id));
    }

    return (
        <PageWrapper>
            <Row>
                <Link to="/menus"><StyledBackIcon /></Link>
                <Title><TitleGrey>B???ng gi?? </TitleGrey>/ {menuLoading ? '' : menu.MenuName}</Title>
            </Row>

            <FlexWrapper>
                <ProductWrapper>
                    <SpaceBetween>
                        <FormLabel>S???n ph???m</FormLabel>
                        {
                            newProducts.length && newProducts.length ?
                            <AddButton type="button" onClick={toggleAddItemModal}> 
                                <StyledAddIcon />
                                Th??m s???n ph???m 
                            </AddButton>
                            : null
                        }
                    </SpaceBetween>

                    <Row>
                        <SearchBar>
                            <StyledSearchIcon />
                            <Input id="search" placeholder="T??m ki???m s???n ph???m" onChange={event => setSearch(event.target.value)}/>
                        </SearchBar>

                        <DropdownWrapper width="30%">
                            <Select value={sort} onChange={e => handleSetSort(e.target.value)}>
                                <option value="+createddate">S???p x???p: M???i nh???t</option>
                                <option value="-createddate">S???p x???p: C?? nh???t</option>
                                <option value="+price">S???p x???p: Gi?? cao nh???t</option>
                                <option value="-price">S???p x???p: Gi?? th???p nh???t</option>
                            </Select>
                        </DropdownWrapper>
                    </Row>
                    
                    <ProductListWrapper>
                        {
                            pimLoading ? 
                            <NoProductWrapper>
                                <StyledCircularProgress />
                            </NoProductWrapper>
                            :
                            <>
                                {
                                    newProducts && newProducts.length ?
                                    <ProductInMenuList 
                                        currentItems={newProducts} 
                                        handleDeleteItem={handleDeleteItem}
                                        handleSetPrice={handleSetPrice}
                                        handleSetPriceRelated={handleSetPriceRelated}
                                        handleSetMaxBuy={handleSetMaxBuy}
                                        handleSetMaxBuyRelated={handleSetMaxBuyRelated}
                                        handleSetQuantity={handleSetQuantity}
                                        handleSetQuantityRelated={handleSetQuantityRelated}
                                        isBaseMenu={menu.BaseMenu}
                                        search={search}
                                    />
                                    : 
                                    <NoProductWrapper>
                                        <NoProductTitle> B???ng gi?? ch??a c?? s???n ph???m</NoProductTitle>
                                        <NoProductButton type="button" onClick={toggleAddItemModal}> Th??m s???n ph???m </NoProductButton>
                                    </NoProductWrapper>
                                }

                                {
                                    error.price !== '' ?
                                    <DangerText> {error.price} </DangerText>
                                    : null
                                }
                            </>
                        }
                    </ProductListWrapper>
                </ProductWrapper>
                
                <MenuWrapper>
                    <Row spacebetween>
                        <FormLabel>Ti??u ?????</FormLabel>
                        <HelperText ml0 mt>{input.name.length}/100 k?? t???</HelperText>
                    </Row>

                    <TextField
                        fullWidth size="small" placeholder="V?? d???: Th???t c?? c??c lo???i, ????? gia d???ng, etc" 
                        inputProps={{ maxLength: 100, style: {fontSize: 14} }}
                        value={menuLoading ? '??ang t???i...' : input.name} name='name'
                        onChange={handleChange}
                        error={error.name !== ''}
                        helperText={error.name}
                    />

                    <Row spacebetween>
                        <FormLabel>M?? t???</FormLabel>
                        <HelperText ml0 mt>{input.description.length}/500 k?? t???</HelperText>
                    </Row>

                    <StyledTextFieldMb20px
                        fullWidth size="small" multiline rows={3} placeholder="M?? t??? gi??p kh??ch h??ng h??nh dung v?? hi???u r?? h??n s???n ph???m thu???c b???ng gi??."
                        inputProps={{ maxLength: 500, style: {fontSize: 14} }}
                        value={menuLoading ? '??ang t???i...' : input.description} name='description'
                        onChange={handleChange}
                    />

                    {
                        menu.BaseMenu ?
                        null :
                        <FormControlLabel 
                            checked={input.includeBaseMenu} name='includeBaseMenu' 
                            onClick={handleToggleIncludeBaseMenu} 
                            control={<Checkbox />} 
                            label={<span style={{ fontSize: '14px' }}>T??ch h???p b???ng gi?? c?? b???n</span>} 
                        />
                    }

                    <FormLabel>Ng??y ho???t ?????ng</FormLabel>
                    <DatePickerWrapper>
                        <WeekDayCheckbox type="button" checked={repeatDay.t2} name='t2' onClick={handleToggleDate}>T2</WeekDayCheckbox>
                        <WeekDayCheckbox type="button" checked={repeatDay.t3} name='t3' onClick={handleToggleDate}>T3</WeekDayCheckbox>
                        <WeekDayCheckbox type="button" checked={repeatDay.t4} name='t4' onClick={handleToggleDate}>T4</WeekDayCheckbox>
                        <WeekDayCheckbox type="button" checked={repeatDay.t5} name='t5' onClick={handleToggleDate}>T5</WeekDayCheckbox>
                        <WeekDayCheckbox type="button" checked={repeatDay.t6} name='t6' onClick={handleToggleDate}>T6</WeekDayCheckbox>
                        <WeekDayCheckbox type="button" checked={repeatDay.t7} name='t7' onClick={handleToggleDate}>T7</WeekDayCheckbox>
                        <WeekDayCheckbox type="button" checked={repeatDay.cn} name='cn' onClick={handleToggleDate}>CN</WeekDayCheckbox>
                    </DatePickerWrapper>

                    <SpaceBetween>
                        <FormLabel>Th???i gian ho???t ?????ng</FormLabel>
                        <StyledCalendarIcon onClick={toggleMenuModal} />
                    </SpaceBetween>

                    <FormControlLabel 
                        style={{ pointerEvents: "none" }}
                        control={
                            <Checkbox
                                onClick={handleSetTime}
                                style={{ pointerEvents: "auto" }}
                                checked={twentyfour}
                            />
                        }
                        label={<span style={{ fontSize: '14px' }}>Ho???t ?????ng 24h</span>} 
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePickerWrapper>
                            <MobileTimePicker
                                minutesStep={15} disableCloseOnSelect={false} showToolbar={false}
                                disabled={twentyfour ? true : false} ampm={false}
                                label={twentyfour && !menuModal ? "00:00" : !menuModal ? "Th???i gian b???t ?????u" : ''}
                                value={twentyfour ? null : input.startTime}
                                onChange={time => handleChange({ target: { value: time.toISOString(), name: 'startTime' } })} 
                                renderInput={(params) => <TextField {...params} error={error.time !== ''} helperText={error.time} />} 
                            />

                            <StyledArrowIcon />

                            <MobileTimePicker
                                minutesStep={15} disableCloseOnSelect={false} showToolbar={false}
                                disabled={twentyfour ? true : false} ampm={false}
                                label={twentyfour && !menuModal ? "24:00" : !menuModal ? "Th???i gian k???t th??c" : ''}
                                value={twentyfour ? null : input.endTime}
                                onChange={time => handleChange({ target: { value: time.toISOString(), name: 'endTime' } })} 
                                renderInput={(params) => <TextField {...params} error={error.time !== ''} helperText={error.time} />} 
                            />
                        </TimePickerWrapper>
                    </LocalizationProvider>
                </MenuWrapper>
            </FlexWrapper>
            
            <FooterWrapper>
                <FloatRight>
                    <Button type="button" onClick={validCheckBeforeConfirm}>C???p nh???t</Button>
                </FloatRight>
            </FooterWrapper>

            <Modal isOpen={menuModal} onRequestClose={toggleMenuModal} style={customStyles} ariaHideApp={false}>
                <ModalWrapper>
                    <ModalContentWrapper>
                        <MenuSchedule menuSchedule={menuSchedule} />
                    </ModalContentWrapper>

                    <ModalButtonWrapper>
                        <ModalButton onClick={toggleMenuModal}>Quay l???i</ModalButton>
                    </ModalButtonWrapper>
                </ModalWrapper>
            </Modal>

            <AddItemModal 
                display={addItemModal} 
                toggle={toggleAddItemModal}
                productLoading={productLoading}
                stock={stock}
                saveItem={handleSaveItem}
                handleToggleChecked={handleToggleChecked}
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