import React, { useState } from 'react';
import styled from 'styled-components';
import { Delete, Palette, AddCircleOutline, SquareFoot, Scale } from '@mui/icons-material';
import { TextField, InputAdornment } from '@mui/material';
import { useEffect } from 'react';

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.spacebetween ? "space-between" : null};
`;

const OptionWrapper = styled.div`
    border-bottom: 1px solid #d6d6d6;
    margin: -1px -30px;
    padding: 20px 30px;
`;

const OptionLabel = styled.div`
    margin-top: ${props => props.mt ? "13px" : "0px"};
    margin-bottom: 7px;
    font-size: 13px;
    color: #6c6c6c;
`;

const SavedDataWrapper = styled.div`
    width: 500px;
    margin-bottom: 10px;
`;

const ValueTag = styled.span`
    display: inline-block;
    padding: 4px 10px;
    font-size: 13px;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 20px;
    color: ${props => props.theme.white};
    background-color: ${props => props.old ? props.theme.blue : props.theme.green};
    margin: 0px 5px 5px 0px;
`;

const StyledOptionTextField = styled(TextField)`
    && {
        margin-bottom: 7px;
        width: 500px;
    }
`;

const StyledDeleteIcon = styled(Delete)`
    && {
        color: grey;
        margin-left: 10px;
        margin-bottom: ${props => props.mb === "true" ? "7px" : "0px"};
    }
`;

const StyledColorIcon = styled(Palette)`
    && {
        font-size: 18px;
    }
`;

const StyledSizeIcon = styled(SquareFoot)`
    && {
        font-size: 18px;
    }
`;

const StyledWeightIcon = styled(Scale)`
    && {
        font-size: 18px;
    }
`;

const Button = styled.button`
    display: block;
    border-radius: 5px;
    border: none;
    padding: 8px 15px;
    cursor: pointer;
    border: 1px solid ${props => props.white ? props.theme.greyBorder : props.green ? props.theme.green : props.theme.blue};
    background: ${props => props.white ? props.theme.white : props.green ? props.theme.green : props.theme.blue};
    color: ${props => props.white ? props.theme.dark : "white"};
    font-weight: 600;
    margin-right: ${props => props.mr ? "10px" : "0x"};

    &:active {
    transform: translateY(1px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const AddOptionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 10px;
    width: 500px;
    border-radius: 5px;
    border: 2px dashed ${props => props.theme.blue};
    color: ${props => props.theme.blue};
    background-color: white;
    margin: 20px 0px;

    &:active {
        border: 2px solid ${props => props.theme.blue};
    }

    &:hover {
        opacity: 0.8;
        background-color: #E8E8E8;
    }
`;

const StyledAddIcon = styled(AddCircleOutline)`
    && {
        font-size: 20px;
        margin-right: 5px;
    }
`;

const WarningText = styled.div`
    margin-left: 10px;
    align-items: center;
    text-decoration: none;
    font-size: 13px;
    color: ${props => props.theme.red};
`;

const ProductOption = ({ passedData, savedData, type, saveOption, editOption }) =>  {
    const [display, setDisplay] = useState(false);
    const [values, setValues] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (passedData && passedData.length) {
            setValues(passedData);
            setCount(passedData.length);
            setDisplay(true);
        }
    }, [passedData]);

    const toggleDisplay = () => {
        setDisplay(!display);
        editOption(type, display);
    }

    const changeValue = (e) => {
        const { name, value } = e.target;
        let newValues = [...values];
        let index = newValues.findIndex(obj => parseInt(obj.name) === parseInt(name));
        let error = (newValues.find(obj => obj.value === value) ? "T??y ch???n ???? t???n t???i" : "");
        let old = false;
        newValues[index] = { name, value, error, old };
        setValues(newValues);
    }

    const changeWeightValue = (e) => {
        const { name, value } = e.target;
        let newValues = [...values];
        let index = newValues.findIndex(obj => parseInt(obj.name) === parseInt(name));
        let inputValue = value.replace(/[^\d.]+/g,'').replace(/^([^.]*\.)|\./g, '$1');
        let error = (newValues.find(obj => obj.value === inputValue && obj.name !== name && inputValue !== '') ? "T??y ch???n ???? t???n t???i" : "");
        let old = false;
        newValues[index] = { name, value: inputValue, error, old };
        setValues(newValues);
    }

    const addValue = (newValue) => {
        if (values.length < 5) {
            setCount(count + 1);
            editOption(type);
            setValues(values => [...values, newValue]);
        }
    }

    const removeValue = (name) => {
        if (name !== -1) {
            setValues(values.filter((item) => {
                return item.name !== name
            }));
        }
    }

    const handleSaveOption = () => {
        if(checkValid()) {
            let valid = true;

            values.forEach((item) => {
                if (item.error !== '') {
                    valid = false;
                }
            });
            
            if (valid) {
                saveOption(type, values);
            }
        }
    }

    const handleRemoveAllOption = () => {
        setValues([]);
        saveOption(type, []);
        setDisplay(false);
    }

    const checkValid = () => {
        let check = false;

        values.forEach((item) => {
            if (item.value === '') {
                let newValues = [...values];
                let index = newValues.findIndex(obj => parseInt(obj.name) === parseInt(item.name));
                let error = "Vui l??ng kh??ng ????? tr???ng t??y ch???n";
                newValues[index] = { name: item.name, value: item.value, error };
                setValues(newValues);
                check = true;
            }
        });
        if (check) {
            return false;
        }

        return true;
    }

    const handleEditOption = () => {
        editOption(type);
    }

    let typeLabel = '';
    let typeIcon = '';
    switch (type) {
        case 'colors':
            typeLabel = 'M??u s???c';
            typeIcon = <StyledColorIcon />
            break;
        case 'sizes':
            typeLabel = 'K??ch th?????c';
            typeIcon = <StyledSizeIcon />
            break;
        case 'weights':
            typeLabel = 'Tr???ng l?????ng';
            typeIcon = <StyledWeightIcon />
            break;
        default:
            typeLabel = 'Wrong type';
            typeIcon = <StyledDeleteIcon />
            break;
    }

    return (
        <>
            {
            display ? 
            <OptionWrapper>
                <OptionLabel>T??n t??y ch???n</OptionLabel>
                <Row>
                    <StyledOptionTextField size="small" value={typeLabel}
                        InputProps={{
                        style: {fontSize: 14}, 
                        readOnly: true,
                        startAdornment: (
                            <InputAdornment position="start">
                                {typeIcon}
                            </InputAdornment>
                        ),
                    }}/>
                    <StyledDeleteIcon onClick={handleRemoveAllOption} />
                </Row>

                <OptionLabel mt>Gi?? tr??? t??y ch???n</OptionLabel>
                {
                (savedData && savedData.length) ?
                <>
                    <SavedDataWrapper>
                        {savedData.map((item, index) => {
                            return (
                                <ValueTag old={item.old} key={index}> {item.value} {type === 'weights' ? " kg" : null} </ValueTag>
                            );
                        })}
                    </SavedDataWrapper>

                    <Button white type="button" onClick={handleEditOption}> 
                        Ch???nh s???a 
                    </Button>
                </>
                :

                <>
                    {
                    values ?
                    <>
                        {values.map((item, index) => {
                            return (
                                <Row key={index}>
                                    {
                                        type === 'weights' ?
                                        <StyledOptionTextField
                                            size="small"
                                            InputProps={{ 
                                                style: {fontSize: 14},
                                                startAdornment: <InputAdornment position="start">kg</InputAdornment> 
                                            }}
                                            value={item.value} name={item.name.toString()}
                                            onChange={changeWeightValue}
                                            error={item.error !== ''}
                                            helperText={item.error}
                                        />
                                        :
                                        <StyledOptionTextField key={index}
                                            size="small"
                                            InputProps={{ style: {fontSize: 14} }}
                                            value={item.value} name={item.name.toString()}
                                            onChange={changeValue}
                                            error={item.error !== ''}
                                            helperText={item.error}
                                        /> 
                                    }
                                    <StyledDeleteIcon mb="true" onClick={() => removeValue(item.name)} />
                                </Row>
                            )
                        })}
                    </>
                    : null 
                    }
                    <Row>
                        <Button mr white type="button" onClick={() => addValue({name: count, value: '', error: '', old: false})}> 
                            Th??m gi?? tr??? m???i 
                        </Button>
                        {
                            values && values.length ?
                            <Button green type="button" onClick={handleSaveOption}> 
                                L??u
                            </Button>
                            : null
                        }
                        {
                            values && values.length >= 5 ?
                            <WarningText>T???i ??a 5 t??y ch???n m???i m???c.</WarningText>
                            : null
                        }
                    </Row>
                </>
                }
            </OptionWrapper>

            :

            <AddOptionButton onClick={toggleDisplay}>
                <StyledAddIcon/> 
                Th??m t??y ch???n {typeLabel.toLowerCase()}
            </AddOptionButton>
            }
        </>
    )
}

export default ProductOption;