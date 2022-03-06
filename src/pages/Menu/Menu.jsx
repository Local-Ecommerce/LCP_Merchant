/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MenuList from '../../components/Menu/MenuList';
import { api } from "../../RequestMethod";
import { toast } from 'react-toastify';
import ReactPaginate from "react-paginate";
import { Search, Error, Logout, Summarize, AddCircle } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

import ToggleStatusModal from './ToggleStatusModal';
import DeleteModal from './DeleteModal';

const PageWrapper = styled.div`
    margin: 50px;
`;

const Title = styled.h1`
    font-size: 16px;
    color: #383838;
    margin: 15px 15px -5px 15px;
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
    width: 50%;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #D8D8D8;
    border-style: solid;
    border-width: thin;
    height: 44px;
    padding: 0px 3px 0px 8px;
    background-color: #ffffff;
    margin-right: 10px;
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
    width: 70px;
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

const DropdownWrapper = styled.div`
    display: flex;
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

const TableWrapper = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Table = styled.table`
    table-layout: fixed;
    border-collapse: collapse;
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

const StyledMenuIcon = styled(Summarize)`
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

const StyledLink = styled.a`
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

const Menu = () =>  {
    const [deleteModal, setDeleteModal] = useState(false);
    const toggleDeleteModal = () => { setDeleteModal(!deleteModal) };
    const [toggleStatusModal, setToggleStatusModal] = useState(false);
    const toggleToggleStatusModal = () => { setToggleStatusModal(!toggleStatusModal) };

    const [deleteItem, setDeleteItem] = useState({id: '', name: ''});
    const [toggleStatusItem, setToggleStatusItem] = useState({ id: '', name: '', status: true });

    const [APIdata, setAPIdata] = useState([]);
    const [menuExist, setMenuExist] = useState({ checked: false, exist: false });
    const [loading, setLoading] = useState(false);
    const [change, setChange] = useState(false);

    const limit = 10;
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [lastPage, setLastPage] = useState(0);
    const sort = '-createddate';
    const [typing, setTyping] = useState('');
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('9001&status=9005');

    useEffect( () => {  //fetch api data
        setLoading(true);
        let url = "menus"
                + "?limit=" + limit 
                + "&page=" + (page + 1) 
                + "&sort=" + sort 
                + (search !== '' ? ("&search=" + search) : '') 
                + (status !== '' ? ("&status=" + status) : '');
        const fetchData = () => {
            api.get(url)
            .then(function (res) {
                setAPIdata(res.data.Data.List);
                setTotal(res.data.Data.Total);
                setLastPage(res.data.Data.LastPage);
                if (menuExist.checked === false) {
                    setMenuExist({ checked: true, exist: (res.data.Data.Total > 0 ? true : false) })
                }
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
        }
        fetchData();
    }, [change, limit, page, sort, status, search]);

    useEffect(() => {   //timer when search
        const timeOutId = setTimeout(() => setSearch(typing), 500);
        return () => clearTimeout(timeOutId);
    }, [typing]);

    function handleSetSearch(e) {
        const { value } = e.target;
        setTyping(value);
        setPage(0);
    }

    const clearSearch = () => {
        setTyping('');
        setPage(0);
        document.getElementById("search").value = '';
    }

    function handleSetStatus(e) {
        const { value } = e.target;
        setStatus(value);
        setPage(0);
    }

    const handlePageClick = (event) => {
        setPage(event.selected);
    };

    const handleGetToggleStatusItem = (id, name, status) => {
        setToggleStatusItem({ id: id, name: name, status: status });
        toggleToggleStatusModal();
    }

    const handleToggleStatus = (event) => {
        event.preventDefault();
        const notification = toast.loading("Đang xử lí yêu cầu...");

        const url = "menus?id=" + toggleStatusItem.id;
        const editData = async () => {
            api.put(url, {
                status: toggleStatusItem.status === true ? 9005 : 9001
            })
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    setMenuExist({ checked: false, exist: false });
                    setChange(!change);
                    toggleToggleStatusModal();
                    toast.update(notification, { render: "Cập nhật thành công!", type: "success", autoClose: 5000, isLoading: false });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        }
        editData();
    }

    const handleGetDeleteItem = (id, name) => {
        setDeleteItem({id: id, name: name});
        toggleDeleteModal();
    }

    const handleDeleteItem = (event) => {
        event.preventDefault();
        const notification = toast.loading("Đang xử lí yêu cầu...");

        const url = "menus?id=" + deleteItem.id;
        const deleteData = async () => {
            api.delete(url)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    setChange(!change);
                    setMenuExist({ checked: false, exist: false });
                    toast.update(notification, { render: "Xóa thành công!", type: "success", autoClose: 5000, isLoading: false });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        };
        deleteData();
        toggleDeleteModal();
    };

    return (
        <PageWrapper>
            <Row mb>
                <Title>Bảng giá</Title>

                <AddButton to={"/addMenu"}>
                    <AddIcon /> Tạo bảng giá mới
                </AddButton>
            </Row>

            <TableWrapper>
                {
                    loading || menuExist.exist ? 
                    <div>
                        <Row mb>
                            <SearchBar>
                                <StyledSearchIcon />
                                <Input id="search" placeholder="Tìm kiếm bảng giá" onChange={handleSetSearch} />
                                <Button type="button" onClick={clearSearch}>Xóa</Button>
                            </SearchBar>

                            <Align>
                                <small>Trạng thái:&nbsp;</small>
                                <DropdownWrapper width="16%">
                                    <Select value={status} onChange={handleSetStatus}>
                                    <option value='9001&status=9005'>Toàn bộ</option>
                                        <option value={9001}>Hoạt động</option>
                                        <option value={9005}>Ngừng hoạt động</option>
                                    </Select>
                                </DropdownWrapper>
                            </Align>
                        </Row>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeader width="3%" grey>#</TableHeader>
                                    <TableHeader width="32%">Tiêu đề</TableHeader>
                                    <TableHeader width="13%" center>Giờ bắt đầu</TableHeader>
                                    <TableHeader width="13%" center>Giờ kết thúc</TableHeader>
                                    <TableHeader width="13%" center>Ngày hoạt động</TableHeader>
                                    <TableHeader width="13%" center>Trạng thái</TableHeader>
                                    <TableHeader width="13%" center>Hành động</TableHeader>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    loading ? 
                                    <tr>
                                        <TableData center colSpan={100}> <CircularProgress /> </TableData>
                                    </tr>
                                    : 
                                    <MenuList 
                                        currentItems={APIdata} 
                                        handleGetToggleStatusItem={handleGetToggleStatusItem}
                                        handleGetDeleteItem={handleGetDeleteItem} 
                                    />
                                }
                            </TableBody>
                        </Table>
                    </div>
                    : 
                    <NoItemWrapper>
                        <StyledMenuIcon />

                        <NoItemTitle>
                            Bạn hiện chưa có bảng giá
                        </NoItemTitle>

                        <NoItemText>
                            Tạo bảng giá và đưa các sản phẩm vào giúp khách hàng có thể thấy được sản phẩm của cửa hàng.
                        </NoItemText>

                        <Link to="/addMenu">
                            <NoItemButton>
                                Tạo bảng giá
                            </NoItemButton>
                        </Link>
                    </NoItemWrapper>
                }

                {
                    loading || APIdata.length === 0 || total < 10 ?
                    null :
                    <Row mt>
                        <small>Hiển thị {page * limit + 1} - {page * limit + APIdata.length} trong tổng số {total} bảng giá.</small>

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

            <TipText>
                <StyledExclamationIcon />
                Tìm hiểu thêm về&nbsp;<StyledLink href="https://vi.wikipedia.org/wiki/B%C3%A1o_gi%C3%A1_b%C3%A1n_h%C3%A0ng"
                                                  target="_blank">bảng giá</StyledLink>
                <StyledLinkIcon />
            </TipText>

            <DeleteModal 
                display={deleteModal}
                toggle={toggleDeleteModal}
                deleteItem={deleteItem}
                handleDeleteItem={handleDeleteItem}
            />
        
            <ToggleStatusModal
                display={toggleStatusModal}
                toggle={toggleToggleStatusModal}
                toggleStatusItem={toggleStatusItem}
                handleToggleStatus={handleToggleStatus}
            />
        </PageWrapper>
    )
}

export default Menu;