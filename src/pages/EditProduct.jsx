/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams, useNavigate } from "react-router-dom";
import { api } from "../RequestMethod";
import { toast } from 'react-toastify';
import { KeyboardBackspace, Warning, RemoveCircle, ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { TextField, InputAdornment, FormControlLabel, Checkbox } from '@mui/material';
import imageCompression from 'browser-image-compression';

import ProductOption from '../components/Product/ProductOption';
import ImageUpload from '../components/Product/ImageUpload';
import CategoryList from '../components/Product/CategoryList';
import DeleteModal from '../components/Product/DeleteModal';
import MenuInProductDetailItem from '../components/Product/MenuInProductDetailItem';

import { db } from "../firebase";
import { ref, push } from "firebase/database";

const PageWrapper = styled.div`
    min-width: 600px;
    max-width: 900px;
    margin: 50px auto;
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
    padding: ${props => props.p0 ? "30px 30px 1px 30px" : "30px 30px"};
    margin-bottom: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: #fff;
    border-radius: 5px;
    border: ${props => props.error ? "2px solid " + props.theme.red : null};
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
    margin-left: ${props => props.ml0 ? "0px" : "30px"};
    align-items: center;
    text-decoration: none;
    font-size: ${props => props.error ? "13px" : "14px"};
    margin-top: ${props => props.error ? "10px" : "0px"};
    margin-bottom: ${props => props.mb ? "15px" : "0px"};
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
    border: 1px solid ${props => props.disabled ? props.theme.disabled : props.white ? props.theme.greyBorder : props.theme.blue};
    background-color: ${props => props.disabled ? props.theme.disabled : props.white ? "white" : props.theme.blue};
    color: ${props => props.white ? props.theme.grey : "white"};
    font-weight: 600;

    &:active {
    transform: translateY(1px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const OptionLabel = styled.div`
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: 10px;
    font-size: 14px;
`;

const VariantWrapper = styled.div`
    font-size: 14px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dee2e6;
    text-decoration: none;
    cursor: pointer;
    background-color: #fff;

    &:hover {
    opacity: 0.9;
    background-color: #F5F5F5;
    }

    &:focus {
    outline: 0;
    }

    &:active {
    transform: translateY(1px);
    }
`;

const CombinationListWrapper = styled.div`
    margin-top 20px;
    width: 65%;
`;

const TextWrapper = styled.div`
    flex: ${props => props.isBaseMenu ? "11" : "8"};
    width: 1px; //constraint width
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0px 20px;
    display: flex;
    align-items: center;
`;

const PriceWrapper = styled.div`
    flex: 3;
    display: flex;
    justify-content: center;
    margin-right: 15px;
    opacity: ${props => props.disabled ? "0" : null};
`;

const Currency = styled.span`
    font-size: 14px;
    padding: 5px;
    color: #999;
    border: 1px solid ${props => props.error ? props.theme.red : "#ccc"};
    border-radius: 0 3px 3px 0;
    background: rgba(0,0,0,0.01);
`;

const PriceField = styled.input`
    width: 100%;
    padding: 5px;
    outline: none;
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.greyBorder};
    border-right: 0;
    border-radius: 3px 0 0 3px;
    font-size: 14px;
    background-color: ${props => props.theme.white};
    color: ${props => props.grey ? "#BEBEBE" : props.theme.black};
`;

const Align = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    border-bottom: ${props => props.borderbottom ? "1px solid rgba(0,0,0,0.1)" : null};
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

const MenuLabel = styled.div`
    font-size: 16px;
    font-weight: 600;
`;

const StyledCheckIcon = styled(RemoveCircle)`
    && {
        font-size: 20px;
        margin-right: 5px;
        color: ${props => props.theme.red};
    }
`;

const EditProduct = () => {
    const { id } = useParams();
    let navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('USER'));

    const [dropdown, setDropdown] = useState(false);
    const toggleDropdown = () => { setDropdown(!dropdown); }

    const [deleteItem, setDeleteItem] = useState({id: '', name: '', type: ''});
    const [deletePimModal, setDeletePimModal] = useState(false);
    const toggleDeletePimModal = () => { setDeletePimModal(!deletePimModal) };

    const [item, setItem] = useState({});
    const [menus, setMenus] = useState([]);
    const [input, setInput] = useState({ name: '', description: '', shortDescription: '', category: {lv1: '', lv2: '', lv3: ''}, price: 0, colors: [], sizes: [],  weights: [], code: '' });
    const [error, setError] = useState({ name: '', category: '', price: '', colors: '', image: '', sizes: '', weights: '', optionPrice: '' });

    const [currentCombination, setCurrentCombination] = useState([]);
    const [combination, setCombination] = useState([]);
    const [combiChange, setcombiChange] = useState(false);
    const [currentImages, setCurrentImages] = useState([]);
    const [images, setImages] = useState([ { name: 0, image: '' } ]);
    const [change, setChange] = useState(false);

    const [loading, setLoading] = useState(false);
    const sort = '+syscategoryname';

    const [lv1Category, setLv1Category] = useState([]);
    const [lv2Category, setLv2Category] = useState([]);
    const [lv3Category, setLv3Category] = useState([]);

    useEffect(() => {
        setLoading(true);

        const fetchData = () => {
            api.get("menus?productid=" + id)
            .then(function (res0) {
                setMenus(res0.data.Data.List.filter(item => item.ProductInMenus.length));

                api.get("categories?status=3001&sort=" + sort)
                .then(function (res1) {
                    setLv1Category(res1.data.Data.List.filter((item) => {
                        return item.CategoryLevel === 1;
                    }));

                    api.get("products?id=" + id + "&include=related")
                    .then(function (res2) {
                        if (res2.data.Data.List[0]) {
                            setItem(res2.data.Data.List[0]);

                            let colorArray = [...new Map(res2.data.Data.List[0].RelatedProducts.map(({ Color }) => ({ 
                                value: Color, error: '', old: true
                            })).map(item => [item['value'], item])).values()].filter(item => (item.value))
                            .map((item, index) => ({ name: index, ...item }));

                            let sizeArray = [...new Map(res2.data.Data.List[0].RelatedProducts.map(({ Size }) => ({ 
                                value: Size, error: '', old: true
                            })).map(item => [item['value'], item])).values()].filter(item => (item.value))
                            .map((item, index) => ({ name: index, ...item }));

                            let weightArray = [...new Map(res2.data.Data.List[0].RelatedProducts.map(({ Weight }) => ({ 
                                value: Weight, error: '', old: true
                            })).map(item => [item['value'], item])).values()].filter(item => (item.value))
                            .map((item, index) => ({ name: index, ...item }));

                            setCurrentCombination(res2.data.Data.List[0].RelatedProducts.map((item) => ({ 
                                id: item.ProductId, edit: false, color: item.Color, size: item.Size, weight: item.Weight, price: item.DefaultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), error: ''
                            })));

                            setCombination(res2.data.Data.List[0].RelatedProducts.map((item) => ({ 
                                id: item.ProductId, edit: false, color: item.Color, size: item.Size, weight: item.Weight, price: item.DefaultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), error: ''
                            })));

                            let images = res2.data.Data.List[0].Image.split("|").map((item, index) => (
                                { name: index, image: item }
                            ));

                            setImages(images);
                            setCurrentImages(images);

                            setInput(input => ({
                                ...input,
                                code: res2.data.Data.List[0].ProductCode,
                                name: res2.data.Data.List[0].ProductName,
                                description: res2.data.Data.List[0].Description,
                                shortDescription: res2.data.Data.List[0].BriefDescription,
                                price: res2.data.Data.List[0].DefaultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                                status: res2.data.Data.List[0].Status,
                                colors: colorArray,
                                sizes: sizeArray,
                                weights: weightArray,
                            }));

                            api.get("categories?id=" + res2.data.Data.List[0].SystemCategoryId + "&include=parent")
                            .then(function (res3) {
                                if (res3.data.Data.List[0].CategoryLevel === 3) {
                                    setInput(input => ({
                                        ...input,
                                        category: {
                                            lv1: res3.data.Data.List[0].Parent.BelongTo,
                                            lv2: res3.data.Data.List[0].Parent.SystemCategoryId,
                                            lv3: res3.data.Data.List[0].SystemCategoryId
                                        }
                                    }));
                                    let lv2CategoryList = res1.data.Data.List.filter((item) => {
                                        return item.SystemCategoryId === res3.data.Data.List[0].Parent.BelongTo;
                                    })[0].Children;
                                    setLv2Category(lv2CategoryList);
                                    setLv3Category(lv2CategoryList.filter((item) => {
                                        return item.SystemCategoryId === res3.data.Data.List[0].Parent.SystemCategoryId;
                                    })[0].Children);
                                } else if (res3.data.Data.List[0].CategoryLevel === 2) {
                                    setInput(input => ({
                                        ...input,
                                        category: {
                                            lv1: res3.data.Data.List[0].Parent.SystemCategoryId,
                                            lv2: res3.data.Data.List[0].SystemCategoryId,
                                            lv3: ''
                                        }
                                    }));
                                    let lv2CategoryList = res1.data.Data.List.filter((item) => {
                                        return item.SystemCategoryId === res3.data.Data.List[0].Parent.SystemCategoryId;
                                    })[0].Children;
                                    setLv2Category(lv2CategoryList);
                                } else if (res3.data.Data.List[0].CategoryLevel === 1) {
                                    setInput(input => ({
                                        ...input,
                                        category: {
                                            lv1: res3.data.Data.List[0].SystemCategoryId,
                                            lv2: '',
                                            lv3: ''
                                        }
                                    }));
                                }
                                setLoading(false);
                            })
                        } else {
                            navigate("/404");
                            setLoading(false);
                        }
                    })
                    .catch(function (error) {
                        navigate("/404");
                        setLoading(false);
                    })
                })
            })
            .catch(function (error) {
                navigate("/404");
                setLoading(false);
            });
        }
        fetchData();
    }, [change]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
        setError(error => ({ ...error, [name]: '' }));
    };

    const saveOption = (option, data) => {
        setError(error => ({ ...error, [option]: '' }));
        setError(error => ({ ...error, optionPrice: '' }));
        setInput(input => ({ ...input, [option]: data }));
        setcombiChange(!combiChange);
    }

    const handleSetPrice = (e) => {
        setError(error => ({ ...error, price: '' }));
        const { value } = e.target;

        if (value.replace(/\D/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").length + 1 <= 11) {
            setInput(input => ({ ...input, price: value.replace(/\D/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }));
        }
        if (input.applyBasePrice) {
            setCombination(combination.map((combination) => {
                return Object.assign({}, combination, {
                    price: input.price
                })
            }));
        }
    }

    const handleSetOptionPrice = (e, id, color, size, weight) => {
        setError(error => ({ ...error, optionPrice: '' }));
        const { value } = e.target;

        if (value.replace(/\D/g, "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").length + 1 <= 11) {
            let newCombination = [...combination];
            let index = newCombination.findIndex(obj => obj.color === color && obj.size === size && obj.weight === weight);
            let inputPrice = value.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            newCombination[index] = { id: id, edit: true, color: color, size: size, weight: weight, price: inputPrice, error: '' };
            setCombination(newCombination);
        };
    }

    useEffect(() => {
        const colors = input.colors.length ? input.colors : [{ value: null }];
        const sizes = input.sizes.length ? input.sizes : [{ value: null }];
        const weights = input.weights.length ? input.weights : [{ value: 0 }];

        if (!(colors.length === 1 && colors[0].value === null 
        && sizes.length === 1 && sizes[0].value === null 
        && weights.length === 1 && weights[0].value === 0)) {
            const newCombination = sizes.map(size => { 
                return colors.map(color => {
                    return weights.map(weight => {
                        return {
                            id: null, edit: false, color: color.value, size: size.value, weight: weight.value, price: '', error: ''
                        }
                    })
                }).reduce((total, value) => {
                    return total.concat(value);
                }, [])
            }).reduce((total, value) => {
                return total.concat(value);
            }, []);

            const sameCombination = combination.filter(
                o1 => newCombination.some(o2 => o1.color === o2.color && o1.size === o2.size && o1.weight === o2.weight));

            sameCombination.forEach((item) => {
                let index = newCombination.findIndex(obj => obj.color === item.color && obj.size === item.size && obj.weight === item.weight);
                newCombination[index] = { id: item.id, edit: item.edit, color: item.color, size: item.size, weight: item.weight, price: item.price, error: '' };
            });
            setCombination(newCombination);
        } else {
            setCombination([]);
        };
        setInput(input => ({ ...input, applyBasePrice: false }));
    }, [combiChange]);

    function handleToggleApplyBasePrice(e) {
        const { checked } = e.target;
        setInput(input => ({ ...input, applyBasePrice: checked }));
    }

    useEffect(() => {
        if (input.applyBasePrice && combination && combination.length) {
            const newCombination = combination.map((combination) => {
                return Object.assign({}, combination, {
                    price: input.price
                })
            });

            const sameCombination = combination.filter(
                o1 => newCombination.some(o2 => o1.color === o2.color && o1.size === o2.size && o1.weight === o2.weight));

            sameCombination.forEach((item) => {
                let index = newCombination.findIndex(obj => obj.color === item.color && obj.size === item.size && obj.weight === item.weight);
                let price = newCombination[index].price;
                newCombination[index] = { id: item.id, edit: true, color: item.color, size: item.size, weight: item.weight, price: price, error: '' };
            });

            setCombination(newCombination);
        }
    }, [input.price, input.applyBasePrice]);

    const editOption = (option, display) => {
        if (display) {
            setError(error => ({ ...error, [option]: '' }));
        } else {
            setError(error => ({ ...error, [option]: 'B???n c?? t??y ch???n ch??a l??u!' }));
        }
        setInput(input => ({ ...input, [option]: [] }));
    }

    const handleGetCategoryLv1 = (id) => {
        setError(error => ({ ...error, category: '' }));
        setInput(input => ({ ...input, category: {lv1: id, lv2: '', lv3: ''} }));
        setLv2Category(lv1Category.filter((item) => {
            return item.SystemCategoryId === id;
        })[0].Children);
        setLv3Category([]);
        setError(error => ({ ...error, category: '' }));
    }

    const handleGetCategoryLv2 = (id) => {
        setInput(input => ({ ...input, category: {lv1: input.category.lv1, lv2: id, lv3: ''} }));
        setLv3Category(lv2Category.filter((item) => {
            return item.SystemCategoryId === id;
        })[0].Children);
    }

    const handleGetCategoryLv3 = (id) => {
        setInput(input => ({ ...input, category: {lv1: input.category.lv1, lv2: input.category.lv2, lv3: id} }));
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleSetImage = async (e) => {
        setError(error => ({ ...error, image: '' }));
        const { name } = e.target;
        const [file] = e.target.files;
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 640,
            fileType: "image/jpg"
        }
        if (file) {
            const compressedFile = await imageCompression(file, options);
            const base64 = await toBase64(compressedFile);

            let newImages = [...images];
            let index = newImages.findIndex(obj => parseInt(obj.name) === parseInt(name));

            if (images.filter(item => item.image === base64.toString()).length === 0) {
                newImages[index] = { name: name, image: base64.toString() };
                setImages(newImages);
            } else {
                setError(error => ({ ...error, image: '???nh tr??ng. Vui l??ng ch???n ???nh kh??c.' }));
            }
        }
    };

    const handleRemoveImage = (name) => {
        setError(error => ({ ...error, image: '' }));
        let newImages = [...images];
        let index = newImages.findIndex(obj => parseInt(obj.name) === parseInt(name));
        newImages[index] = { name: name, image: '' };
        setImages(newImages);
    };

    const handleEditItem = (event) => {
        event.preventDefault();

        if (validCheck()) {
            setLoading(true);

            const combinationDifference = currentCombination.filter(
                o1 => !combination.some(o2 => o1.color === o2.color && o1.size === o2.size && o1.weight === o2.weight))
            .concat(combination.filter(
                o1 => !currentCombination.some(o2 => o1.color === o2.color && o1.size === o2.size && o1.weight === o2.weight && o1.price === o2.price)
            ))

            let updateArray = [];
            let insertArray = [];
            let deleteArray = [];

            combinationDifference.forEach((item) => {
                if (item.id !== null) {
                    if (item.edit) {
                        updateArray.push({
                            defaultPrice: item.price.replace(/\D/g, ""),
                            size: item.size,
                            color: item.color,
                            weight: item.weight,
                            productId: item.id
                        });
                    } else {
                        deleteArray.push(item.id);
                    }
                } else {
                    insertArray.push({
                        defaultPrice: item.price.replace(/\D/g, ""),
                        size: item.size,
                        color: item.color,
                        weight: item.weight,
                        image: []
                    });
                }
            });

            let imageDifference = [];
            imageDifference = currentImages.filter(o1 => !images.some(o2 => o1.image === o2.image))
            .concat(images.filter(o1 => !currentImages.some(o2 => o1.image === o2.image)))
            .filter(item => item.image !== '').map(item => item.image.includes(',') ? item.image.split(',')[1] : item.image);

            let APIarray = [];
            if (item.ProductCode !== input.code 
                || item.ProductName !== input.name 
                || item.Description !== input.description
                || item.BriefDescription !== input.shortDescription
                || item.SystemCategoryId !== (input.category.lv3 ? input.category.lv3 : input.category.lv2 ? input.category.lv2 : input.category.lv1)
                || item.DefaultPrice.toString().replace(/\D/g, "") !== input.price.replace(/\D/g, "")
                || imageDifference.length
                || updateArray.length
            ) {
                updateArray.push({
                    productCode: input.code,
                    productName: input.name,
                    briefDescription: input.shortDescription,
                    description: input.description,
                    defaultPrice: input.price.replace(/\D/g, ""),
                    systemCategoryId: input.category.lv3 ? input.category.lv3 : input.category.lv2 ? input.category.lv2 : input.category.lv1,
                    image: imageDifference,
                    productId: id
                })
                APIarray.push(api.put("products", {
                    products: updateArray
                }));
            }
            if (deleteArray.length) {
                APIarray.push(api.delete("products", {
                    data: { productIds: deleteArray }
                }));
            }
            if (insertArray.length) {
                APIarray.push(api.post("products/" + item.ProductId + "/related", {
                    products: insertArray
                }));
            }

            const notification = toast.loading("??ang x??? l?? y??u c???u...");
            if (APIarray.length) {
                Promise.all(APIarray)
                .then(function (results) {
                    push(ref(db, `Notification/` + user.Residents[0].ApartmentId), {
                        createdDate: Date.now(),
                        data: {
                            name: input.name
                        },
                        read: 0,
                        receiverId: user.Residents[0].ApartmentId,
                        senderId: user.Residents[0].ResidentId,
                        type: '003'
                    });
                    setLoading(false);
                    setChange(!change);
                    toast.update(notification, { render: "C???p nh???t th??nh c??ng!", type: "success", autoClose: 5000, isLoading: false });
                })
                .catch(function (error) {
                    console.log(error);
                    setLoading(false);
                    toast.update(notification, { render: "???? x???y ra l???i khi x??? l?? y??u c???u.", type: "error", autoClose: 5000, isLoading: false });
                });
            } else {
                setLoading(false);
                toast.update(notification, { render: "Vui l??ng ch???nh s???a s???n ph???m tr?????c khi ch???n c???p nh???t.", type: "info", autoClose: 5000, isLoading: false });
            }
        }
    }

    const validCheck = () => {
        let check = false;
        setError(error => ({ ...error, name: '', colors: '', sizes: '', weights: '', category: '', price: '', optionPrice: '' }));

        if (input.name.trim() === null || input.name.trim() === '') {
            setError(error => ({ ...error, name: 'Vui l??ng nh???p t??n s???n ph???m' }));
            check = true;
        }
        if (input.category.lv1 === null || input.category.lv1 === '') {
            setError(error => ({ ...error, category: 'Vui l??ng ch???n danh m???c s???n ph???m' }));
            check = true;
        }
        if (input.price === null || input.price === '' || parseFloat(input.price.replace(/\D/g, "")) < 1000) {
            setError(error => ({ ...error, price: 'Vui l??ng nh???p gi?? tr??n 1000 vn??' }));
            check = true;
        }
        if (images[0].image === '') {
            setError(error => ({ ...error, image: 'Xin h??y ch???n ???nh b??a cho s???n ph???m' }));
            check = true;
        }
        combination.forEach((item) => {
            if (item.price === '' || item.price === null || parseFloat(item.price.replace(/\D/g, "")) < 1000) {
                let newCombination = [...combination];
                let index = newCombination.findIndex(obj => obj.color === item.color && obj.size === item.size && obj.weight === item.weight);
                let error = "Vui l??ng nh???p gi?? t??y ch???n tr??n 1000 vn??";
                newCombination[index] = { color: item.color, size: item.size, weight: item.weight, price: item.price, error: error };
                setCombination(newCombination);

                setError(error => ({ ...error, optionPrice: 'Vui l??ng nh???p gi?? t??y ch???n tr??n 1000 vn??' }));
                check = true;
            }
        })
        if (check) {
            return false;
        }

        return true;
    }

    const handleGetDeletePim = (id, name) => {
        setDeleteItem({id: id, name: name, type: 'pim'});
        toggleDeletePimModal();
    }

    const handleDeletePim = (e) => {
        e.preventDefault();

        const deletePim = async () => {
            const notification = toast.loading("??ang x??? l?? y??u c???u...");

            api.delete("menu-products", {
                data: [ deleteItem.id ]
            })
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    setChange(!change);
                    toast.update(notification, { render: "X??a s???n ph???m kh???i b???ng gi?? th??nh c??ng!", type: "success", autoClose: 5000, isLoading: false });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "???? x???y ra l???i khi x??? l?? y??u c???u.", type: "error", autoClose: 5000, isLoading: false });
            });
        };
        deletePim();
        toggleDeletePimModal();
    };

    return (
        <PageWrapper>
            <Row>
                <Link to="/products"><StyledBackIcon /></Link>
                <Title><TitleGrey>Danh s??ch s???n ph???m </TitleGrey>/ {item.ProductName}</Title>
            </Row>

            {
                menus.length ?
                <ContainerWrapper>
                    <Align borderbottom onClick={toggleDropdown}>
                        <Align>
                            <StyledCheckIcon />
                            <MenuLabel>
                                S???n ph???m ??ang thu???c {menus.length} b???ng gi??.
                                Vui l??ng b??? s???n ph???m ra kh???i to??n b??? b???ng gi?? tr?????c khi c???p nh???t.
                            </MenuLabel>
                        </Align>

                        {
                            !dropdown ?
                            <ArrowDropDown />
                            : <ArrowDropUp />
                        }
                    </Align>

                    {
                        dropdown ?
                        <>{menus.map((menu, index) => {
                            return <MenuInProductDetailItem 
                                item={menu} key={index} index={index}
                                handleGetDeletePim={handleGetDeletePim}
                            />
                        })}</>
                        : null
                    }
                </ContainerWrapper>
                : null                      
            }
            
            <form onSubmit={handleEditItem} id="form">
                <ContainerWrapper>
                    <Row spacebetween>
                        <FormLabel>T??n s???n ph???m</FormLabel>
                        <HelperText ml0>{input.name.length}/100 k?? t???</HelperText>
                    </Row>
                    
                    <StyledTextFieldMb
                        fullWidth placeholder="V?? d???: B??nh m?? 2 tr???ng" 
                        inputProps={{ maxLength: 100, style: {fontSize: 14} }} 
                        value={loading ? "??ang t???i..." : input.name} name='name'
                        onChange={handleChange}
                        error={error.name !== ''}
                        helperText={error.name}
                    />

                    <Row spacebetween>
                        <FormLabel>M?? s???n ph???m</FormLabel>
                        <HelperText ml0>{input.code.length}/200 k?? t???</HelperText>
                    </Row>
                    
                    <StyledTextFieldMb
                        fullWidth placeholder="V?? d???: AP-001" 
                        inputProps={{ maxLength: 200, style: {fontSize: 14} }}
                        value={input.code ? input.code : ''} name='code'
                        onChange={handleChange}
                    />

                    <Row spacebetween>
                        <FormLabel>M?? t??? chi ti???t</FormLabel>
                        <HelperText ml0>{input.description.length}/500 k?? t???</HelperText>
                    </Row>

                    <StyledTextFieldMb
                        fullWidth multiline rows={4}
                        placeholder="Kh??ch h??ng s??? th???y m?? t??? n??y khi h??? v??o xem chi ti???t s???n ph???m." 
                        inputProps={{ maxLength: 500, style: {fontSize: 14} }}
                        value={loading ? "??ang t???i..." : input.description} name='description'
                        onChange={handleChange}
                    />

                    <Row spacebetween>
                        <FormLabel>M?? t??? ng???n g???n</FormLabel>
                        <HelperText ml0>{input.shortDescription.length}/500 k?? t???</HelperText>
                    </Row>

                    <TextField
                        fullWidth multiline rows={2}
                        placeholder="Kh??ch h??ng s??? th???y m?? t??? n??y khi h??? nh???n xem s???n ph???m." 
                        inputProps={{ maxLength: 500, style: {fontSize: 14} }}
                        value={loading ? "??ang t???i..." : input.shortDescription} name='shortDescription'
                        onChange={handleChange}
                    />
                </ContainerWrapper>

                <ContainerWrapper>
                    <FormLabel>Danh m???c</FormLabel>

                    <Row spacebetween mt>
                        <CategoryList currentItems={lv1Category} selected={input.category.lv1} handleGetCategory={handleGetCategoryLv1} />
                        <CategoryList currentItems={lv2Category} selected={input.category.lv2} handleGetCategory={handleGetCategoryLv2} />
                        <CategoryList currentItems={lv3Category} selected={input.category.lv3} handleGetCategory={handleGetCategoryLv3} />
                    </Row>
                    <HelperText error={1}> {error.category} </HelperText>
                </ContainerWrapper>

                <ContainerWrapper p0>
                    <FormLabel>H??nh ???nh</FormLabel>
                    <HelperText ml0 mb error={1}>{error.image}</HelperText>

                    {
                        loading ? 
                        null :
                        <ImageUpload
                            images={images}
                            setImages={setImages}
                            handleSetImage={handleSetImage}
                            handleRemoveImage={handleRemoveImage}
                        />
                    }
                </ContainerWrapper>


                <ContainerWrapper>
                    <FormLabel>T??y ch???n</FormLabel>
                    <OptionLabel>Th??m c??c t??y ch???n c???a s???n ph???m, nh?? m??u s???c, k??ch th?????c hay tr???ng l?????ng</OptionLabel>
                    
                    <ProductOption passedData={input.colors} savedData={input.colors} type='colors' saveOption={saveOption} editOption={editOption} />
                    <ProductOption passedData={input.sizes} savedData={input.sizes} type='sizes' saveOption={saveOption} editOption={editOption} />
                    <ProductOption passedData={input.weights} savedData={input.weights} type='weights' saveOption={saveOption} editOption={editOption} />
                </ContainerWrapper>

                <ContainerWrapper>
                <FormLabel>Gi?? m???c ?????nh</FormLabel>

                <TextField
                    fullWidth
                    InputProps={{ inputMode: 'numeric', pattern: '[0-9]*', startAdornment: <InputAdornment position="start">vn??</InputAdornment> }}
                    value={input.price} name='price'
                    onChange={handleSetPrice}
                    error={error.price !== ''}
                    helperText={error.price}
                />

                {
                    combination && combination.length ?
                    <CombinationListWrapper>
                        
                        <FormControlLabel 
                            checked={input.applyBasePrice} name='applyBasePrice' 
                            onChange={handleToggleApplyBasePrice} 
                            control={<Checkbox />} 
                            label={<span style={{ fontSize: '14px' }}>??p d???ng gi?? m???c ?????nh v??o to??n b??? t??y ch???n s???n ph???m.</span>} 
                        />

                        <HelperText error={1}> {error.optionPrice} </HelperText>
                        {combination.map((item, index) => {
                            return <VariantWrapper key={index}>
                                <TextWrapper>
                                    {item.color ? item.color : ''}
                                    {item.color && (item.size || item.weight) ? " / " : ''}
                                    {item.size ? item.size : ''}
                                    {item.size && item.weight ? " / " : ''}
                                    {item.weight ? item.weight + "kg " : ''}
                                </TextWrapper>

                                <PriceWrapper>
                                    <PriceField 
                                        type="text" disabled={input.applyBasePrice}
                                        value={item.price} name='price'
                                        onChange={(e) => handleSetOptionPrice(e, item.id, item.color, item.size, item.weight)}
                                        error={item.error !== ''}
                                    />
                                    <Currency error={item.error !== ''}>??</Currency>
                                </PriceWrapper>
                            </VariantWrapper>
                        })}
                    </CombinationListWrapper>
                    :
                    null
                }
                </ContainerWrapper>

                <FooterWrapper>
                    <FloatRight>
                        {
                            (error.colors !== '' || error.sizes !== '' || error.weights !== '') ?
                            <>
                                <StyledWarningIcon />
                                <WarningText>B???n c?? t??y ch???n ch??a l??u!</WarningText>
                                <Button disabled>C???p nh???t</Button>
                            </>
                            : (error.name !== '' || error.category !== '' || error.price !== '' || error.optionPrice || error.image) ?
                            <>
                                <StyledWarningIcon error />
                                <WarningText error={1}>B???n c?? th??ng tin ch??a ??i???n!</WarningText>
                                <Button disabled>C???p nh???t</Button>
                            </>
                            : menus.length ?
                            <>
                                <StyledWarningIcon error />
                                <WarningText error={1}>S???n ph???m ??ang thu???c {menus.length} b???ng gi??. Vui l??ng b??? s???n ph???m ra kh???i to??n b??? b???ng gi?? tr?????c khi c???p nh???t.</WarningText>
                                <Button disabled>C???p nh???t</Button>
                            </>
                            :
                            <Button disabled={loading}>C???p nh???t</Button>
                        }
                    </FloatRight>
                </FooterWrapper>
            </form>

            <DeleteModal 
                display={deletePimModal}
                toggle={toggleDeletePimModal}
                deleteItem={deleteItem}
                handleDeleteItem={handleDeletePim}
            />
        </PageWrapper>
    )
}

export default EditProduct;