/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import MenuList from '../../components/Menu/MenuList';
import ReactPaginate from "react-paginate";
import { publicRequest } from "../../RequestMethod";
import { toast } from 'react-toastify';

const Title = styled.h1`
    font-size: 30px;
    color: #383838;
    margin: 15px;
`;

const Row = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    width: 31%;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #E0E0E0;
    border-style: solid;
    border-width: thin;
    height: 44px;
    padding: 0px 3px 0px 8px;
    background-color: #ffffff;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
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

    &:focus {
    opacity: 0.5;
    }
`;

const SelectWrapper = styled.div`
    display: flex;
    width: ${props => props.width};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #E0E0E0;
    border-style: solid;
    border-width: thin;
    height: 44px;
    padding: 0px 3px 0px 8px;
    background-color: #ffffff;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
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
    margin-top: 30px;
`;

const Table = styled.table`
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    margin-bottom: 16px;
    background-color: #fff;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const TableHead = styled.thead`
    display: table-header-group;
    vertical-align: bottom;
`;

const TableHeader = styled.th`
    width: ${props => props.width};
    text-align: ${props => props.center ? "center" : "left"};
    padding: 16px;
    vertical-align: top;
    vertical-align: bottom;
`;

const TableBody = styled.tbody`
    border-top: 2px solid #dee2e6;
`;

const TableRow = styled.tr``;

const ItemsPerPageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48%;
`;

const StyledPaginateContainer = styled.div`
    margin-right: 10px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);

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

const ModalTitle = styled.h2`
    margin: 25px 20px;
    color: #212529;
`;

const ModalContentWrapper = styled.div`
    border-top: 1px solid #cfd2d4;
    border-bottom: 1px solid #cfd2d4;
`;

const ModalContent = styled.p`
    margin: 25px 20px;
    color: #762a36;
    padding: 20px;
    background: #f8d7da;
    border-radius: 5px;
`;

const ModalButtonWrapper = styled.div`
    margin: 20px;
    float: right;
`;

const ModalButton = styled.button`
    min-width: 80px;
    padding: 10px;
    margin-left: 10px;
    background: ${props => props.red ? "#dc3545" : "#fff"};
    color: ${props => props.red ? "#fff" : "#212529"};;
    border: 1px solid ${props => props.red ? "#dc3545" : "#fff"};
    border-radius: 4px;
    text-align: center;
    font-size: 1rem;

    &:hover {
    opacity: 0.8;
    }

    &:focus {
    outline: 0;
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '65%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const Menu = () =>  {
    const [DeleteModal, toggleDeleteModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState({id: '', name: ''});

    const [APIdata, setAPIdata] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);

    const [pageCount, setPageCount] = useState(1);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [change, setChange] = useState(false);
    const [search, setSearch] = useState(''); //search filter
    const [status, setStatus] = useState('0'); //status filter

    useEffect(() => {  //fetch api data
        const url = "menu/all";

        const fetchData = async () => {
            try {
                const res = await fetch(publicRequest(url), { method: 'GET' });
                const json = await res.json();
                setAPIdata(json.Data);
            } catch (error) { }
        };
        fetchData();
    }, [change]);

    useEffect(() => {   //filter based on 'search' & 'status'
        const result = APIdata.filter((item) => {
            if (status !== '0') {
                return [item.MenuName, item.Resident.ResidentName].join('').toLowerCase().includes(search.toLowerCase())
                    && item.Status === parseInt(status)
            } else {
                return [item.MenuName, item.Resident.ResidentName].join('').toLowerCase().includes(search.toLowerCase())
            }
        })
        setFilteredData(result);
    }, [search, status, APIdata, itemsPerPage]);

    useEffect(() => {   //paging
        const paging = () => {
            try {
                const endOffset = (itemOffset + itemsPerPage);
                setCurrentItems(filteredData.slice(itemOffset, endOffset));
                setPageCount(Math.ceil(filteredData.length / itemsPerPage));
            } catch (error) { }
        };
        paging();
    }, [filteredData, itemOffset]);

    useEffect(() => {   //set active page
        if (currentItems.length === 0) {
            if (itemOffset >= 5) {
                setItemOffset(itemOffset - 5);
                setCurrentPage(filteredData.length / itemsPerPage - 1);
            }
        }
    }, [currentItems]);

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % filteredData.length;
        setItemOffset(newOffset);
        setCurrentPage(event.selected);
    };

    const handleSearch = (searchValue, statusValue) => {
        setSearch(searchValue);
        setStatus(statusValue);
        setItemOffset(0);   //back to page 1
        setCurrentPage(0);
    }

    const clearSearch = () => {
        setSearch('');
        document.getElementById("search").value = '';
    }

    const handleChangeItemsPerPage = (value) => {
        setItemsPerPage(parseInt(value));
        setItemOffset(0);   //back to page 1
        setCurrentPage(0);
    }

    const handleGetDeleteItem = (id, name) => {
        setDeleteItem({id: id, name: name});
        toggleDeleteModal(!DeleteModal);
    }

    const handleDeleteItem = (id) => {
        const url = "menu/delete/" + id;
        const deleteData = async () => {
            try {
                const res = await fetch(publicRequest(url), { method: 'PUT' });
                const json = await res.json();
                if (json.ResultMessage === "SUCCESS") {
                    setChange(!change);
                    const notify = () => toast.success("Xóa thành công " + deleteItem.name + "!", {
                        position: toast.POSITION.TOP_CENTER
                      });
                    notify();
                }
            } catch (error) { }
        };
        deleteData();
    };

    return (
        <div>
            <Title>Danh sách bảng giá</Title>

                <Row>
                    <ButtonWrapper>
                        <Input id="search" placeholder="Search theo tên bảng giá" onChange={(event) => handleSearch(event.target.value, status)}/>
                        <Button onClick={() => clearSearch()}>Clear</Button>
                    </ButtonWrapper>

                    <SelectWrapper width="16%">
                        <Select value={status} onChange={(event) => handleSearch(search, event.target.value)}>
                            <option value="0">--- Lọc trạng thái ---</option>
                            <option value="14004">Deleted</option>
                            <option value="14002">Inactive</option>
                            <option value="14001">Active</option>
                        </Select>
                    </SelectWrapper>

                    <ItemsPerPageWrapper>
                        Số hàng mỗi trang:&nbsp;
                        <SelectWrapper width="40px">
                            <Select value={itemsPerPage} onChange={(event) => handleChangeItemsPerPage(event.target.value)}>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </Select>
                        </SelectWrapper>              
                    </ItemsPerPageWrapper>  
                </Row>

                <TableWrapper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader width="50%">Tên bảng giá</TableHeader>
                            <TableHeader width="20%">Chủ cửa hàng</TableHeader>
                            <TableHeader width="15%" center>Trạng thái</TableHeader>
                            <TableHeader width="15%" center>Chỉnh sửa</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <MenuList currentItems={currentItems} handleGetDeleteItem={handleGetDeleteItem} />
                    </TableBody>
                </Table>

                <Row>
                    { currentItems.length !== 0 
                    ? <small>Hiển thị {currentPage * itemsPerPage + 1} - {currentPage * itemsPerPage + currentItems.length} trong tổng số {filteredData.length} bộ sưu tập.</small>
                    : null }

                    <StyledPaginateContainer>
                        <ReactPaginate
                            nextLabel="Next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={pageCount}
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
                            forcePage={currentPage}
                            renderOnZeroPageCount={null}
                        />
                    </StyledPaginateContainer>
                </Row>
            </TableWrapper>

            <Modal isOpen={DeleteModal} onRequestClose={() => toggleDeleteModal(!DeleteModal)} style={customStyles} ariaHideApp={false}>
                <ModalTitle>Xác Nhận Xóa</ModalTitle>
                <ModalContentWrapper>
                    <ModalContent>Bạn có chắc chắn muốn xóa bảng giá【<b>{deleteItem.name}</b>】?</ModalContent>
                </ModalContentWrapper>
                <ModalButtonWrapper>
                    <ModalButton onClick={() => toggleDeleteModal(!DeleteModal)}>Quay lại</ModalButton>
                    <ModalButton red onClick={() => { handleDeleteItem(deleteItem.id); toggleDeleteModal(!DeleteModal) }}>Xóa</ModalButton>
                </ModalButtonWrapper>
            </Modal>
        </div>
    )
}

export default Menu;