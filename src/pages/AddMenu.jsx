import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { api } from "../RequestMethod";
import { toast } from 'react-toastify';
import { KeyboardBackspace, ArrowRight, CalendarToday } from '@mui/icons-material';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';
import { MobileTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DateTime } from 'luxon';
import Modal from 'react-modal';
import * as Constant from '../Constant';

import MenuSchedule from '../components/Menu/MenuSchedule';
import LearnMoreAboutMenuModal from '../components/Menu/LearnMoreAboutMenuModal';

const PageWrapper = styled.div`
    width: 720px;
    margin: 40px auto;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.spacebetween ? "space-between" : null};
    margin-top: ${props => props.mt ? "20px" : null};
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

const ContainerWrapper = styled.div`
    padding: 30px 20px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: #fff;
    border-radius: 5px;
    position: ${props => props.relative ? "relative" : null};
`;

const DatePickerWrapper = styled.div`
    margin: 20px 0px 0px 0px;
    display: flex;
    justify-content: center;
`;

const TimePickerWrapper = styled.div`
    margin: 10px 20px 0px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledArrowIcon = styled(ArrowRight)`
    && {
    margin: 20px;
    }
`;

const StyledTextFieldMb30px = styled(TextField)`
    && {
    margin-bottom: 30px;
    }
`;

const StyledTextFieldMb20px = styled(TextField)`
    && {
    margin-bottom: 20px;
    }
`;

const FormLabel = styled.div`
    font-weight: 700;
    margin-bottom: 10px;
`;

const HelperText = styled.div`
    margin-left: ${props => props.ml0 ? "0px" : "30px"};
    align-items: center;
    text-decoration: none;
    font-size: ${props => props.error ? "13px" : "14px"};
    line-height: 1.5;
    margin-top: ${props => props.error ? "10px" : "0px"};
    color: ${props => props.error ? props.theme.red : "#727272"};
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
    border: 1px solid ${props => props.disabled ? props.theme.disabled : props.theme.blue};
    background-color: ${props => props.disabled ? props.theme.disabled : props.theme.blue};
    color: ${props => props.white ? props.theme.grey : "white"};
    font-weight: 600;

    &:active {
    transform: translateY(1px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const StyledLink = styled.span`
    color: #007bff;
    cursor: pointer;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
    && {
        margin-left: 40px;
    }
`;

const StyledCalendarIcon = styled(CalendarToday)`
    && {
        font-size: 20px;
        padding: 8px;
        border: 1px solid rgba(0,0,0,0.1);
        color: ${props => props.theme.black};
        background-color: ${props => props.theme.white};
        box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
        cursor: pointer;

        position: absolute;
        left: -50px;
        top: 20px;
    }
`;

const ModalWrapper = styled.div`
`;

const ModalContentWrapper = styled.div`
    min-height: 200px;
    max-height: 80vh;
    overflow-y: auto;
`;

const ModalButtonWrapper = styled.div`
    border-top: 1px solid #cfd2d4;
    padding: 20px;
    display: flex;
    justify-content: flex-end;
`;

const ModalButton = styled.button`
    min-width: 80px;
    padding: 10px;
    margin-left: 10px;
    background: ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.white};
    color: ${props => props.red || props.blue ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.greyBorder};
    border-radius: 4px;
    text-align: center;
    font-size: 1rem;
    font-size: 14px;
    font-weight: 600;

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
    margin-bottom: 5px;
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '20%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const AddMenu = () => {
    let navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('USER'));

    const [storeId, setStoreId] = useState('');

    const [aboutModal, setAboutModal] = useState(false);
    const toggleAboutModal = () => { setAboutModal(!aboutModal) };

    const [modal, setModal] = useState(false);
    const toggleModal = () => { setModal(!modal) };
    const [menuSchedule, setMenuSchedule] = useState([]);

    const [input, setInput] = useState({ 
        name: '', 
        description: '',
        includeBaseMenu: true,
        startTime: DateTime.fromFormat('00:00:00', 'TT').toUTC().toISO(), 
        endTime: DateTime.fromFormat('00:00:00', 'TT').toUTC().toISO(), 
        status: 9001 
    });
    const [repeatDay, setRepeatDay] = useState({ t2:false, t3:false, t4:false, t5:false, t6:false, t7:false, cn:false });
    const [twentyfour, setTwentyfour] = useState(false);
    const [error, setError] = useState({ 
        name: '', 
        repeatDay: '', 
        time: '' 
    });

    useEffect(() => {   //get store id
        const fetchData = () => {
            api.get("stores")
            .then(function (res) {
                if (res.data.ResultMessage === "SUCCESS") {
                    setStoreId(res.data.Data.List[0].MerchantStoreId);

                    api.get("menus?status=" + Constant.ACTIVE_MENU)
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
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        fetchData();
    }, []);

    const milliseconds = (h, m, s) => ((h*60*60+m*60+s)*1000);

    function handleChange(e) {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }));
        if (name === 'startTime' || name === 'endTime') {
            setError(error => ({ ...error, time: '' }));
        } else {
            setError(error => ({ ...error, [name]: '' }));
        }
    }

    function handleToggleIncludeBaseMenu(e) {
        const { checked } = e.target;
        setInput(input => ({ ...input, includeBaseMenu: checked }));
    }

    function handleToggleDate(e) {
        setError(error => ({ ...error, repeatDay: '' }));
        const { name, checked } = e.target;
        setRepeatDay(date => ({ ...date, [name]: checked }));
    }

    function handleToggleAllDate(e) {
        setError(error => ({ ...error, repeatDay: '' }));
        const { checked } = e.target;
        setRepeatDay({ t2:checked, t3:checked, t4:checked, t5:checked, t6:checked, t7:checked, cn:checked });
    }

    const handleSetTime = () => {
        setError(error => ({ ...error, time: '' }));
        setTwentyfour(!twentyfour);
    }

    const handleAddMenu = (event) => {
        event.preventDefault();

        if (validCheck()) {
            const notification = toast.loading("??ang x??? l?? y??u c???u...");
            const addData = async () => {
                api.post("menus", {
                    menuName: input.name,
                    menuDescription: input.description,
                    timeStart: twentyfour ? '00:00:00' : DateTime.fromISO(input.startTime).toFormat('TT'),
                    timeEnd: twentyfour || DateTime.fromISO(input.endTime).toFormat('TT') === '00:00:00' ?
                             '23:59:59': DateTime.fromISO(input.endTime).toFormat('TT'),
                    repeatDate: (repeatDay.cn ? '0' : '')
                              + (repeatDay.t2 ? '1' : '') 
                              + (repeatDay.t3 ? '2' : '') 
                              + (repeatDay.t4 ? '3' : '') 
                              + (repeatDay.t5 ? '4' : '') 
                              + (repeatDay.t6 ? '5' : '') 
                              + (repeatDay.t7 ? '6' : ''),
                    includeBaseMenu: input.includeBaseMenu,
                    merchantStoreId: storeId
                })
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        navigate("/menus");
                        toast.update(notification, { render: "T???o b???ng gi?? th??nh c??ng!", type: "success", autoClose: 5000, isLoading: false });
                    }
                })
                .catch(function (error) {
                    if (error.response.data.ResultMessage) {
                        toast.update(notification, { render: error.response.data.ResultMessage, type: "error", autoClose: 5000, isLoading: false });
                    } else {
                        toast.update(notification, { render: "???? x???y ra l???i khi x??? l?? y??u c???u.", type: "error", autoClose: 5000, isLoading: false });
                    }
                });
            };
            addData();
        }
    }

    const validCheck = () => {
        let check = false;
        setError(error => ({ ...error, name: '', time: '', repeatDay: '' }));

        if (input.name.trim() === null || input.name.trim() === '') {
            setError(error => ({ ...error, name: 'Vui l??ng nh???p ti??u ?????' }));
            check = true;
        }
        if (repeatDay.t2 === false && repeatDay.t3 === false && repeatDay.t4 === false 
            && repeatDay.t5 === false && repeatDay.t6 === false && repeatDay.t7 === false && repeatDay.cn === false) {
            setError(error => ({ ...error, repeatDay: 'Kh??ng ???????c ????? tr???ng ng??y ho???t ?????ng' }));
            check = true;
        }
        
        let startTime = DateTime.fromISO(input.startTime).toFormat('T');
        let endTime = DateTime.fromISO(input.endTime).toFormat('T');

        if (!twentyfour) {
            if (endTime === '00:00') {
                if (DateTime.fromFormat(endTime, 'T').toMillis() + 86400000 - DateTime.fromFormat(startTime, 'T').toMillis() >= 0
                && DateTime.fromFormat(endTime, 'T').toMillis() + 86400000 - DateTime.fromFormat(startTime, 'T').toMillis() < 3600000) {
                    setError(error => ({ ...error, time: 'Gi??? b???t ?????u v?? gi??? k???t th??c ph???i c??ch nhau ??t nh???t 1 gi???' }));
                    check = true;
                } else if (DateTime.fromFormat(endTime, 'T').toMillis() + 86400000 - DateTime.fromFormat(startTime, 'T').toMillis() < 0) {
                    setError(error => ({ ...error, time: 'Gi??? b???t ?????u kh??ng ???????c l???n h??n gi??? k???t th??c' }));
                    check = true;
                }
            } 
            else if (DateTime.fromFormat(endTime, 'T').toMillis() - DateTime.fromFormat(startTime, 'T').toMillis() >= 0
            && DateTime.fromFormat(endTime, 'T').toMillis() - DateTime.fromFormat(startTime, 'T').toMillis() < 3600000) {
                setError(error => ({ ...error, time: 'Gi??? b???t ?????u v?? gi??? k???t th??c ph???i c??ch nhau ??t nh???t 1 gi???' }));
                check = true;
            } else if (DateTime.fromFormat(endTime, 'T').toMillis() - DateTime.fromFormat(startTime, 'T').toMillis() < 0) {
                setError(error => ({ ...error, time: 'Gi??? b???t ?????u kh??ng ???????c l???n h??n gi??? k???t th??c' }));
                check = true;
            }
        }

        if (check) {
            return false;
        }

        return true;
    }

    return (
        <PageWrapper>
            {
                user.Residents[0].Status === Constant.UNVERIFIED_RESIDENT ? 
                <StoreMessage>T??i kho???n c???a b???n ??ang ???????c x??c th???c b???i ng?????i qu???n l?? ch???, vui l??ng ch??? ?????i...</StoreMessage> 
                : null
            }

            <Row>
                <Link to="/menus"><StyledBackIcon /></Link>
                <Title><TitleGrey>B???ng gi?? </TitleGrey>/ T???o b???ng gi?? m???i</Title>
            </Row>
            
            <form onSubmit={handleAddMenu} id="form">
                <ContainerWrapper>
                    <Row spacebetween>
                        <FormLabel>Ti??u ?????</FormLabel>
                        <HelperText ml0>{input.name.length}/250 k?? t???</HelperText>
                    </Row>
                    
                    <StyledTextFieldMb30px
                        fullWidth placeholder="V?? d???: Th???t c?? c??c lo???i, ????? gia d???ng, etc" 
                        inputProps={{ maxLength: 250, style: {fontSize: 14} }}
                        value={input.name ? input.name : ''} name='name'
                        onChange={handleChange}
                        error={error.name !== ''}
                        helperText={error.name}
                    />

                    <Row spacebetween>
                        <FormLabel>M?? t???</FormLabel>
                        <HelperText ml0>{input.description.length}/500 k?? t???</HelperText>
                    </Row>

                    <StyledTextFieldMb20px
                        fullWidth multiline rows={4} placeholder="M?? t??? gi??p kh??ch h??ng h??nh dung v?? hi???u r?? h??n s???n ph???m thu???c b???ng gi??."
                        inputProps={{ maxLength: 500, style: {fontSize: 14}}}
                        value={input.description ? input.description : ''} name='description'
                        onChange={handleChange}
                    />

                    <FormControlLabel 
                        checked={input.includeBaseMenu} name='includeBaseMenu' 
                        onClick={handleToggleIncludeBaseMenu} 
                        control={<Checkbox />} 
                        label={<span style={{ fontSize: '14px' }}>T??ch h???p b???ng gi?? c?? b???n</span>} 
                    />

                    <HelperText>
                        C??c s???n ph???m thu???c b???ng gi?? c?? b???n v???n s??? ti???p t???c b??n khi ?????n gi??? ho???t ?????ng c???a b???ng gi?? n??y.<br/>
                        T??m hi???u th??m v???&nbsp;<StyledLink onClick={toggleAboutModal}>c??c lo???i b???ng gi??</StyledLink>
                    </HelperText>
                </ContainerWrapper>

                <ContainerWrapper>
                    <FormLabel>Ng??y ho???t ?????ng</FormLabel>
                    
                    <DatePickerWrapper>
                        <FormControlLabel checked={repeatDay.t2 && repeatDay.t3 && repeatDay.t4 && repeatDay.t5 && repeatDay.t6 && repeatDay.t7 && repeatDay.cn} onClick={handleToggleAllDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Ch???n to??n b???</span>} labelPlacement="top" />
                        <FormControlLabel checked={repeatDay.t2} name='t2' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Th??? 2</span>} labelPlacement="top" />
                        <FormControlLabel checked={repeatDay.t3} name='t3' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Th??? 3</span>} labelPlacement="top" />
                        <FormControlLabel checked={repeatDay.t4} name='t4' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Th??? 4</span>} labelPlacement="top" />
                        <FormControlLabel checked={repeatDay.t5} name='t5' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Th??? 5</span>} labelPlacement="top" />
                        <FormControlLabel checked={repeatDay.t6} name='t6' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Th??? 6</span>} labelPlacement="top" />
                        <FormControlLabel checked={repeatDay.t7} name='t7' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>Th??? 7</span>} labelPlacement="top" />
                        <FormControlLabel checked={repeatDay.cn} name='cn' onClick={handleToggleDate} control={<Checkbox />} label={<span style={{ fontSize: '14px' }}>C.Nh???t</span>} labelPlacement="top" />
                    </DatePickerWrapper>

                    <HelperText error>{error.repeatDay}</HelperText>
                </ContainerWrapper>

                <ContainerWrapper relative={1}>
                    <StyledCalendarIcon onClick={toggleModal} />

                    <FormLabel>Th???i gian ho???t ?????ng</FormLabel>
                    <StyledFormControlLabel 
                        style={{ pointerEvents: "none" }}
                        control={
                            <Checkbox
                                onClick={handleSetTime}
                                style={{ pointerEvents: "auto" }}
                                checked={twentyfour}
                            />
                        }
                        label={<span style={{ fontSize: '14px' }}>Ho???t ?????ng 24h</span>} 
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePickerWrapper>
                            <MobileTimePicker
                                minutesStep={15} disableCloseOnSelect={false} showToolbar={false}
                                disabled={twentyfour ? true : false} ampm={false}
                                label={twentyfour && !modal ? "00:00" : !modal ? "Th???i gian b???t ?????u" : ''}
                                value={twentyfour ? null :input.startTime}
                                onChange={time => handleChange({ target: { value: time.toISOString(), name: 'startTime' } })} 
                                renderInput={(params) => <TextField disabled {...params} error={error.time !== ''} helperText={error.time} />} 
                            />

                            <StyledArrowIcon />

                            <MobileTimePicker
                                minutesStep={15} disableCloseOnSelect={false} showToolbar={false}
                                disabled={twentyfour ? true : false} ampm={false}
                                label={twentyfour && !modal ? "24:00" : !modal ? "Th???i gian k???t th??c" : ''}
                                value={twentyfour ? null :input.endTime}
                                onChange={time => handleChange({ target: { value: time.toISOString(), name: 'endTime' } })} 
                                renderInput={(params) => <TextField disabled {...params} error={error.time !== ''} helperText={error.time} />} 
                            />
                        </TimePickerWrapper>
                    </LocalizationProvider>
                </ContainerWrapper>

                <FooterWrapper>
                    <FloatRight>
                        {
                            user.Residents[0].Status === Constant.UNVERIFIED_RESIDENT ?
                            <Button disabled>T???o m???i</Button>
                            :
                            <Button>L??u</Button>
                        }
                    </FloatRight>
                </FooterWrapper>
            </form>

            <Modal isOpen={modal} onRequestClose={toggleModal} style={customStyles} ariaHideApp={false}>
                <ModalWrapper>
                    <ModalContentWrapper>
                        <MenuSchedule menuSchedule={menuSchedule} />
                    </ModalContentWrapper>

                    <ModalButtonWrapper>
                        <ModalButton onClick={toggleModal}>Quay l???i</ModalButton>
                    </ModalButtonWrapper>
                </ModalWrapper>
            </Modal>

            <LearnMoreAboutMenuModal
                display={aboutModal} 
                toggle={toggleAboutModal} 
            />
        </PageWrapper>
    )
}

export default AddMenu;