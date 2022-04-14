
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from "react-router-dom";
import { KeyboardBackspace, CreditCard, CreditCardOff, Person, LocationOn, CalendarToday } from '@mui/icons-material';
import * as Constant from '../Constant';

import ProductInOrderList from '../components/Order/ProductInOrderList';
import ConfirmModal from '../components/Order/ConfirmModal';
import RejectModal from '../components/Order/RejectModal';
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

const OrderDetail = () => {
    const { id } = useParams();

    const [residentModal, setResidentModal] = useState(false);
    const toggleResidentModal = () => { setResidentModal(!residentModal); }
    const [confirmModal, setConfirmModal] = useState(false);
    const toggleConfirmModal = () => { setConfirmModal(!confirmModal); }
    const [rejectModal, setRejectModal] = useState(false);
    const toggleRejectModal = () => { setRejectModal(!rejectModal); }

    const [order, setOrder] = useState({});
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [change, setChange] = useState(false);

    useEffect(() => {   //get menu
        setOrder({
            OrderId: 'ID001',
            DeliveryAddress: 'Tầng 2A',
            CreatedDate: '29/3/2022 13:00 PM',
            TotalAmount: 520000,
            Status: Constant.OPEN,
            Resident: { 
                ResidentName: 'Lê Văn Tám', 
                PhoneNumber: '0901234567',
                DeliveryAddress: 'Tầng 2A',
                DateOfBirth: '01/01/1995',
                Account: { AvatarImage: '' },
                Gender: 'Nam'
            }
        })

        setProducts([
            {
                Image: '',
                ProductName: 'Bánh mì 2 trứng',
                Quantity: 2,
                UnitPrice: 15000,
                FinalAmount: 30000
            },
            {
                Image: '',
                ProductName: 'Bánh mì 2 trứng',
                Quantity: 2,
                UnitPrice: 1500000,
                FinalAmount: 3000000
            },
            {
                Image: '',
                ProductName: 'Bánh mì 2 trứng',
                Quantity: 2,
                UnitPrice: 15000,
                FinalAmount: 30000
            }
        ])
        setLoading(false);
    }, [change]);

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
                                <HeaderTop>{order.CreatedDate}</HeaderTop>
                                <HeaderBottom>{order.OrderId}</HeaderBottom>
                            </div>
                        </Row>
                    </HeaderWrapper>

                    <FlexWrapper>
                        <CustomerWrapper>
                            <StyledPersonIcon />
                            
                            <DetailWrapper>
                                <DetailLabel>Khách hàng</DetailLabel>
                                <DetailText>{loading ? '' : order.Resident.ResidentName}</DetailText>
                                <DetailText>{loading ? '' : order.Resident.PhoneNumber.slice(0, 4) + " " + order.Resident.PhoneNumber.slice(4, 7) + " " + order.Resident.PhoneNumber.slice(7)}</DetailText>
                                <DetailHyperlink onClick={toggleResidentModal}>Xem chi tiết</DetailHyperlink>
                            </DetailWrapper>
                        </CustomerWrapper>

                        <AddressWrapper>
                            <StyledLocationIcon />

                            <DetailWrapper>
                                <DetailLabel>Địa chỉ nhận hàng</DetailLabel>
                                <DetailText>{loading ? '' : order.DeliveryAddress}</DetailText>
                            </DetailWrapper>
                        </AddressWrapper>
                    </FlexWrapper>

                    <ProductListWrapper>
                        <ProductInOrderList currentItems={products} />
                        <TotalPriceWrapper>
                            <Row>
                                <TotalPriceLabel>Tổng cộng</TotalPriceLabel>
                                <TotalPriceText>{loading ? '' : order.TotalAmount.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</TotalPriceText>
                            </Row>
                        </TotalPriceWrapper>
                    </ProductListWrapper>
                </LeftWrapper>

                <RightWrapper>
                    <PaymentLabel>Thanh toán</PaymentLabel>

                    <PaymentWrapper>
                        <Row mb>
                            <StyledNoCreditIcon />
                            <PaymentText mb0>Trực tiếp khi nhận hàng</PaymentText>
                        </Row>
                        <PaymentText>
                            <Grey>Số tiền:</Grey> 
                            {loading ? '' : order.TotalAmount.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ
                        </PaymentText>
                        <PaymentText>
                            <Grey>Thời gian:</Grey>
                            {loading ? '' : order.CreatedDate}
                        </PaymentText>
                    </PaymentWrapper>

                    <PaymentWrapper mt>
                        <Row mb>
                            <StyledCreditIcon />
                            <PaymentText mb0>MoMo</PaymentText>
                        </Row>
                        <PaymentText>
                            <Grey>Số tiền:</Grey> 
                            {loading ? '' : order.TotalAmount.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ
                        </PaymentText>
                        <PaymentText>
                            <Grey>Thời gian:</Grey>
                            {loading ? '' : order.CreatedDate}
                        </PaymentText>
                    </PaymentWrapper>
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

            <ResidentDetailModal
                display={residentModal} 
                toggle={toggleResidentModal}
                resident={order.Resident}
            />

            <ConfirmModal
                display={confirmModal} 
                toggle={toggleConfirmModal} 
            />

            <RejectModal
                display={rejectModal} 
                toggle={toggleRejectModal} 
            />
        </PageWrapper>
    )
}

export default OrderDetail;