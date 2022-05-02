/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { api } from "../RequestMethod";
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';
import useClickOutside from "../contexts/useClickOutside";
import { Close, AddPhotoAlternate, ArrowDropDown } from "@mui/icons-material";
import { TextField as MuiTextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

import { auth } from "../firebase";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

const PageWrapper = styled.div`
    width: 600px;
    margin: 70px auto;
`;

const Row = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`;

const ContainerWrapper = styled.div`
    margin-bottom: 30px;
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

const InputWrapper = styled.div`
    margin: 20px;
	padding-bottom: ${props => props.pb ? "20px" : null};
	margin-top: ${props => props.mt0 ? "0px" : null};
	margin-bottom: ${props => props.mb0 ? "0px" : null};
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

const Flex = styled.div`
    display: flex;
`;

const FlexChild = styled.div`
  	width: 100%;
`;

const SelectWrapper = styled.div`
    width: 100%;
    display: inline-block;
    border-radius: 3px;
	background-color: ${props => props.disabled ? "#fafafa" : null};
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.greyBorder};
    transition: all .5s ease;
    position: relative;
    font-size: 14px;
    text-align: left;

    &:hover {
        box-shadow: 0 0 4px rgb(204, 204, 204);
        border-radius: 2px 2px 0 0;
    }

    &:active {
        box-shadow: 0 0 4px rgb(204, 204, 204);
        border-radius: 2px 2px 0 0;
    }

	&:disabled {
        color: ${props => props.theme.black};
    }
`;

const Select = styled.div`
    cursor: pointer;
    display: flex;
    padding: 7px 10px 7px 15px;
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
    max-height: 144px;
    overflow-y: auto;
    z-index: 9;
    padding: 0;
    list-style: none;
`;

const DropdownList = styled.li`
    padding: 10px;
    transition: all .2s ease-in-out;
	border-top: 1px solid rgba(0,0,0,0.05);
    cursor: pointer;

	&:hover {
		background-color: ${props => props.theme.hover};
	}
`;

const HiddenInputFile = styled.input`
    opacity: 0;
    position: absolute;
    z-index: -1;
`;

const UserProfile = ({ refresh, toggleRefresh }) => {
    const user = JSON.parse(localStorage.getItem('USER'));
    const [dropdown, setDropdown] = useState(false);
	const toggleDropdown = () => { if (editable) { setDropdown(!dropdown); }}

    const [change, setChange] = useState(false);
    const [loading, setLoading] = useState(false);
	const [editable, setEditable] = useState(false);
	const [editPassword, setEditPassword] = useState(false);

    const [input, setInput] = useState({ 
        residentName: '',
        phoneNumber: '',
        deliveryAddress: '',
        dateOfBirth: DateTime.fromFormat('01/01/2000', 'd/M/yyyy').toUTC().toISO(),
        gender: 'Nam',
        profileImage: '',

        password: '******', 
        confirmPassword: '', 
        newPassword: '' 
    });
    const [error, setError] = useState({ 
        residentName: '',
        phoneNumber: '',
        deliveryAddress: '',
        dateOfBirth: '',

        password: '', 
        confirmPassword: '', 
        newPassword: '' 
    });

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            api.get("residents?id=" + user.Residents[0].ResidentId)
            .then(function (res) {
                setInput(input => ({ ...input, 
                    residentName: res.data.Data.List[0].ResidentName || '',
                    phoneNumber: res.data.Data.List[0].PhoneNumber || '',
                    deliveryAddress: res.data.Data.List[0].DeliveryAddress || '',
                    dateOfBirth: res.data.Data.List[0].DateOfBirth,
                    gender: res.data.Data.List[0].Gender || 'Nam'
                }));

                api.get("accounts?id=" + res.data.Data.List[0].AccountId)
                .then(function (res2) {
                    setInput(input => ({ ...input, 
                        profileImage: res2.data.Data.ProfileImage || ''
                    }));
                    setLoading(false);
                })
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
        }
        fetchData();
    }, [change]);

	let clickOutside = useClickOutside(() => {
        setDropdown(false);
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
        setError(error => ({ ...error, [name]: '' }));
    }

    const handleToggleEditable = () => {
        setEditable(!editable);
    }

	const handleToggleEditPassword = () => {
        if (!editPassword) { 
            setInput(input => ({ ...input, password: '', confirmPassword: '', newPassword: '' }))
        } else { 
            setInput(input => ({ ...input, password: '******', confirmPassword: '', newPassword: '' }))
        };
        setEditPassword(!editPassword);
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleSetImage = async (e) => {
        setError(error => ({ ...error, profileImage: '' }));
        const [file] = e.target.files;
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 640,
            fileType: "image/jpg"
        }
        if (file) {
            const compressedFile = await imageCompression(file, options);
            let base64 = await toBase64(compressedFile);
            setInput(input => ({ ...input, profileImage: base64.toString() }));
        }
    };

    const handleRemoveImage = () => {
        setError(error => ({ ...error, profileImage: '' }));
        setInput(input => ({ ...input, profileImage: '' }));
    };

    const handleUpdatePassword = async (event) => {
        event.preventDefault();

        if (checkPasswordValid()) {
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                input.password
            );
    
            reauthenticateWithCredential(
                auth.currentUser, 
                credential
            ).then(() => {
                const notification = toast.loading("Đang xử lí yêu cầu...");
    
                updatePassword(auth.currentUser, input.newPassword)
                .then(() => {
                    handleToggleEditPassword();
                    toast.update(notification, { render: "Cập nhật thành công!", type: "success", autoClose: 5000, isLoading: false });
                }).catch((error) => {
                    console.log(error);
                    toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
                });
            }).catch((error) => {
                console.log(error);
                setError(error => ({ ...error, password: 'Mật khẩu không đúng. Vui lòng thử lại' }));
                setError(error => ({ ...error, confirmPassword: 'Mật khẩu không đúng. Vui lòng thử lại' }));
            });
        }
    }

    const checkPasswordValid = () => {
        let check = false;
        setError(error => ({ ...error, password: '', confirmPassword: '', newPassword: '' }));

        if (input.password.trim() === null || input.password.trim() === '') {
            setError(error => ({ ...error, password: 'Vui lòng không bỏ trống' }));
            check = true;
        }
        if (input.confirmPassword.trim() === null || input.confirmPassword.trim() === '') {
            setError(error => ({ ...error, confirmPassword: 'Vui lòng không bỏ trống' }));
            check = true;
        }
        let passwordPattern = /^[a-zA-Z0-9!@#$%^&*()]+$/;
        if (input.newPassword.trim().length < 6 || !passwordPattern.test(input.newPassword.trim())) {
            setError(error => ({ ...error, newPassword: 'Mật khẩu phải bao gồm ít nhất 6 kí tự và không chứa dấu cách' }));
            check = true;
        }
        if (input.confirmPassword.trim() !== input.newPassword.trim()) {
            setError(error => ({ ...error, confirmPassword: 'Mật khẩu xác nhận không trùng khớp với mật khẩu mới' }));
            check = true;
        }

        if (check) {
            return false;
        }

        return true;
    }

    const handleEditItem = (event) => {
        event.preventDefault();

        if (validCheck()) {
            const editItem = async () => {
                const notification = toast.loading("Đang xử lí yêu cầu...");
                api.put("residents?id=" + user.Residents[0].ResidentId, {
                    residentName: input.residentName,
                    phoneNumber: input.phoneNumber,
                    dateOfBirth: DateTime.fromISO(input.dateOfBirth).toFormat('yyyy-MM-dd'),
                    gender: input.gender,
                    deliveryAddress: input.deliveryAddress,
                    profileImage: input.profileImage.includes(',') ? input.profileImage.split(",")[1] : null
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        setChange(!change);
                        toggleRefresh();
                        toast.update(notification, { render: "Cập nhật thành công!", type: "success", autoClose: 5000, isLoading: false });
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

    const validCheck = () => {
        let check = false;
        setError(error => ({ ...error, 
            residentName: '',
            phoneNumber: '',
            deliveryAddress: '',
            dateOfBirth: ''
        }));

        if (input.residentName.trim() === null || input.residentName.trim() === '') {
            setError(error => ({ ...error, residentName: 'Vui lòng không để trống tên' }));
            check = true;
        }
        let phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        if (input.phoneNumber.trim() === null || input.phoneNumber.trim() === '' || !phonePattern.test(input.phoneNumber.trim())) {
            setError(error => ({ ...error, phoneNumber: 'Vui lòng nhập đúng chuẩn số điện thoại' }));
            check = true;
        }
        if (input.deliveryAddress.trim() === null || input.deliveryAddress.trim() === '') {
            setError(error => ({ ...error, deliveryAddress: 'Vui lòng không để trống địa chỉ' }));
            check = true;
        }
        if (input.dateOfBirth === null || input.dateOfBirth === '' 
            || DateTime.fromISO(input.dateOfBirth).toFormat('dd/MM/yyyy') === 'Invalid DateTime') {
            setError(error => ({ ...error, dateOfBirth: 'Vui lòng nhập định dạng ngày/tháng/năm' }));
            check = true;
        }

        if (check === true) {
            return false;
        }
        return true;
    }

    const handleSetGender = (e, gender) => {
        e.stopPropagation();
        setInput(input => ({ ...input, gender: gender }))
        setDropdown(false);
    }

    return (
        <PageWrapper>
            <form onSubmit={handleEditItem} id="form">
                <ContainerWrapper>
                    <HeaderWrapper>
                        <Row>
                            <Header>Tài khoản</Header>
                            <StyledHyperlink onClick={handleToggleEditPassword}>{editPassword ? "Hủy" : "Cập nhật mật khẩu"}</StyledHyperlink>
                        </Row>
                    </HeaderWrapper>

                    <InputWrapper pb={!editPassword}>
                        <Row spacebetween>
                            <FieldLabel>Mật khẩu hiện tại</FieldLabel>
                            {!editPassword ? null : <HelperText ml0>{input.password.length}/20 kí tự</HelperText>}
                        </Row>

                        <TextField
                            disabled={!editPassword} maxLength={20}
                            type="password" value={loading ? "Đang tải..." : input.password} name='password'
                            onChange={handleChange}
                            error={error.password !== ''}
                         />
                         <HelperText error>{error.password}</HelperText>
                    </InputWrapper>

					{
						editPassword ?
						<>
							<InputWrapper>
								<Row spacebetween>
									<FieldLabel>Mật khẩu mới</FieldLabel>
									<HelperText ml0>{input.newPassword.length}/20 kí tự</HelperText>
								</Row>

								<TextField
									disabled={!editPassword} maxLength={20}
									type="password" value={loading ? "Đang tải..." : input.newPassword} name='newPassword'
									onChange={handleChange}
									error={error.newPassword !== ''}
								/>
								<HelperText error>{error.newPassword}</HelperText>
							</InputWrapper>

                            <InputWrapper pb>
								<Row spacebetween>
									<FieldLabel>Xác nhận mật khẩu</FieldLabel>
									<HelperText ml0>{input.confirmPassword.length}/20 kí tự</HelperText>
								</Row>

								<TextField
									disabled={!editPassword} maxLength={20}
									type="password" value={loading ? "Đang tải..." : input.confirmPassword} name='confirmPassword'
									onChange={handleChange}
									error={error.confirmPassword !== ''}
								/>
								<HelperText error>{error.confirmPassword}</HelperText>
							</InputWrapper>
						</>
						: null
					}
                </ContainerWrapper>

                {
                    editPassword ?
                    <FooterWrapper>
                        <FloatRight>
                            <Button onClick={handleUpdatePassword}>Lưu</Button>
                        </FloatRight>
                    </FooterWrapper>
                    : null
                }

                <ContainerWrapper>
                    <HeaderWrapper>
                        <Row>
                            <Header>Thông tin cá nhân</Header>
                            <StyledHyperlink onClick={handleToggleEditable}>{editable ? "Hủy" : "Sửa"}</StyledHyperlink>
                        </Row>
                    </HeaderWrapper>

                    <InputWrapper pb>
                        <FieldLabel>Ảnh đại diện</FieldLabel>
                        <ImageContainer>
                            {
                                input.profileImage === "" ? 
                                <label>
                                    <HiddenInputFile disabled={!editable} type="file" accept="image/png, image/jpeg" onChange={handleSetImage} />
                                    <StyledPhotoIcon disabled={!editable} />
                                </label>
                                : 
                                editable ? <StyledCloseButton onClick={handleRemoveImage} /> : null
                            }
                            <Image src={input.profileImage} display={input.profileImage === "" ? "false" : "true"} />
                        </ImageContainer>
                    </InputWrapper>

                    <InputWrapper>
                        <Row spacebetween>
                            <FieldLabel>Tên</FieldLabel>
                            <HelperText ml0>{input.residentName.length}/100 kí tự</HelperText>
                        </Row>

                        <TextField
                            disabled={!editable} maxLength={100}
                            type="text" value={input.residentName} name='residentName'
                            onChange={handleChange}
                            error={error.residentName !== ''}
                        />
                        <HelperText error>{error.residentName}</HelperText>
                    </InputWrapper>

                    <Flex>
                        <FlexChild>
                            <InputWrapper mt0>
                                <Row spacebetween>
                                    <FieldLabel>Địa chỉ</FieldLabel>
                                    <HelperText ml0>{input.deliveryAddress.length}/100 kí tự</HelperText>
                                </Row>

                                <TextField
                                    disabled={!editable} maxLength={100}
                                    type="text" value={input.deliveryAddress} name='deliveryAddress'
                                    onChange={handleChange}
                                    error={error.deliveryAddress !== ''}
                                    />
                                    <HelperText error>{error.deliveryAddress}</HelperText>
                            </InputWrapper>
                        </FlexChild>

                        <FlexChild>
                            <InputWrapper mt0>
                                <FieldLabel>Số điện thoại</FieldLabel>

                                <TextField
                                    disabled={!editable} maxLength={11}
                                    type="text" value={input.phoneNumber} name='phoneNumber'
                                    onChange={handleChange}
                                    error={error.phoneNumber !== ''}
                                />
                                <HelperText error>{error.phoneNumber}</HelperText>
                            </InputWrapper>
                        </FlexChild>
                    </Flex>

                    <Flex>
                        <FlexChild>
                            <InputWrapper mt0>
                                <FieldLabel>Giới tính</FieldLabel>
                                
                                <SelectWrapper ref={clickOutside} disabled={!editable}>
                                    <Select onClick={toggleDropdown}>
                                        {input.gender}
                                        <ArrowDropDown />
                                    </Select>
        
                                    <DropdownMenu dropdown={dropdown}>
                                        <DropdownList onClick={(e) => handleSetGender(e, 'Nam')}>Nam</DropdownList>
                                        <DropdownList onClick={(e) => handleSetGender(e, 'Nữ')}>Nữ</DropdownList>
                                        <DropdownList onClick={(e) => handleSetGender(e, 'Khác')}>Khác</DropdownList>
                                    </DropdownMenu>
                                </SelectWrapper>
                            </InputWrapper>
                        </FlexChild>

                        <FlexChild>
                            <InputWrapper mt0>
                                <FieldLabel>Ngày sinh</FieldLabel>
                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                    <DatePicker
                                        disabled={!editable} inputFormat="d/M/yyyy"
                                        disableHighlightToday={true}
                                        value={input.dateOfBirth}
                                        onChange={(newValue) => { setInput(input => ({ ...input, dateOfBirth: newValue })) }}
                                        renderInput={(params) => <MuiTextField {...params} size={'small'} />}
                                    />
                                </LocalizationProvider>
                                <HelperText error mt>{error.dateOfBirth}</HelperText>
                            </InputWrapper>
                        </FlexChild>
                    </Flex>
                </ContainerWrapper>

                <FooterWrapper>
                    <FloatRight>
                        <Button disabled={!editable}>Lưu</Button>
                    </FloatRight>
                </FooterWrapper>
            </form>
        </PageWrapper>
    )
}

export default UserProfile;