/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import OrderList from '../components/Order/OrderList';
import ReactPaginate from "react-paginate";
import { Search, Error, Logout, Summarize } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

const PageWrapper = styled.div`
    margin: 50px;
`;

const Title = styled.h1`
    font-size: 16px;
    color: #383838;
    margin: 15px 15px ${props => props.mb ? "-5px" : "15px"} 15px;
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
    width: 33%;
    height: auto;
    margin: 0 auto;
    text-align: center;
`;

const StyledOrderIcon = styled(Summarize)`
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
    margin: 20px 0px 50px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 14px;
    color: #383838;
    line-height: 1.8;
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

const Order = () =>  {
    const [APIdata, setAPIdata] = useState([]);
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
        setAPIdata([
            {
                OrderId: 'ID001',
                DeliveryAddress: 'Tầng 2A',
                CreatedDate: '29/3/2022 13:00 PM',
                TotalAmount: 520000,
                Status: 0,
                Resident: { ResidentName: 'Lê Văn Tám', PhoneNumber: '0901234567', DeliveryAddress: 'Tầng 2A' },
            },
            {
                OrderId: 'ID002',
                DeliveryAddress: 'Tầng 3B',
                CreatedDate: '29/3/2022 9:00 AM',
                TotalAmount: 42000,
                Status: 1,
                Resident: { ResidentName: 'Ngọn Đuốc Sống', PhoneNumber: '0901231234', DeliveryAddress: 'Tầng 3B' },
            }
        ]);
        // setLoading(true);
        // let url = "orders";
        // const fetchData = () => {
        //     api.get(url)
        //     .then(function (res) {                
        //         //setAPIdata(res.data.Data.List);
        //         setTotal(res.data.Data.Total);
        //         setLastPage(res.data.Data.LastPage);
        //         setLoading(false);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         setLoading(false);
        //     });
        // }
        // fetchData();
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

    return (
        <PageWrapper>
            {
                loading || APIdata.length ?
                <>
                    <Title>Đơn hàng</Title>

                    <TableWrapper>
                        <Row mb>
                            <SearchBar>
                                <StyledSearchIcon />
                                <Input id="search" placeholder="Tìm kiếm đơn hàng" onChange={handleSetSearch} />
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
                                    <TableHeader width="20%">Tên khách hàng</TableHeader>
                                    <TableHeader width="17%">Địa chỉ nhận hàng</TableHeader>
                                    <TableHeader width="15%" center>Số điện thoại</TableHeader>
                                    <TableHeader width="15%" center>Thời gian đặt hàng</TableHeader>
                                    <TableHeader width="15%" center>Tổng giá</TableHeader>
                                    <TableHeader width="15%" center>Trạng thái</TableHeader>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    loading ? 
                                    <tr>
                                        <TableData center colSpan={100}> <CircularProgress /> </TableData>
                                    </tr>
                                    : 
                                    <OrderList 
                                        currentItems={APIdata}
                                    />
                                }
                            </TableBody>
                        </Table>

                        {
                            loading || APIdata.length === 0 || total <= 10 ?
                            null :
                            <Row mt>
                                <small>Hiển thị {page * limit + 1} - {page * limit + APIdata.length} trong tổng số {total} đơn hàng.</small>

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
                    <Title>Đơn hàng</Title>

                    <TableWrapper>
                        <NoItemWrapper>
                            <StyledOrderIcon />

                            <NoItemTitle>
                                Bạn hiện chưa có đơn hàng
                            </NoItemTitle>

                            <NoItemText>
                                Đơn hàng sẽ được gửi đến khi có khách hàng thanh toán sản phẩm của cửa hàng bạn.
                            </NoItemText>
                        </NoItemWrapper>
                    </TableWrapper>
                </>
            }

            <TipText>
                <StyledExclamationIcon />
                Tìm hiểu thêm về&nbsp;<StyledLink href="https://vi.wikipedia.org/wiki/B%C3%A1o_gi%C3%A1_b%C3%A1n_h%C3%A0ng"
                                                  target="_blank">đơn hàng</StyledLink>
                <StyledLinkIcon />
            </TipText>
        </PageWrapper>
    )
}

export default Order;