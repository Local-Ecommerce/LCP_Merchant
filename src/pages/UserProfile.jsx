import React, { useState } from 'react';
import styled from 'styled-components';
import { api } from "../RequestMethod";
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';
import useClickOutside from "../contexts/useClickOutside";
import { Close, AddPhotoAlternate, ArrowDropDown } from "@mui/icons-material";

import { auth } from "../firebase";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

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

const UserProfile = () => {
    const [dropdown, setDropdown] = useState(false);
	const toggleDropdown = () => { if (editable) { setDropdown(!dropdown); }}

    const [loading, setLoading] = useState(false);
	const [editable, setEditable] = useState(false);
	const [editPassword, setEditPassword] = useState(false);

    const [item, setItem] = useState('');
    const [input, setInput] = useState({ name: '', image: '', gender: 'Nam', phone: '', address: '', password: '******', confirmPassword: '', newPassword: '' });
    const [error, setError] = useState({ name: '', image: '', phone: '', address: '', password: '', confirmPassword: '', newPassword: '' });

	let clickOutside = useClickOutside(() => {
        setDropdown(false);
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
        setError(error => ({ ...error, [name]: '' }));
    }

    const handleToggleEditable = () => {
        if (editable) { setInput({ name: '', image: '', gender: 'Nam' }) };
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

	function handleChangeGender(value) {
        setInput(input => ({ ...input, gender: value }));
        setDropdown(!dropdown);
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

        if (input.password === null || input.password === '') {
            setError(error => ({ ...error, password: 'Vui lòng không bỏ trống' }));
            check = true;
        }
        if (input.confirmPassword === null || input.confirmPassword === '') {
            setError(error => ({ ...error, confirmPassword: 'Vui lòng không bỏ trống' }));
            check = true;
        }
        if (input.confirmPassword !== input.password) {
            setError(error => ({ ...error, confirmPassword: 'Mật khẩu xác nhận không trùng khớp với mật khẩu' }));
            check = true;
        }
        if (input.newPassword.length < 6) {
            setError(error => ({ ...error, newPassword: 'Mật khẩu phải bao gồm ít nhất 6 kí tự' }));
            check = true;
        }

        if (check) {
            return false;
        }

        return true;
    }

    const handleEditItem = (event) => {
        event.preventDefault();

        if (checkValid()) {
            const notification = toast.loading("Đang xử lí yêu cầu...");

            const editItem = async () => {
                console.log(input.image.split(',')[1])
                api.put("accounts?id=" + item.MerchantStoreId, {

                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        toast.update(notification, { render: "Cập nhật thành công!", type: "success", autoClose: 5000, isLoading: false });
                    }
                })
                .catch(function (error) {
                    console.log(error);toast.update(notification, { render: "Đã xảy ra lỗi khi xử lí yêu cầu.", type: "error", autoClose: 5000, isLoading: false });
                    
                });
            };
            editItem();
        }
    }

    const checkValid = () => {
        let check = false;
        setError(error => ({ ...error, name: '' }));

        if (input.name === null || input.name === '') {
            setError(error => ({ ...error, name: 'Vui lòng nhập tên' }));
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

							<InputWrapper pb>
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
                                input.image === "" ? 
                                <label>
                                    <HiddenInputFile disabled={!editable} type="file" accept="image/png, image/jpeg" onChange={handleSetImage} />
                                    <StyledPhotoIcon disabled={!editable} />
                                </label>
                                : 
                                editable ? <StyledCloseButton onClick={handleRemoveImage} /> : null
                            }
                            <Image src={input.image} display={input.image === "" ? "false" : "true"} />
                        </ImageContainer>
                    </InputWrapper>

                    <InputWrapper>
                        <Row spacebetween>
                            <FieldLabel>Tên</FieldLabel>
                            <HelperText ml0>{input.name.length}/250 kí tự</HelperText>
                        </Row>

                        <TextField
                            disabled={!editable} maxLength={250}
                            type="text" value={loading ? "Đang tải..." : input.name} name='name'
                            onChange={handleChange}
                            error={error.name !== ''}
                        />
                        <HelperText error>{error.name}</HelperText>
                    </InputWrapper>
                    
					<Flex>
						<FlexChild>
							<InputWrapper mt0 mb0>
								<FieldLabel>Giới tính</FieldLabel>
								
								<SelectWrapper ref={clickOutside} disabled={!editable}>
									<Select onClick={toggleDropdown}>
										{input.gender}
										<ArrowDropDown />
									</Select>

									<DropdownMenu dropdown={dropdown}>
										<DropdownList onClick={() => handleChangeGender('Nam')}>Nam</DropdownList>
										<DropdownList onClick={() => handleChangeGender('Nữ')}>Nữ</DropdownList>
										<DropdownList onClick={() => handleChangeGender('Không xác định')}>Không xác định</DropdownList>
									</DropdownMenu>
								</SelectWrapper>
							</InputWrapper>
						</FlexChild>

						<FlexChild>
							<InputWrapper mt0 mb0>
								<Row spacebetween>
									<FieldLabel>Số điện thoại</FieldLabel>
									<HelperText ml0>{input.name.length}/250 kí tự</HelperText>
								</Row>

								<TextField
									disabled={!editable} maxLength={250}
									type="text" value={loading ? "Đang tải..." : input.name} name='name'
									onChange={handleChange}
									error={error.name !== ''}
								/>
								<HelperText error>{error.name}</HelperText>
							</InputWrapper>
						</FlexChild>
					</Flex>

					<InputWrapper pb>
                        <Row spacebetween>
                            <FieldLabel>Địa chỉ</FieldLabel>
                            <HelperText ml0>{input.name.length}/250 kí tự</HelperText>
                        </Row>

                        <TextField
                            disabled={!editable} maxLength={250}
                            type="text" value={loading ? "Đang tải..." : input.name} name='name'
                            onChange={handleChange}
                            error={error.name !== ''}
                         />
                         <HelperText error>{error.name}</HelperText>
                    </InputWrapper>
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