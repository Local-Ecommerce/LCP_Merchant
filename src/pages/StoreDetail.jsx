import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from "../RequestMethod";
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';
import { Close, AddPhotoAlternate, Report } from "@mui/icons-material";

import { db } from "../firebase";
import { ref, push } from "firebase/database";

const PageWrapper = styled.div`
    width: 720px;
    margin: 70px auto;
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
    padding: ${props => props.mb0 ? "20px 20px 0px 20px" : "20px"};
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

const ImageWrapper = styled.div`
    padding: ${props => props.mb0 ? "20px 20px 10px 20px" : "20px"};
`;

const ImageContainer = styled.div`
    width: 120px;
    height: 120px;
    font-size: 14px;
    position: relative;
`;

const Image = styled.img`
  object-fit: contain;
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
  display: ${(props) => (props.display === "true" ? null : "none")};
  cursor: pointer;
`;

const StyledPhotoIcon = styled(AddPhotoAlternate)`
  && {
    cursor: pointer;
    font-size: 30px;
    border: ${props => props.disabled ? "2px dashed rgba(0,0,0,0.2)" : "2px dashed #727272"};
    padding: 45px;
    border-radius: 5px;
    color: ${props => props.disabled ? "rgba(0,0,0,0.2)" : props.theme.grey};
    margin-bottom: 10px;

    &:active {
      transform: ${props => props.disabled ? null : "translateY(1px)"};
    }

    &:hover {
      opacity: 0.8;
      background-color: ${props => props.disabled ? null : "#e8e8e8"}
    }
  }
`;

const StyledCloseButton = styled(Close)`
  && {
    position: absolute;
    padding: 2px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 25px;
    color: white;
    font-size: 20px;
    top: -10px;
    right: -10px;
    cursor: pointer;

    &:active {
      transform: translateY(1px);
    }

    &:hover {
      opacity: 0.8;
      background-color: ${(props) => props.theme.dark};
    }
  }
`;

const HiddenInputFile = styled.input`
    opacity: 0;
    position: absolute;
    z-index: -1;
`;

const StyledReportIcon = styled(Report)`
    && {
        color: ${props => props.theme.red};
    }
`;

const StoreDetail = () => {
    const user = JSON.parse(localStorage.getItem('USER'));

    const [editable, setEditable] = useState(true);
    const [loading, setLoading] = useState(false);

    const [item, setItem] = useState('');
    const [input, setInput] = useState({ name: '', image: '' });
    const [error, setError] = useState({ name: '', image: '' });

    useEffect(() => {   //get APIdata store
        setLoading(true);
        const fetchData = () => {
            api.get("stores")
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    setItem(res.data.Data.List[0]);
                    console.log(res.data.Data.List[0]);
                    setInput({
                        name: res.data.Data.List[0].StoreName,
                        image: res.data.Data.List[0].StoreImage || ''
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
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
        setError(error => ({ ...error, [name]: '' }));
    }

    const handleToggleEditable = () => {
        if (!editable) { setInput({ name: item.StoreName, image: item.StoreImage || '' }) };
        setEditable(!editable);
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleSetImage = async (e) => {
        setError(error => ({ ...error, image: '' }));
        const [file] = e.target.files;
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 640,
            fileType: "image/jpg"
        }
        if (file) {
            const compressedFile = await imageCompression(file, options);
            let base64 = await toBase64(compressedFile);
            setInput(input => ({ ...input, image: base64.toString() }));
        }
    };

    const handleRemoveImage = () => {
        setError(error => ({ ...error, image: '' }));
        setInput(input => ({ ...input, image: '' }));
    };

    const handleEditItem = (event) => {
        event.preventDefault();

        if (checkValid()) {
            const notification = toast.loading("Đang xử lí yêu cầu...");

            const editItem = async () => {
                api.put("stores?id=" + item.MerchantStoreId, {
                    storeName: input.name,
                    storeImage: input.image.split(',')[1]
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        push(ref(db, `Notification/` + user.Residents[0].ApartmentId), {
                            createdDate: Date.now(),
                            data: {
                                name: input.name
                            },
                            read: 0,
                            receiverId: user.Residents[0].ApartmentId,
                            senderId: user.Residents[0].ResidentId,
                            type: '105'
                        });
                        toast.update(notification, { render: "Gửi cập nhật chờ duyệt thành công!", type: "success", autoClose: 5000, isLoading: false });
                    }
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

        if (input.name.trim() === null || input.name.trim() === '') {
            setError(error => ({ ...error, name: 'Vui lòng nhập tên cửa hàng' }));
            check = true;
        }

        if (check) {
            return false;
        }

        return true;
    }

    return (
        <PageWrapper>
            <form onSubmit={handleEditItem} id="form">
                <ContainerWrapper>
                    <HeaderWrapper>
                        <Row>
                            <div>
                                <Header>Thông tin cửa hàng</Header>
                                {
                                    item.Warned === 1 ?
                                    <StyledReportIcon />
                                    : item.Warned === 2 ?
                                    <>
                                        <StyledReportIcon />
                                        <StyledReportIcon />
                                    </>
                                    : null
                                }
                            </div>
                            <StyledHyperlink onClick={handleToggleEditable}>{editable ? "Sửa" : "Hủy"}</StyledHyperlink>
                        </Row>
                    </HeaderWrapper>

                    <ImageWrapper mb0>
                        <FieldLabel>Ảnh cửa hàng</FieldLabel>
                        <ImageContainer>
                            {
                                input.image === "" ? 
                                <label>
                                    <HiddenInputFile disabled={editable} type="file" accept="image/png, image/jpeg" onChange={handleSetImage} />
                                    <StyledPhotoIcon disabled={editable} />
                                </label>
                                : 
                                editable ? null : <StyledCloseButton onClick={handleRemoveImage} />
                            }
                            <Image src={input.image} display={input.image === "" ? "false" : "true"} />
                        </ImageContainer>
                    </ImageWrapper>

                    <TextFieldWrapper>
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