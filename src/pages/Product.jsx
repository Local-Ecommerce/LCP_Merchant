/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductList from '../components/Product/ProductList';
import { api } from "../RequestMethod";
import { toast } from 'react-toastify';
import ReactPaginate from "react-paginate";
import useClickOutside from "../contexts/useClickOutside";
import { Search, Error, Logout, ProductionQuantityLimits, AddCircle, ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import * as Constant from '../Constant';

import DetailModal from '../components/Product/DetailModal';
import DeleteModal from '../components/Product/DeleteModal';
import LearnMoreAboutProductModal from '../components/Product/LearnMoreAboutProductModal';

const PageWrapper = styled.div`
    margin: 50px;
`;

const Title = styled.h1`
    font-size: 16px;
    color: #383838;
    margin: 15px 15px ${props => props.mb ? "-5px" : "15px"} 15px;
`;

const AddButton = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: ${props => props.theme.green};
    border-style: none;
    border-radius: 5px;
    color: ${props => props.theme.white};
    text-decoration: none;
    font-size: 0.9em;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);

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

const AddIcon = styled(AddCircle)`
    && {
        margin-right: 5px;
        font-size: 20px;
    }
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: ${props => props.mb ? "20px" : "0px"};
`;

const Align = styled.div`
    display: flex;
    align-items: center;
`;

const StyledSearchIcon = styled(Search)`
    && {
        color: grey;
    }
`;

const SearchBar = styled.div`
    display: flex;
    width: 300px;
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

const Button = styled.button`
    height: 36px;
    width: 60px;
    background-color: #17a2b8;
    border-style: none;
    border-radius: 5px;
    color: #fff;

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

const TableWrapper = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Table = styled.table`
    table-layout: fixed;
    border-spacing: 0px;
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    overflow: hidden;
    border-radius: 5px;
`;

const TableHead = styled.thead`
    display: table-header-group;
    vertical-align: bottom;
`;

const TableHeader = styled.th`
    width: ${props => props.width};
    text-align: ${props => props.center ? "center" : "left"};
    padding: 16px;
    font-size: 15px;
    color: ${props => props.grey ? props.theme.grey : null};
    border-bottom: 1px solid #dee2e6;
`;

const TableBody = styled.tbody`
    border-top: 1px solid #dee2e6;
`;

const TableData = styled.td`
    border-bottom: 1px solid #dee2e6;
    vertical-align: middle;
    text-align: ${props => props.center ? "center" : "left"};
    height: 100px;
`;

const TableRow = styled.tr``;

const NoItemWrapper = styled.div`
    width: 40%;
    height: auto;
    margin: 0 auto;
    text-align: center;
`;

const StyledProductIcon = styled(ProductionQuantityLimits)`
    && {
        font-size: 144px;
        color: #D8D8D8;
        margin-top: 30px;
    }
`;

const NoItemTitle = styled.div`
    margin: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 20px;
    font-weight: 600;
    color: #383838;
`;

const NoItemText = styled.div`
    margin: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 14px;
    color: #383838;
    line-height: 1.8;
`;

const NoItemButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    background-color: ${props => props.theme.blue};
    color: white;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 30px;

    &:active {
    transform: translateY(1px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const TipText = styled.div`
    margin: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 14px;
    color: #383838;
`;

const StyledExclamationIcon = styled(Error)`
    && {
        font-size: 20px;
        margin: 0px 7px;
        color: #17a2b8;
    }
`;

const StyledLinkIcon = styled(Logout)`
    && {
        font-size: 16px;
        margin: 0px 7px;
        color: #007bff;
    }
`;

const StyledLink = styled.div`
    color: #007bff;
    cursor: pointer;
`;

const StyledPaginateContainer = styled.div`
    margin-right; 10px;
    margin-left: auto;

    .pagination {
    padding: 0px;
    margin: 0px;
    color: #0366d6;
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: 0.25rem;
    }

    .break-me {
    cursor: default;
    }

    .active {
    border-color: transparent;
    background-color: #0366d6;
    color: white;
    }

    .page-link {
    position: relative;
    display: block;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: #007bff;
    background-color: #fff;
    border: 1px solid #dee2e6;
    }

    .page-link:hover {
    color: #0056b3;
    text-decoration: none;
    background-color: #e9ecef;
    border-color: #dee2e6;
    }

    .page-link:focus {
    z-index: 2;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }

    .page-link:not(:disabled):not(.disabled) {
    cursor: pointer;
    }

    .page-item:first-child .page-link {
    margin-left: 0;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    }

    .page-item:last-child .page-link {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    }

    .page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    }

    .page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    cursor: auto;
    background-color: #fff;
    border-color: #dee2e6;
    }
`;

const Label = styled.div`
    margin-right: 10px;
    font-size: 13px;
`;

const SelectWrapper = styled.div`
    width: ${props => props.width};
    margin-right: 10px;
    display: inline-block;
    background-color: ${props => props.theme.white};
    border-radius: 5px;
    border: 1px solid ${props => props.theme.greyBorder};
    transition: all .5s ease;
    position: relative;
    font-size: 14px;
    color: ${props => props.theme.black};
    text-align: left;

    &:hover {
        box-shadow: 0 0 4px rgb(204, 204, 204);
        border-radius: 2px 2px 0 0;
    }

    &:active {
        box-shadow: 0 0 4px rgb(204, 204, 204);
        border-radius: 2px 2px 0 0;
    }
`;

const Select = styled.div`
    cursor: pointer;
    display: flex;
    padding: 8px 10px 8px 15px;
    justify-content: space-between;
    align-items: center;
`;

const DropdownMenu = styled.ul`
    position: absolute;
    background-color: #fff;
    width: 100%;
    left: 0;
    margin-top: 1px;
    box-shadow: 0 1px 2px rgb(204, 204, 204);
    border-radius: 0 1px 2px 2px;
    overflow: hidden;
    display: ${props => props.dropdown === true ? "" : "none"};
    max-height: 600px;
    overflow-y: auto;
    z-index: 9;
    padding: 0;
    list-style: none;
`;

const DropdownLv1Menu = styled.ul`
    position: absolute;
    background-color: #fff;
    width: 100%;
    left: 0;
    margin-top: 1px;
    box-shadow: 0 1px 2px rgb(204, 204, 204);
    border-radius: 0 1px 2px 2px;
    overflow: hidden;
    display: ${props => props.lv1CateDropdown === true ? "" : "none"};
    max-height: 600px;
    overflow-y: auto;
    z-index: 9;
    padding: 0;
    list-style: none;
`;

const DropdownLv2Menu = styled.ul`
    position: absolute;
    background-color: #fff;
    width: 100%;
    top: ${props => props.height + "px"};
    left: 100%;
    margin-top: 1px;
    box-shadow: 0 1px 2px rgb(204, 204, 204);
    border-radius: 0 1px 2px 2px;
    overflow: hidden;
    display: ${props => props.lv2CateDropdown === true ? "" : "none"};
    max-height: 600px;
    overflow-y: auto;
    z-index: 9;
    padding: 0;
    list-style: none;
`;

const DropdownLv3Menu = styled.ul`
    position: absolute;
    background-color: #fff;
    width: 100%;
    top: ${props => props.height + "px"};
    left: 200%;
    margin-top: 1px;
    box-shadow: 0 1px 2px rgb(204, 204, 204);
    border-radius: 0 1px 2px 2px;
    overflow: hidden;
    display: ${props => props.lv3CateDropdown === true ? "" : "none"};
    max-height: 600px;
    overflow-y: auto;
    z-index: 9;
    padding: 0;
    list-style: none;
`;

const DropdownList = styled.li`
    padding: 10px;
    height: 25px;
    transition: all .2s ease-in-out;
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        background-color: ${props => props.theme.hover};
    }
`;

const Product = () =>  {
    const [deleteModal, setDeleteModal] = useState(false);
    const toggleDeleteModal = () => { setDeleteModal(!deleteModal) };
    const [detailModal, setDetailModal] = useState(false);
    function toggleDetailModal() { setDetailModal(!detailModal); }
    const [aboutModal, setAboutModal] = useState(false);
    const toggleAboutModal = () => { setAboutModal(!aboutModal) };

    const [lv1CateDropdown, setLv1CateDropdown] = useState(false);
    const toggleLv1CateDropdown = () => { setLv1CateDropdown(!lv1CateDropdown); }
    const [lv2CateDropdown, setLv2CateDropdown] = useState(false);
    const [lv3CateDropdown, setLv3CateDropdown] = useState(false);

    const [lv1Categories, setLv1Categories] = useState([]);
    const [lv2Categories, setLv2Categories] = useState([]);
    const [lv3Categories, setLv3Categories] = useState([]);
    const [lv2CategoryHeight, setLv2CategoryHeight] = useState([]);
    const [lv3CategoryHeight, setLv3CategoryHeight] = useState([]);

    const [sortDropdown, setSortDropdown] = useState(false);
    const toggleSortDropdown = () => { setSortDropdown(!sortDropdown); }
    const [statusDropdown, setStatusDropdown] = useState(false);
    const toggleStatusDropdown = () => { setStatusDropdown(!statusDropdown); }

    const [deleteItem, setDeleteItem] = useState({id: '', name: '', type: ''});
    const [detailItem, setDetailItem] = useState({});

    const [APIdata, setAPIdata] = useState([]);
    const [productExist, setProductExist] = useState({ checked: false, exist: false });
    const [loading, setLoading] = useState(false);
    const [change, setChange] = useState(false);

    const limit = 10;
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [lastPage, setLastPage] = useState(0);
    const [category, setCategory] = useState({id: '', name: 'To??n b???'});
    const [sort, setSort] = useState({value: '-createddate', name: 'Ng??y t???o t??ng d???n'});
    const [typing, setTyping] = useState('');
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState({
        value: Constant.VERIFIED_PRODUCT + "&status=" + Constant.UNVERIFIED_PRODUCT + "&status=" + Constant.REJECTED_PRODUCT,
        name: 'To??n b???'
    });

    useEffect( () => {  //fetch api data
        setLoading(true);
        let url = "products"
                + "?limit=" + limit 
                + "&page=" + (page + 1) 
                + "&sort=" + sort.value
                + "&categoryid=" + category.id
                + (search !== '' ? ("&search=" + search) : '') 
                + (status.value !== '' ? ("&status=" + status.value) : '');
        const fetchData = () => {
            api.get(url)
            .then(function (res) {
                setAPIdata(res.data.Data.List);
                setTotal(res.data.Data.Total);
                setLastPage(res.data.Data.LastPage);
                if (productExist.checked === false) {
                    setProductExist({ checked: true, exist: (res.data.Data.Total > 0 ? true : false) })
                }

                const url2 = "categories" 
                    + "?sort=-syscategoryname" 
                    + "&status=" + Constant.ACTIVE_SYSTEM_CATEGORY;
                api.get(url2)
                .then(function (res2) {
                    setLv1Categories(res2.data.Data.List);
                    setLoading(false);
                })
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
        }
        fetchData();
    }, [change, limit, page, sort, status, search, category]);

    useEffect(() => {   //timer when search
        const timeOutId = setTimeout(() => setSearch(typing), 500);
        return () => clearTimeout(timeOutId);
    }, [typing]);

    function handleSetSearch(e) {
        const { value } = e.target;
        setTyping(value);
        setPage(0);
    }

    let clickCateOutside = useClickOutside(() => {
        setLv1CateDropdown(false);
        setLv2CateDropdown(false);
        setLv3CateDropdown(false);
    });

    let clickSortOutside = useClickOutside(() => {
        setSortDropdown(false);
    });

    let clickStatusOutside = useClickOutside(() => {
        setStatusDropdown(false);
    });

    const handleSetCategory = (id, name) => {
        setCategory({id: id, name: name});
        setLv1CateDropdown(false);
        setLv2CateDropdown(false);
        setLv3CateDropdown(false);
    }

    const handleGetLv2Category = (children, index) => {
        setLv2CategoryHeight((index + 1) * 46 + 46);
        setLv2Categories(children);
        setLv2CateDropdown(true);
        setLv3CateDropdown(false);
    }

    const handleGetLv3Category = (children, index) => {
        setLv3CategoryHeight(lv2CategoryHeight + index * 46);
        setLv3Categories(children);
        setLv3CateDropdown(true);
    }

    const handleSetSort = (value, name) => {
        setSort({value: value, name: name});
        toggleSortDropdown();
        setPage(0);
    }

    const handleSetStatus = (value, name) => {
        setStatus({value: value, name: name});
        toggleStatusDropdown();
        setPage(0);
    }

    const clearSearch = () => {
        setTyping('');
        setPage(0);
        document.getElementById("search").value = '';
    }

    const handlePageClick = (event) => {
        setPage(event.selected);
    };

    const handleGetDetailItem = (id) => {
        setDetailItem({ id: id });
        toggleDetailModal();
    }

    const handleGetDeleteItem = (id, name) => {
        setDeleteItem({id: id, name: name, type: 'product'});
        toggleDeleteModal();
    }

    const handleDeleteItem = (event) => {
        event.preventDefault();
        const notification = toast.loading("??ang x??? l?? y??u c???u...");

        const deleteData = async () => {
            api.delete("products", {
                data: {
                    productIds: [ deleteItem.id ]
                }, 
            })
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    setProductExist({ checked: false, exist: false });
                    setChange(!change);
                    toast.update(notification, { render: "X??a th??nh c??ng!", type: "success", autoClose: 5000, isLoading: false });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "???? x???y ra l???i khi x??? l?? y??u c???u.", type: "error", autoClose: 5000, isLoading: false });
            });
        };
        deleteData();
        toggleDeleteModal();
    };

    return (
        <PageWrapper>
            {
                loading || productExist.exist ?
                <>
                    <Row mb>
                        <Title mb>S???n ph???m</Title>

                        <AddButton to={"/addProduct"}>
                            <AddIcon /> T???o s???n ph???m m???i
                        </AddButton>
                    </Row>

                    <TableWrapper>
                        <Row mb>
                            <SearchBar>
                                <StyledSearchIcon />
                                <Input id="search" placeholder="T??m ki???m s???n ph???m" onChange={handleSetSearch} />
                                <Button type="button" onClick={clearSearch}>X??a</Button>
                            </SearchBar>

                            <Align>
                                <Label>Danh m???c:</Label>
                                <SelectWrapper width="200px" ref={clickCateOutside}>
                                    <Select onClick={toggleLv1CateDropdown}>
                                        {category.name}
                                        <ArrowDropDown />
                                    </Select>

                                    <DropdownLv1Menu lv1CateDropdown={lv1CateDropdown}>
                                        <DropdownList onClick={() => handleSetCategory('', 'To??n b???')}>To??n b???</DropdownList>
                                        {lv1Categories.map((category, index) => {
                                            return <DropdownList 
                                                key={category.SystemCategoryId}
                                                onClick={() => handleSetCategory(category.SystemCategoryId, category.SysCategoryName)}
                                                onMouseEnter={() => handleGetLv2Category(category.Children, index)}
                                            >
                                                {category.SysCategoryName}
                                                {
                                                    category.Children && category.Children.length ?
                                                    <ArrowRight />
                                                    : null
                                                }
                                            </DropdownList>
                                        })}
                                    </DropdownLv1Menu>

                                    <DropdownLv2Menu lv2CateDropdown={lv2CateDropdown} height={lv2CategoryHeight}>
                                        {lv2Categories.map((category, index) => {
                                            return <DropdownList 
                                                key={category.SystemCategoryId}
                                                onClick={() => handleSetCategory(category.SystemCategoryId, category.SysCategoryName)}
                                                onMouseEnter={() => handleGetLv3Category(category.Children, index)}
                                            >
                                                {category.SysCategoryName}
                                                {
                                                    category.Children && category.Children.length ?
                                                    <ArrowRight />
                                                    : null
                                                }
                                            </DropdownList>
                                        })}
                                    </DropdownLv2Menu>

                                    <DropdownLv3Menu lv3CateDropdown={lv3CateDropdown} height={lv3CategoryHeight}>
                                        {lv3Categories.map((category) => {
                                            return <DropdownList 
                                                key={category.SystemCategoryId}
                                                onClick={() => handleSetCategory(category.SystemCategoryId, category.SysCategoryName)}
                                            >
                                                {category.SysCategoryName}
                                            </DropdownList>
                                        })}
                                    </DropdownLv3Menu>
                                </SelectWrapper>
                            </Align>

                            <Align>
                                <Label>S???p x???p:</Label>
                                <SelectWrapper ref={clickSortOutside}>
                                    <Select onClick={toggleSortDropdown}>
                                        {sort.name}
                                        <ArrowDropDown />
                                    </Select>

                                    <DropdownMenu dropdown={sortDropdown}>
                                        <DropdownList onClick={() => handleSetSort('-createddate', 'S???n ph???m m???i')}>S???n ph???m m???i</DropdownList>
                                        <DropdownList onClick={() => handleSetSort('+createddate', 'S???n ph???m c??')}>S???n ph???m c??</DropdownList>
                                        <DropdownList onClick={() => handleSetSort('-defaultprice', 'Gi?? t??ng d???n')}>Gi?? t??ng d???n</DropdownList>
                                        <DropdownList onClick={() => handleSetSort('+defaultprice', 'Gi?? gi???m d???n')}>Gi?? gi???m d???n</DropdownList>
                                    </DropdownMenu>
                                </SelectWrapper>
                            </Align>

                            <Align>
                                <Label>Tr???ng th??i:</Label>
                                <SelectWrapper ref={clickStatusOutside}>
                                    <Select onClick={toggleStatusDropdown}>
                                        {status.name}
                                        <ArrowDropDown />
                                    </Select>

                                    <DropdownMenu dropdown={statusDropdown}>
                                        <DropdownList onClick={() => handleSetStatus(Constant.VERIFIED_PRODUCT + "&status=" + Constant.UNVERIFIED_PRODUCT + "&status=" + Constant.REJECTED_PRODUCT, 'To??n b???')}>To??n b???</DropdownList>
                                        <DropdownList onClick={() => handleSetStatus(Constant.VERIFIED_PRODUCT, 'Ho???t ?????ng')}>Ho???t ?????ng</DropdownList>
                                        <DropdownList onClick={() => handleSetStatus(Constant.UNVERIFIED_PRODUCT, 'Ch??? duy???t')}>Ch??? duy???t</DropdownList>
                                        <DropdownList onClick={() => handleSetStatus(Constant.REJECTED_PRODUCT, 'T??? ch???i')}>T??? ch???i</DropdownList>
                                    </DropdownMenu>
                                </SelectWrapper>
                            </Align>
                        </Row>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeader width="7%" center>???nh</TableHeader>
                                    <TableHeader width="48%">T??n s???n ph???m</TableHeader>
                                    <TableHeader width="15%" center>Gi??</TableHeader>
                                    <TableHeader width="15%" center>Tr???ng th??i</TableHeader>
                                    <TableHeader width="15%" center>H??nh ?????ng</TableHeader>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    loading ? 
                                    <tr>
                                        <TableData center colSpan={100}> <CircularProgress /> </TableData>
                                    </tr>
                                    : 
                                    <ProductList 
                                        currentItems={APIdata} 
                                        handleGetDeleteItem={handleGetDeleteItem} 
                                        handleGetDetailItem={handleGetDetailItem}
                                    />
                                }
                            </TableBody>
                        </Table>

                        {
                            loading || APIdata.length === 0 || total <= 10 ?
                            null :
                            <Row mt>
                                <small>Hi???n th??? {page * limit + 1} - {page * limit + APIdata.length} trong t???ng s??? {total} s???n ph???m.</small>

                                <StyledPaginateContainer>
                                    <ReactPaginate
                                        nextLabel="Next >"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={3}
                                        marginPagesDisplayed={2}
                                        pageCount={lastPage}
                                        previousLabel="< Prev"
                                        pageClassName="page-item"
                                        pageLinkClassName="page-link"
                                        previousClassName="page-item"
                                        previousLinkClassName="page-link"
                                        nextClassName="page-item"
                                        nextLinkClassName="page-link"
                                        breakLabel="..."
                                        breakClassName="page-item"
                                        breakLinkClassName="page-link"
                                        containerClassName="pagination"
                                        activeClassName="active"
                                        forcePage={page}
                                        renderOnZeroPageCount={null}
                                    />
                                </StyledPaginateContainer>
                            </Row>
                        }
                    </TableWrapper>
                </>

                :

                <>
                    <Title>S???n ph???m</Title>

                    <TableWrapper>
                        <NoItemWrapper>
                            <StyledProductIcon />

                            <NoItemTitle>
                                B???n hi???n ch??a c?? s???n ph???m
                            </NoItemTitle>

                            <NoItemText>
                                T???o s???n ph???m v?? ????a v??o b???ng gi?? gi??p kh??ch h??ng c?? th??? th???y ???????c s???n ph???m c???a c???a h??ng b???n.
                            </NoItemText>

                            <Link to="/addProduct">
                                <NoItemButton>
                                    T???o s???n ph???m
                                </NoItemButton>
                            </Link>
                        </NoItemWrapper>
                    </TableWrapper>
                </>
            }

            <TipText>
            <StyledExclamationIcon />
                T??m hi???u th??m v???&nbsp;<StyledLink onClick={toggleAboutModal}>s???n ph???m</StyledLink>
                <StyledLinkIcon />
            </TipText>

            <DetailModal 
                display={detailModal}
                toggle={toggleDetailModal}
                detailItem={detailItem}
            />

            <DeleteModal 
                display={deleteModal}
                toggle={toggleDeleteModal}
                deleteItem={deleteItem}
                handleDeleteItem={handleDeleteItem}
            />

            <LearnMoreAboutProductModal
                display={aboutModal} 
                toggle={toggleAboutModal} 
            />
        </PageWrapper>
    )
}

export default Product;