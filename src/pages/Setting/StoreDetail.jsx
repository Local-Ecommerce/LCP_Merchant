import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from "../../RequestMethod";
import { toast } from 'react-toastify';

const PageWrapper = styled.div`
    width: 720px;
    margin: 40px auto;
`;

const Title = styled.h1`
    font-size: 16px;
    color: #383838;
    margin: 15px 15px ${props => props.mb ? "-5px" : "15px"} 15px;
`;

const Row = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`;

const ContainerWrapper = styled.div`
    margin-bottom: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: #fff;
    border-radius: 5px;
`;

const HeaderWrapper = styled.div`
    padding-left: 20px;
    border-bottom: 1px solid #D8D8D8;
`;

const Header = styled.div`
    font-weight: 600;
`;

const StyledHyperlink = styled.a`
    font-size: 14px;
    color: #007bff;
    cursor: pointer;
    padding: 10px;
    margin: 10px 20px 10px 10px;
    border-radius: 50px;
    font-weight: 600;

    &:active {
        transform: translateY(1px);
    }

    &:hover {
        opacity: 0.8;
        background-color: ${props => props.theme.hover};
    }
`;

const TextFieldWrapper = styled.div`
    padding: ${props => props.mb ? "20px 20px 0px 20px" : "20px"};
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
    background-color: ${props => props.disabled ? props.theme.disabled : props.theme.blue};
    color: white;
    font-weight: 600;

    &:active {
    transform: translateY(1px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const FieldLabel = styled.div`
    font-weight: 400;
    font-size: 14px;
    margin-top: ${props => props.mt ? "20px" : "0px"};
    margin-bottom: 10px;
`;

const TextField = styled.input`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 5px;
    padding: 10px 14px;
    outline: none;
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.greyBorder};
    border-radius: 3px;
    font-size: 14px;

    &:disabled {
        color: ${props => props.theme.black};
    }
`;

const HelperText = styled.span`
    font-size: 13px;
    padding: 5px;
    color: ${props => props.error ? props.theme.red : props.theme.grey};
`;

const StoreDetail = () => {
    const [editable, setEditable] = useState(true);
    const [loading, setLoading] = useState(false);

    const [item, setItem] = useState('');
    const [input, setInput] = useState({ name: '', prefix: '' });
    const [error, setError] = useState({ name: '', prefix: '' });
    const [change, setChange] = useState(false);

    useEffect(() => {   //get APIdata store
        setLoading(true);
        const fetchData = () => {
            api.get("stores")
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    setItem(res.data.Data.List[0]);
                    setInput({
                        name: res.data.Data.List[0].StoreName,
                        prefix: 'AP-001'
                    });
                    setLoading(false);
                }
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
        }
        fetchData();
    }, [change]);

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
        setError(error => ({ ...error, [name]: '' }));
    }

    const handleToggleEditable = () => {
        if (!editable) { setInput({ name: item.StoreName, prefix: 'AP-001' }) };
        setEditable(!editable);
    }

    const handleEditItem = (event) => {
        event.preventDefault();

        if (checkValid()) {
            const notification = toast.loading("Đang xử lí yêu cầu...");

            console.log(input);
            const editItem = async () => {
                api.put("stores?id=" + item.MerchantStoreId, {
                    storeName: input.name,
                    apartmentId: "AP001",
                    status: 6001
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        toast.update(notification, { render: "Cập nhật thành công!", type: "success", autoClose: 5000, isLoading: false });
                    }
                    setChange(!change);
                })
                .catch(function (error) {
                    console.log(error);
                    toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
                });
            };
            editItem();
        }
    }

    const checkValid = () => {
        let check = false;
        setError(error => ({ ...error, name: '' }));

        if (input.name === null || input.name === '') {
            setError(error => ({ ...error, name: 'Vui lòng nhập tên sản phẩm' }));
            check = true;
        }

        if (check) {
            return false;
        }

        return true;
    }

    return (
        <PageWrapper>
            <Title>Bảng giá</Title>

            <form onSubmit={handleEditItem} id="form">
                <ContainerWrapper>
                    <HeaderWrapper>
                        <Row>
                            <Header>Thông tin cơ bản</Header>
                            <StyledHyperlink onClick={handleToggleEditable}>{editable ? "Sửa" : "Hủy"}</StyledHyperlink>
                        </Row>
                    </HeaderWrapper>

                    <TextFieldWrapper mb>
                        <Row spacebetween>
                            <FieldLabel>Tên cửa hàng</FieldLabel>
                            <HelperText ml0>{input.name.length}/250 kí tự</HelperText>
                        </Row>

                        <TextField
                            disabled={editable} maxLength={250}
                            type="text" value={loading ? "Đang tải..." : input.name} name='name'
                            onChange={handleChange}
                            error={error.name !== ''}
                         />
                         <HelperText error>{error.name}</HelperText>
                    </TextFieldWrapper>

                    <TextFieldWrapper>
                        <Row spacebetween>
                            <FieldLabel>Tiền tố sản phẩm</FieldLabel>
                            <HelperText ml0>{input.prefix.length}/100 kí tự</HelperText>
                        </Row>

                        <TextField
                            disabled={editable} maxLength={100}
                            type="text" value={loading ? "Đang tải..." : input.prefix} name='prefix'
                            onChange={handleChange}
                            error={error.prefix !== ''}
                         />
                         <HelperText error>{error.prefix}</HelperText>
                    </TextFieldWrapper>
                </ContainerWrapper>

                <FooterWrapper>
                    <FloatRight>
                        <Button disabled={editable}>Lưu</Button>
                    </FloatRight>
                </FooterWrapper>
            </form>
        </PageWrapper>
    )
}

export default StoreDetail;