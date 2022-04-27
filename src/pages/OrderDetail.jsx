
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { api } from "../RequestMethod";
import { DateTime } from 'luxon';
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { KeyboardBackspace, CreditCard, CreditCardOff, Person, LocationOn, CalendarToday } from '@mui/icons-material';
import * as Constant from '../Constant';

import ProductInOrderList from '../components/Order/ProductInOrderList';
import ConfirmModal from '../components/Order/ConfirmModal';
import RejectModal from '../components/Order/RejectModal';
import CompleteModal from '../components/Order/CompleteModal';
import ResidentDetailModal from '../components/Order/ResidentDetailModal';

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

const LeftWrapper = styled.div`
    flex: 2;
    margin-right: 30px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: #fff;
    border-radius: 5px;
`;

const RightWrapper = styled.div`
    flex: 1;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: #fff;
    border-radius: 5px;
`;

const ProductListWrapper = styled.div`
    border: 1px solid #dee2e6;
    margin: 0px 20px 20px 20px;
`;

const TotalPriceWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 20px 28px;
`;

const TotalPriceLabel = styled.div`
    font-size: 13px;
    color: ${props => props.theme.grey};
    margin-right: 15px;
`;

const TotalPriceText = styled.div`
    font-size: 16px;
    font-weight: 600;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.spacebetween ? "space-between" : null};
    margin-top: ${props => props.mt ? "20px" : null};
    margin-bottom: ${props => props.mb ? "5px" : null};
`;

const HeaderWrapper = styled.div`
    padding-left: 20px;
    border-bottom: 1px solid #D8D8D8;
`;

const HeaderTop = styled.div`
    font-weight: 600;
    margin-bottom: 5px;
    font-size: 14px;
`;

const HeaderBottom = styled.div`
    color: ${props => props.theme.grey};
    font-size: 13px;
`;

const StyledCalendarIcon = styled(CalendarToday)`
    && {
        padding: 25px 10px;
    }
`;

const CustomerWrapper = styled.div`
    flex: 1;
    margin: 30px;
    display: flex;
`;

const AddressWrapper = styled.div`
    flex: 1;
    margin: 30px;
    display: flex;
`;

const DetailWrapper = styled.div`
`;

const DetailLabel = styled.div`
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 10px;
`;

const DetailText = styled.div`
    font-size: 14px;
    margin-bottom: 5px;
`;

const DetailHyperlink = styled.div`
    font-size: 14px;
    margin-top: 10px;
    color: ${props => props.theme.blue};
    cursor: pointer;
`;

const StyledPersonIcon = styled(Person)`
    && {
        padding: 10px;
        border-radius: 50%;
        background-color: #e9f0fe;
        color: #2f69e7;
        margin-right: 15px;
    }
`;

const StyledLocationIcon = styled(LocationOn)`
    && {
        padding: 10px;
        border-radius: 50%;
        background-color: #e9f0fe;
        color: #2f69e7;
        margin-right: 15px;
    }
`;

const PaymentWrapper = styled.div`
    padding: 10px;
    padding-bottom: 5px;
    border-radius: 5px;
    border: 1px solid rgba(0,0,0,0.15);
    margin-top: ${props => props.mt ? "20px" : null};
`;

const PaymentLabel = styled.div`
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 15px;
`;

const PaymentText = styled.div`
    font-size: 14px;
    font-weight: ${props => props.mb0 ? "600" : null};
    margin-bottom: ${props => props.mb0 ? "0px" : "10px"};
`;

const Grey = styled.span`
    color: ${props => props.theme.grey};
    margin-right: 7px;
`;

const StyledCreditIcon = styled(CreditCard)`
    && {
        font-size: 24px;
        margin-right: 5px;
        color: #af2070;
        margin-bottom: 5px;
    }
`;

const StyledNoCreditIcon = styled(CreditCardOff)`
    && {
        font-size: 24px;
        margin-right: 5px;
        color: ${props => props.theme.dark};
        margin-bottom: 5px;
    }
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

const FooterWrapper = styled.div`
    border-top: 1px solid #d6d6d6;
    padding-top: 20px;
    height: 100px;
`;

const FloatRight = styled.div`
    float: right;
`;

const Button = styled.button`
    min-width: 80px;
    border-radius: 5px;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    background: ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.white};
    color: ${props => props.red || props.blue ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.greyBorder};
    font-size: 14px;
    margin-right: ${props => props.mr ? "15px" : null};

    &:active {
    transform: translateY(1px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const OrderDetail = ({ refresh, toggleRefresh }) => {
    const { id } = useParams();
    let navigate = useNavigate();

    const [residentModal, setResidentModal] = useState(false);
    const toggleResidentModal = () => { setResidentModal(!residentModal); }
    const [confirmModal, setConfirmModal] = useState(false);
    const toggleConfirmModal = () => { setConfirmModal(!confirmModal); }
    const [rejectModal, setRejectModal] = useState(false);
    const toggleRejectModal = () => { setRejectModal(!rejectModal); }
    const [completeModal, setCompleteModal] = useState(false);
    const toggleCompleteModal = () => { setCompleteModal(!completeModal); }

    const [order, setOrder] = useState({
        Resident: {
            ResidentName: '',
            PhoneNumber: '',
            DeliveryAddress: ''
        },
        TotalAmount: 0
    });
    const [products, setProducts] = useState([]);
    const [payment, setPayment] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            let url = "orders"
                + "?id=" + id
                + "&include=product"
                + "&include=resident"
                + "&include=payment";
            api.get(url)
            .then(function (res) {
                setOrder(res.data.Data.List[0]);
                setProducts(res.data.Data.List[0].OrderDetails);
                setPayment(res.data.Data.List[0].Payments[0]);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
        }
        fetchData();
    }, []);

    const handleApproveItem = (e) => {
        e.preventDefault();

        const approveItem = async () => {
            const notification = toast.loading("Đang xử lí yêu cầu...");
            api.put("orders?id=" + id + "&status=" + Constant.CONFIRMED)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    toggleRefresh();
                    navigate("/orders");
                    toast.update(notification, { render: "Duyệt đơn hàng thành công!", type: "success", autoClose: 5000, isLoading: false });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        }
        approveItem();
        toggleConfirmModal();
    }

    const handleRejectItem = (e) => {
        e.preventDefault();

        const rejectItem = async () => {
            const notification = toast.loading("Đang xử lí yêu cầu...");
            api.put("orders?id=" + id + "&status=" + Constant.CANCELED_ORDER)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    toggleRefresh();
                    navigate("/orders");
                    toast.update(notification, { render: "Từ chối đơn hàng thành công!", type: "success", autoClose: 5000, isLoading: false });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        }
        rejectItem();
        toggleRejectModal();
    }

    const handleCompleteItem = (e) => {
        e.preventDefault();

        const completeItem = async () => {
            const notification = toast.loading("Đang xử lí yêu cầu...");
            api.put("orders?id=" + id + "&status=" + Constant.COMPLETED)
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    toggleRefresh();
                    navigate("/orders");
                    toast.update(notification, { render: "Hoàn thành đơn hàng!", type: "success", autoClose: 5000, isLoading: false });
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
            });
        }
        completeItem();
        toggleCompleteModal();
    }

    return (
        <PageWrapper>
            <Row>
                <Link to="/orders"><StyledBackIcon /></Link>
                <Title><TitleGrey>Đơn hàng </TitleGrey>/ {loading ? '' : order.OrderId}</Title>
            </Row>

            <FlexWrapper>
                <LeftWrapper>
                    <HeaderWrapper>
                        <Row>
                            <StyledCalendarIcon />
                            <div>
                                <HeaderTop>{loading ? '' : DateTime.fromISO(order.CreatedDate).toFormat('dd/MM/yyyy t')}</HeaderTop>
                                <HeaderBottom>{loading ? '' : order.OrderId}</HeaderBottom>
                            </div>
                        </Row>
                    </HeaderWrapper>

                    <FlexWrapper>
                        <CustomerWrapper>
                            <StyledPersonIcon />
                            
                            <DetailWrapper>
                                <DetailLabel>Khách hàng</DetailLabel>
                                <DetailText>{loading ? '' : order.Resident ? order.Resident.ResidentName : ''}</DetailText>
                                <DetailText>{loading ? '' : order.Resident && order.Resident.PhoneNumber ? order.Resident.PhoneNumber.slice(0, 4) + " " + order.Resident.PhoneNumber.slice(4, 7) + " " + order.Resident.PhoneNumber.slice(7) : '-'}</DetailText>
                                <DetailHyperlink onClick={toggleResidentModal}>Xem chi tiết</DetailHyperlink>
                            </DetailWrapper>
                        </CustomerWrapper>

                        <AddressWrapper>
                            <StyledLocationIcon />

                            <DetailWrapper>
                                <DetailLabel>Địa chỉ nhận hàng</DetailLabel>
                                <DetailText>{loading ? '' : order.Resident ?  order.Resident.DeliveryAddress : ''}</DetailText>
                            </DetailWrapper>
                        </AddressWrapper>
                    </FlexWrapper>

                    <ProductListWrapper>
                        <ProductInOrderList currentItems={products} />
                        <TotalPriceWrapper>
                            <Row>
                                <TotalPriceLabel>Tổng cộng</TotalPriceLabel>
                                <TotalPriceText>{loading ? '' : order.TotalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</TotalPriceText>
                            </Row>
                        </TotalPriceWrapper>
                    </ProductListWrapper>
                </LeftWrapper>

                <RightWrapper>
                    <PaymentLabel>Thanh toán</PaymentLabel>

                    {
                        !loading && payment && payment.PaymentMethodId === Constant.PAYMENT_MOMO ?
                        <PaymentWrapper mt>
                            <Row mb>
                                <StyledCreditIcon />
                                <PaymentText mb0>MoMo</PaymentText>
                            </Row>
                            <PaymentText>
                                <Grey>Số tiền:</Grey> 
                                {loading ? '' : payment.PaymentAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ
                            </PaymentText>
                            <PaymentText>
                                <Grey>Thời gian:</Grey>
                                {DateTime.fromISO(payment.DateTime).toFormat('dd/MM/yyyy t')}
                            </PaymentText>
                        </PaymentWrapper>
                        :
                        <PaymentWrapper>
                            <Row mb>
                                <StyledNoCreditIcon />
                                <PaymentText mb0>Trực tiếp khi nhận hàng</PaymentText>
                            </Row>
                            <PaymentText>
                                <Grey>Số tiền:</Grey> 
                                {loading ? '' : payment.PaymentAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ
                            </PaymentText>
                            <PaymentText>
                                <Grey>Thời gian:</Grey>
                                {DateTime.fromISO(payment.DateTime).toFormat('dd/MM/yyyy t')}
                            </PaymentText>
                        </PaymentWrapper>
                    }
                </RightWrapper>
            </FlexWrapper>
            
            {
                order.Status === Constant.OPEN ?
                <FooterWrapper>
                    <FloatRight>
                        <Button onClick={toggleRejectModal} type="button" mr>Từ chối</Button>
                        <Button onClick={toggleConfirmModal} blue type="button">Duyệt</Button>
                    </FloatRight>
                </FooterWrapper>
                : null
            }

            {
                order.Status === Constant.CONFIRMED ?
                <FooterWrapper>
                    <FloatRight>
                        <Button onClick={toggleCompleteModal} blue type="button">Hoàn thành</Button>
                    </FloatRight>
                </FooterWrapper>
                : null
            }

            <ResidentDetailModal
                display={residentModal} 
                toggle={toggleResidentModal}
                resident={order.Resident}
            />

            <ConfirmModal
                display={confirmModal} 
                toggle={toggleConfirmModal}
                handleApproveItem={handleApproveItem}
            />

            <RejectModal
                display={rejectModal} 
                toggle={toggleRejectModal}
                handleRejectItem={handleRejectItem}
            />

            <CompleteModal
                display={completeModal} 
                toggle={toggleCompleteModal}
                handleCompleteItem={handleCompleteItem}
            />
        </PageWrapper>
    )
}

export default OrderDetail;