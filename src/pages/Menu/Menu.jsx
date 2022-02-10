/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import MenuList from '../../components/Menu/MenuList';
import { publicRequest } from "../../RequestMethod";
import { toast } from 'react-toastify';
import { Search, Error, Logout, Summarize } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import Menus from '../../mockdata/Menus';

const PageWrapper = styled.div`
    margin: 50px 40px;
`;

const Title = styled.h1`
    font-size: 16px;
    color: #383838;
    margin: 15px;
`;

const Row = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const StyledSearchIcon = styled(Search)`
    && {
        color: grey;
    }
`;

const SearchBar = styled.div`
    display: flex;
    width: 60%;
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
    width: 70px;
    background-color: ${props => props.theme};
    border-style: none;
    border-radius: 5px;
    color: #fff;

    &:focus {
    opacity: 0.5;
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
`;

const TableBody = styled.tbody`
    border-top: 1px solid #dee2e6;
`;

const TableRow = styled.tr``;

const NoMenuWrapper = styled.div`
    width: 40%;
    height: auto;
    margin: 0 auto;
    text-align: center;
`;

const StyledMenuIcon = styled(Summarize)`
    && {
        font-size: 144px;
        color: #D8D8D8;
    }
`;

const NoMenuTitle = styled.div`
    margin: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 20px;
    font-weight: 600;
    color: #383838;
`;

const NoMenuText = styled.div`
    margin: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 14px;
    color: #383838;
    line-height: 1.8;
`;

const NoMenuButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    background-color: ${props => props.theme};
    color: white;
    font-weight: 600;
    margin-top: 20px;

    &:active {
    transform: translateY(1px);
    }

    &:hover {
    opacity: 0.8;
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

const StyledLink = styled(Link)`
    color: #007bff;
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
    const theme = "#17a2b8";
    const [DeleteModal, toggleDeleteModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState({id: '', name: ''});

    const [APIdata, setAPIdata] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [change, setChange] = useState(false);
    const [search, setSearch] = useState(''); //search filter
    const [status, setStatus] = useState('0'); //status filter

    useEffect(() => {  //fetch api data
        //const url = "menu/all";

        const fetchData = async () => {
            try {
                /*const res = await fetch(publicRequest(url), { method: 'GET' });
                const json = await res.json();*/
                setAPIdata(Menus);
            } catch (error) { }
        };
        fetchData();
    }, [change]);

    useEffect(() => {   //filter based on 'search' & 'status'
        const result = APIdata.filter((item) => {
            if (status !== '0') {
                return [item.MenuName, item.Type].join('').toLowerCase().includes(search.toLowerCase())
                    && item.Status === parseInt(status)
            } else {
                return [item.MenuName, item.Type].join('').toLowerCase().includes(search.toLowerCase())
            }
        })
        setFilteredData(result);
    }, [search, status, APIdata]);

    const handleSearch = (searchValue, statusValue) => {
        setSearch(searchValue);
        setStatus(statusValue);
    }

    const clearSearch = () => {
        setSearch('');
        document.getElementById("search").value = '';
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
        <PageWrapper>
            <Title>Danh sách bảng giá</Title>

            <TableWrapper>
                {(APIdata.length !== 0) ? 
                <div>
                    <Row>
                        <SearchBar>
                            <StyledSearchIcon />
                            <Input id="search" placeholder="Tìm kiếm bảng giá" onChange={(event) => handleSearch(event.target.value, status)}/>
                            <Button theme={theme} onClick={() => clearSearch()}>Clear</Button>
                        </SearchBar>

                        <DropdownWrapper width="16%">
                            <Select value={status} onChange={(event) => handleSearch(search, event.target.value)}>
                                <option value="0">Trạng thái</option>
                                <option value="14004">Deleted</option>
                                <option value="14002">Inactive</option>
                                <option value="14001">Active</option>
                            </Select>
                        </DropdownWrapper>

                        <DropdownWrapper width="16%">
                            <Select value={status} onChange={(event) => handleSearch(search, event.target.value)}>
                                <option value="0">Sắp xếp</option>
                                <option value="14004">Deleted</option>
                                <option value="14002">Inactive</option>
                                <option value="14001">Active</option>
                            </Select>
                        </DropdownWrapper>
                    </Row>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader width="50%">Tiêu đề</TableHeader>
                                <TableHeader width="20%" center>Loại</TableHeader>
                                <TableHeader width="15%" center>Trạng thái</TableHeader>
                                <TableHeader width="15%" center>Hành động</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <MenuList currentItems={filteredData} handleGetDeleteItem={handleGetDeleteItem} />
                        </TableBody>
                    </Table>
                </div> 
                : 
                <NoMenuWrapper>
                    <StyledMenuIcon />

                    <NoMenuTitle>
                        Bạn hiện chưa có bảng giá
                    </NoMenuTitle>

                    <NoMenuText>
                        Tạo bảng giá và đưa các sản phẩm vào giúp khách hàng có thể thấy được sản phẩm của cửa hàng.
                    </NoMenuText>

                    <Link to="/addMenu">
                        <NoMenuButton theme={theme}>
                            Tạo bảng giá
                        </NoMenuButton>
                    </Link>
                </NoMenuWrapper>
                }
            </TableWrapper>

            <TipText>
                <StyledExclamationIcon />
                Tìm hiểu thêm về&nbsp;<StyledLink to="/menus">bảng giá</StyledLink>
                <StyledLinkIcon />
            </TipText>

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
        </PageWrapper>
    )
}

export default Menu;