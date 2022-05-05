/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from "../RequestMethod";
import * as Constant from '../Constant';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../contexts/useClickOutside";
import { Notifications, ShoppingCart, ArrowDropDown, RemoveShoppingCart, AttachMoney, ShoppingCartCheckout, ExitToApp } from '@mui/icons-material';

import MenuSchedule from '../components/Menu/MenuSchedule';
import HomeNotificationList from '../components/Home/HomeNotificationList';
import NotificationDetailModal from '../components/Home/NotificationDetailModal';
import FirstTimePopupModal from '../components/Home/FirstTimePopupModal';

const PageWrapper = styled.form`
    min-width: 1000px;
    max-width: 1200px;
    margin: 30px auto;
`;

const Title = styled.h1`
    font-size: 16px;
    color: #383838;
    margin: 15px 10px ${props => props.mb ? "15px" : "-5px"} 15px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: ${props => props.mb ? "20px" : "0px"};
`;

const Label = styled.div`
    margin-right: 10px;
    font-size: 13px;
`;

const SelectWrapper = styled.div`
    width: 180px;
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
    max-height: 500px;
    overflow-y: auto;
    z-index: 9;
    padding: 0;
    list-style: none;
`;

const DropdownList = styled.li`
    padding: 10px;
    transition: all .2s ease-in-out;
    cursor: pointer;
    border-bottom: 1px solid rgba(0,0,0,0.05);

    &:hover {
        background-color: ${props => props.theme.hover};
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    //grid-template-rows: 50px 50px;
    grid-gap: 20px;
`;

const GridItem = styled.div`
    border-radius: 5px;
    background-color: ${props => props.theme.white};
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    padding: ${props => props.p1 ? "15px" : props.p0 ? "0px" : "25px"};
    
    grid-area: ${props => props.area ? props.area : null};
`;

const GridLabel = styled.div`
    color: ${props => props.theme.grey};
    font-size: 15px;
    margin-bottom: 10px;
    font-weight: 600;
`;

const Align = styled.div`
    display: flex;
    align-items: center;
`;

const GridParam = styled.div`
    color: ${props => props.theme.black};
    font-size: 24px;
    font-weight: 600;
`;

const GridParamSmall = styled.div`
    color: rgba(0,0,0,0.3);
    font-size: 18px;
    font-weight: 600;
    margin-left: 5px;
    padding-top: 5px;
`;

const StyledCartIcon = styled(ShoppingCart)`
    && {
        padding: 10px;
        border-radius: 50%;
        background-color: #e9f0fe;
        color: ${props => props.theme.blue};
        margin-right: 15px;
    }
`;

const StyledCartCheckoutIcon = styled(ShoppingCartCheckout)`
    && {
        padding: 10px;
        border-radius: 50%;
        background-color: #e9f0fe;
        color: #28a745;
        margin-right: 15px;
    }
`;

const StyledNoCartIcon = styled(RemoveShoppingCart)`
    && {
        padding: 10px;
        border-radius: 50%;
        background-color: #e9f0fe;
        color: #dc3545;
        margin-right: 15px;
    }
`;

const StyledMoneyIcon = styled(AttachMoney)`
    && {
        padding: 10px;
        border-radius: 50%;
        background-color: #e9f0fe;
        color: #2f69e7;
        margin-right: 15px;
    }
`;

const Tab = styled.h1`
    color: ${props => props.active ? "#383838" : props.theme.grey};
    padding: 15px 0;
    margin: 0px;
    border-right: ${props => props.br ? "1px solid rgba(0,0,0,0.05)" : null};
    border-bottom: ${props => props.active ? "2px solid " + props.theme.blue : "2px solid rgba(0,0,0,0.05)"};
    font-size: 14px;
    width: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const NotificationWrapper = styled.div`
    overflow: auto;
    overflow-x: hidden;

    &&::-webkit-scrollbar {
        display: none;
    }
`;

const NoNotificationWrapper = styled.div`
    height: auto;
    margin: 0 auto;
    text-align: center;
`;

const StyledNoNotificationIcon = styled(Notifications)`
    && {
        margin: 40px;
        font-size: 77px;
        color: #D8D8D8;
    }
`;

const StyledExportIcon = styled(ExitToApp)`
    && {
        font-size: 20px;
        margin-right: 5px;
    }
`;

const ExportButton = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px;
    font-size: 14px;
    padding: 9px;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 3px;
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.green};
    cursor: pointer;
    opacity: ${props => props.disabled ? 0.6 : 1};

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

const StoreMessage = styled.div`
    font-size: 14px;
    color: ${props => props.theme.orange};
    margin-left: 10px;
`;

const Footer = styled.div`
    padding: 20px;
`;

const Home = () => {
    const user = JSON.parse(localStorage.getItem('USER'));
    const { logout } = useAuth();
    let navigate = useNavigate();

    const [activeTab, setActiveTab] = useState(1);
    const [day, setDay] = useState(7);

    const [dropdown, setDropdown] = useState(false);
    const toggleDropdown = () => { setDropdown(!dropdown); }

    const [dashboardData, setDashboardData] = useState({});
    const [exportData, setExportData] = useState([]);
    const [menuSchedule, setMenuSchedule] = useState([]);
    const [news, setNews] = useState([]);
    const [pois, setPois] = useState([]);

    const [storeMessage, setStoreMessage] = useState('');
    const [firstTimePopup, setFirstTimePopup] = useState(false);
    const toggleFirstTimePopup = () => { setFirstTimePopup(!firstTimePopup) };

    const [notificationItem, setNotificationItem] = useState({});
    const [notificationDetailModal, setNotificationDetailModal] = useState(false);
    function toggleNotificationDetailModal() { setNotificationDetailModal(!notificationDetailModal); }

    useEffect( () => {
        const fetchData = () => {
            api.get("dashboard?days=" + day)
            .then(function (res) {
                setDashboardData(res.data.Data);

                let url = "menus"
                + "?status=" + Constant.ACTIVE_MENU 
                + "&status=" + Constant.INACTIVE_MENU;
                api.get(url)
                .then(function (res2) {
                    let array = [];

                    res2.data.Data.List.forEach(item => {
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
                                    Focus: true
                                });
                            })
                        }
                    })
                    setMenuSchedule(array);

                    let url = "news"
                        + "?limit=11" 
                        + "&sort=-priority" 
                        + "&sort=-releasedate"
                        + "&include=apartment&include=resident"
                        + "&status=" + Constant.ACTIVE_NEWS;
                    api.get(url)
                    .then(function (res3) {
                        setNews(res3.data.Data.List);

                        let url = "pois"
                            + "?limit=11" 
                            + "&sort=-priority" 
                            + "&sort=-releasedate"
                            + "&include=apartment&include=resident"
                            + "&status=" + Constant.ACTIVE_POI;
                        api.get(url)
                        .then(function (res4) {
                            setPois(res4.data.Data.List);
                        })
                    })
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        fetchData();
    }, [day]);

    useEffect(() => {
        const fetchData = () => {
            api.get("stores")
            .then(function (res) {
                if (!res.data.Data.List[0]) {
                    toggleFirstTimePopup();
                    setStoreMessage('Tài khoản của bạn đang được xác thực bởi người quản lí chợ, vui lòng chờ đợi...')

                    api.post("stores", {
                        storeName: 'Cửa hàng của ' + user.Residents[0].ResidentName,
                        storeImage: null
                    })
                } else {
                    if (res.data.Data.List[0].Status === Constant.DELETED_MERCHANT_STORE || res.data.Data.List[0].Warned >= 3) {
                        logout();
                        navigate("/");
                    } else if (user.Residents[0].Status === Constant.UNVERIFIED_RESIDENT) {
                        setStoreMessage('Tài khoản của bạn đang được xác thực bởi người quản lí chợ, vui lòng chờ đợi...')
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        fetchData();
    }, []);

    const milliseconds = (h, m, s) => ((h*60*60+m*60+s)*1000);

    useEffect( () => {
        const fetchData = () => {
            let url = "orders"
                + "?sort=-createddate"
                + "&include=product"
                + "&include=resident"
                + "&include=payment";
            api.get(url)
            .then(function (res) {
                setExportData(res.data.Data.List.filter(item => item.Payments[0]).map((item) => ({
                    'Mã đơn hàng': item.OrderId,
                    'Ngày tạo': item.CreatedDate,
                    'Tổng cộng': item.TotalAmount,
                    'Trạng thái': item.Status === Constant.OPEN ? 'Chờ duyệt'
                    : item.Status === Constant.CANCELED_ORDER ? 'Hủy'
                    : item.Status === Constant.CONFIRMED ? 'Đang hoạt động'
                    : item.Status === Constant.COMPLETED ? 'Hoàn thành' : null,
                    'Hình thức thanh toán': item.Payments[0].PaymentMethodId === Constant.PAYMENT_MOMO ? 'MoMo' : 'Tiền mặt',
                    'Tên khách hàng': item.Resident.ResidentName,
                    'Số điện thoại khách hàng': item.Resident.PhoneNumber,
                    'Địa chỉ giao hàng': item.Resident.DeliveryAddress 
                })));
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        fetchData();
    }, []);

    let clickOutside = useClickOutside(() => {
        setDropdown(false);
    });

    const handleSetDay = (e, day) => {
        e.stopPropagation();
        setDay(day);
        setDropdown(false);
    }

    const handleGetItem = (item) => {
        setNotificationItem(item);
        toggleNotificationDetailModal();
    }

    const handleExportExcel = (csvData) => {
        if (exportData.length) {
            const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const fileExtension = '.xlsx';
            const fileName = 'Thong_ke_hoa_don_LCP';

            var wscols = [
                {wch:25},
                {wch:25},
                {wch:12},
                {wch:12},
                {wch:12},
                {wch:20},
                {wch:20},
                {wch:20}
            ];
            const ws = XLSX.utils.json_to_sheet(csvData);
            ws['!cols'] = wscols;
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], {type: fileType});
            FileSaver.saveAs(data, fileName + fileExtension);
        }
    }

    return (
        <PageWrapper>
            {
                storeMessage !== '' ? <StoreMessage>{storeMessage}</StoreMessage> : null
            }
            <Row mb>
                <Title>Trang chủ</Title>

                <Align>
                    <Label>Thống kê theo:</Label>
                    <SelectWrapper ref={clickOutside}>
                        <Select onClick={toggleDropdown}>
                            {day} ngày gần nhất
                            <ArrowDropDown />
                        </Select>

                        <DropdownMenu dropdown={dropdown}>
                            <DropdownList onClick={(e) => handleSetDay(e, 7)}>7 ngày gần nhất</DropdownList>
                            <DropdownList onClick={(e) => handleSetDay(e, 30)}>30 ngày gần nhất</DropdownList>
                            <DropdownList onClick={(e) => handleSetDay(e, 365)}>365 ngày gần nhất</DropdownList>
                        </DropdownMenu>
                    </SelectWrapper>

                    <ExportButton disabled={!exportData.length} onClick={() => handleExportExcel(exportData)}>
                        <StyledExportIcon />
                        Xuất thống kê
                    </ExportButton>
                </Align>
            </Row>

            <Grid>
                <GridItem>
                    <GridLabel>Tổng số đơn hàng</GridLabel>
                    <Align>
                        <StyledCartIcon />
                        <GridParam>{dashboardData.TotalOrder}</GridParam>
                        <GridParamSmall>đơn</GridParamSmall>
                    </Align>
                </GridItem>

                <GridItem>
                    <GridLabel>Tổng số đơn hoàn thành</GridLabel>
                    <Align>
                        <StyledCartCheckoutIcon />
                        <GridParam>{dashboardData.CompletedOrder}</GridParam>
                        <GridParamSmall>đơn</GridParamSmall>
                    </Align>
                </GridItem>

                <GridItem>
                    <GridLabel>Tổng số đơn thất bại</GridLabel>
                    <Align>
                        <StyledNoCartIcon />
                        <GridParam>{dashboardData.CanceledOrder}</GridParam>
                        <GridParamSmall>đơn</GridParamSmall>
                    </Align>
                </GridItem>

                <GridItem>
                    <GridLabel>Tổng số doanh thu</GridLabel>
                    <Align>
                        <StyledMoneyIcon />
                        <GridParam>{dashboardData.TotalRevenue ? dashboardData.TotalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}</GridParam>
                        <GridParamSmall>vnđ</GridParamSmall>
                    </Align>
                </GridItem>

                <GridItem p1 area={"2 / 1 / 2 / 4"}>
                    <MenuSchedule menuSchedule={menuSchedule} />
                </GridItem>

                <GridItem p0 area={"2 / 4 / 2 / 4"}>
                    <Row>
                        <Tab br active={activeTab === 1 ? 1 : 0} onClick={() => setActiveTab(1)}>
                            Tin mới 
                        </Tab>

                        <Tab br active={activeTab === 2 ? 1 : 0} onClick={() => setActiveTab(2)}>
                            Điểm thú vị
                        </Tab>
                    </Row>

                    {
                        activeTab === 1 && news.length ?
                        <>
                            <NotificationWrapper>
                                <HomeNotificationList 
                                    currentItems={news}
                                    handleGetItem={handleGetItem}
                                />
                            </NotificationWrapper>
                        </>
                        : activeTab === 2 && pois.length ?
                        <>
                            <NotificationWrapper>
                                <HomeNotificationList 
                                    currentItems={pois}
                                    handleGetItem={handleGetItem}
                                />
                            </NotificationWrapper>
                        </>
                        : 
                        <NoNotificationWrapper>
                            <StyledNoNotificationIcon />
                        </NoNotificationWrapper>
                    }
                </GridItem>
            </Grid>

            <Footer />

            <NotificationDetailModal 
                display={notificationDetailModal} 
                toggle={toggleNotificationDetailModal} 
                detailItem={notificationItem}
            />

            <FirstTimePopupModal
                display={firstTimePopup} 
                toggle={toggleFirstTimePopup} 
            />
        </PageWrapper>
    )
}

export default Home;