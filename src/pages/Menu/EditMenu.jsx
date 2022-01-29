import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../../RequestMethod";
import { KeyboardBackspace, ArrowRight, Search } from '@mui/icons-material';
import { TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { TimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const PageWrapper = styled.div`
    width: 1080px;
    margin: 40px auto;
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: flex-start;
`;

const ProductListWrapper = styled.div`
    flex: 2;
    padding: 0px 20px 30px 20px;
    margin-right: 30px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: #fff;
    border-radius: 5px;
`;

const MenuWrapper = styled.div`
    flex: 1;
    padding: 0px 20px 30px 20px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: #fff;
    border-radius: 5px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
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

const StyledSearchIcon = styled(Search)`
    && {
        color: grey;
    }
`;

const SearchBar = styled.div`
    display: flex;
    width: 70%;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #D8D8D8;
    border-style: solid;
    border-width: thin;
    height: 44px;
    padding: 0px 3px 0px 8px;
    background-color: #ffffff;
    margin-right: 2%;
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

const DatePickerWrapper = styled.div`
    margin: 20px 0px 0px 0px;
    display: flex;
    justify-content: center;
`;

const WeekDayCheckbox = styled.button`
    padding: 7px 13px;
    margin-right: 1px;
    border: 1px solid ${props => props.checked === "true" ? "#c7c7c7" : "#c7c7c7"};
    background-color: ${props => props.checked === "true" ? "#E0E0E0" : "#fff"};
    border-radius: 2px;
    font-size: 13px;
`;

const TimePickerWrapper = styled.div`
    margin: 20px 0px 0px 0px;
    display: flex;
    justify-content: center;
`;

const StyledArrowIcon = styled(ArrowRight)`
    && {
    margin: 16px 5px;
    }
`;

const StyledFormLabel = styled.div`
    font-weight: 700;
    margin: 30px 0px 10px 0px;
`;

const RadioLabel = styled.span`
    font-size: 14px;
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
    background-color: #17a2b8;
    color: white;
    font-weight: 600;

    &:active {
    transform: translateY(1px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const ItemWrapper = styled.div`
    margin-top: 25px;
    padding: 10px;
    border-top: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
`;

const Index = styled.span`
    margin: 16px;
`;

const Image = styled.img`
    vertical-align: middle;
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const Status = styled.span`
    display: inline-block;
    padding: 4px 6px;
    font-size: 0.8em;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 20px;
    color: ${props => props.active === "inactive" ? "grey" : "#fff"};
    background-color: ${props => props.active === "active" ? "#28a745"
    :
    props.active === "inactive" ? "#E0E0E0"
        :
        "#dc3545"};
`;

const EditMenu = () => {
    let navigate = useNavigate();

    const [createTitle, setCreateTitle] = useState(null);
    const [createText, setCreateText] = useState(null);
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleEditMenu = (event) => {
        event.preventDefault();
        if (checkValid(createTitle)) {
            const url = "menu/create";

            const addMenu = async () => {
                try {
                    const res = await fetch(publicRequest(url), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            title: createTitle,
                            text: createText,
                            residentId: null,
                        })
                    });
                    const json = await res.json();
                    if (json.ResultMessage === "SUCCESS") {
                        navigate('/menu', {name: createTitle} );
                    }
                } catch (error) { }
            };
            addMenu();
        }
    }

    const checkValid = (title) => {
        if (title === null || title === '') {
            setCreateTitle('');
            return false;
        }
        return true;
    }

    return (
        <PageWrapper>
            <Row>
                <Link to="/menus"><StyledBackIcon /></Link>
                <Title><TitleGrey>Bảng giá </TitleGrey>/ Thịt cá các loại</Title>
            </Row>

            <FlexWrapper>
                <ProductListWrapper>
                    <StyledFormLabel>Sản phẩm</StyledFormLabel>
                    
                    <Row>
                        <SearchBar>
                            <StyledSearchIcon />
                            <Input id="search" placeholder="Tìm kiếm sản phẩm" />
                        </SearchBar>

                        <DropdownWrapper width="30%">
                            <Select value={0}>
                                <option value="0">Sắp xếp: Mới nhất</option>
                                <option value="1">Sắp xếp: Cũ nhất</option>
                                <option value="2">Sắp xếp: Giá cao nhất</option>
                                <option value="3">Sắp xếp: Giá thấp nhất</option>
                            </Select>
                        </DropdownWrapper>
                    </Row>
                    
                    <ItemWrapper>
                        <Index>1.</Index>
                        <Image src="../../images/product1.png" />
                        Bánh mì 2 trứng
                        <Status active="active">Active</Status>
                    </ItemWrapper>
                </ProductListWrapper>
                
                <MenuWrapper>
                    <form onSubmit={handleEditMenu} id="form">
                            <StyledFormLabel>Tiêu đề</StyledFormLabel>
                            <TextField
                                fullWidth placeholder="Ví dụ: Thịt cá các loại, đồ gia dụng, etc" 
                                inputProps={{style: {fontSize: 14}}}
                                value={createTitle}
                                onChange={event => setCreateTitle(event.target.value)}
                                error={createTitle === ''}
                                helperText={createTitle === '' ? 'Vui lòng nhập tiêu đề' : ''}
                            />

                            <StyledFormLabel>Mô tả</StyledFormLabel>
                            <TextField
                                fullWidth multiline rows={3}
                                inputProps={{style: {fontSize: 14}}}
                                value={createText}
                                onChange={event => setCreateText(event.target.value)}
                            />

                            <StyledFormLabel>Loại bảng giá</StyledFormLabel>

                            <RadioGroup defaultValue="2">
                                <FormControlLabel value="1" control={<Radio />} label={<RadioLabel>Tươi sống</RadioLabel>} />
                                <FormControlLabel value="2" control={<Radio />} label={<RadioLabel>Khác</RadioLabel>} />
                            </RadioGroup>

                            <StyledFormLabel>Ngày hoạt động</StyledFormLabel>
                            
                            <DatePickerWrapper>
                                <WeekDayCheckbox checked="true">T2</WeekDayCheckbox>
                                <WeekDayCheckbox checked="true">T3</WeekDayCheckbox>
                                <WeekDayCheckbox>T4</WeekDayCheckbox>
                                <WeekDayCheckbox checked="true">T5</WeekDayCheckbox>
                                <WeekDayCheckbox checked="true">T6</WeekDayCheckbox>
                                <WeekDayCheckbox>T7</WeekDayCheckbox>
                                <WeekDayCheckbox checked="true">CN</WeekDayCheckbox>
                            </DatePickerWrapper>

                            <StyledFormLabel>Thời gian hoạt động</StyledFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePickerWrapper>
                                    <TimePicker value={value} onChange={handleChange} renderInput={(params) => <TextField {...params} />} />
                                    <StyledArrowIcon />
                                    <TimePicker value={value} onChange={handleChange} renderInput={(params) => <TextField {...params} />} />
                                </TimePickerWrapper>
                            </LocalizationProvider>
                    </form>
                </MenuWrapper>
            </FlexWrapper>

            
            <FooterWrapper>
                <FloatRight>
                    <Button>Lưu</Button>
                </FloatRight>
            </FooterWrapper>
        </PageWrapper>
    )
}

export default EditMenu;